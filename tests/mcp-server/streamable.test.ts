import express from 'express';
import { initStreamableServer } from '../../src/mcp-server/transport/streamable';
import { McpServerOptions } from '../../src/mcp-server/shared/types';
import { parseMCPServerOptionsFromRequest, sendJsonRpcError } from '../../src/mcp-server/transport/utils';
import { LarkAuthHandler } from '../../src/auth';

// 模拟依赖
jest.mock('express', () => {
  const mockApp = {
    use: jest.fn(),
    post: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
    listen: jest.fn().mockImplementation((port, host, callback) => {
      if (callback) callback();
      return { close: jest.fn() };
    }),
  };

  const mockExpressInstance = {
    json: jest.fn(),
  };

  const expressMock = jest.fn(() => mockApp);
  Object.assign(expressMock, {
    json: jest.fn(() => mockExpressInstance.json),
  });

  return expressMock;
});

jest.mock('@modelcontextprotocol/sdk/server/mcp.js', () => ({
  McpServer: jest.fn().mockImplementation(() => ({
    connect: jest.fn().mockResolvedValue(undefined),
    close: jest.fn(),
    server: {},
    _registeredResources: {},
    _registeredResourceTemplates: {},
    _registeredTools: {},
  })),
}));

jest.mock('@modelcontextprotocol/sdk/server/streamableHttp.js', () => ({
  StreamableHTTPServerTransport: jest.fn().mockImplementation(() => ({
    handleRequest: jest.fn().mockResolvedValue(undefined),
    close: jest.fn(),
  })),
}));

jest.mock('../../src/mcp-server/transport/utils', () => ({
  parseMCPServerOptionsFromRequest: jest.fn().mockReturnValue({
    appId: 'mock-app-id',
    appSecret: 'mock-app-secret',
  }),
  sendJsonRpcError: jest.fn(),
}));

jest.mock('../../src/auth', () => ({
  LarkAuthHandler: jest.fn().mockImplementation(() => ({
    authenticateRequest: jest.fn((req, res, next) => next()),
  })),
}));

// 创建模拟Response对象
const createMockResponse = () => ({
  on: jest.fn((event, callback) => {
    if (event === 'close') {
      // 模拟在测试中立即调用close回调
      setTimeout(callback, 0);
    }
  }),
  writeHead: jest.fn().mockReturnThis(),
  end: jest.fn(),
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
});

// 保存原始console和process.exit
const originalConsole = console;
const originalProcessExit = process.exit;

describe('initStreamableServer', () => {
  const mockApp = express();
  let postRouteHandler: any;
  let getRouteHandler: any;
  let deleteRouteHandler: any;
  let authMiddleware: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // 模拟console和process.exit
    console.log = jest.fn();
    console.error = jest.fn();
    process.exit = jest.fn() as any;

    // 重置mock返回值
    (parseMCPServerOptionsFromRequest as jest.Mock).mockReturnValue({
      appId: 'mock-app-id',
      appSecret: 'mock-app-secret',
    });

    // 捕获路由处理器和中间件
    (mockApp.post as jest.Mock).mockImplementation((path, middleware, handler) => {
      if (path === '/mcp') {
        authMiddleware = middleware;
        postRouteHandler = handler;
      }
    });

    (mockApp.get as jest.Mock).mockImplementation((path, handler) => {
      if (path === '/mcp') {
        getRouteHandler = handler;
      }
    });

    (mockApp.delete as jest.Mock).mockImplementation((path, handler) => {
      if (path === '/mcp') {
        deleteRouteHandler = handler;
      }
    });
  });

  afterEach(() => {
    // 恢复原始console和process.exit
    console = originalConsole;
    process.exit = originalProcessExit;
  });

  it('应该初始化Express应用程序并设置正确的路由', () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const getMockServer = jest.fn().mockReturnValue(new McpServer());

    initStreamableServer(getMockServer, options);

    // 验证Express设置
    expect(express).toHaveBeenCalled();
    expect(express.json).toHaveBeenCalled();
    expect(mockApp.use).toHaveBeenCalled();
    expect(mockApp.post).toHaveBeenCalledWith('/mcp', expect.any(Function), expect.any(Function));
    expect(mockApp.get).toHaveBeenCalledWith('/mcp', expect.any(Function));
    expect(mockApp.delete).toHaveBeenCalledWith('/mcp', expect.any(Function));
    expect(mockApp.listen).toHaveBeenCalledWith(options.port, options.host, expect.any(Function));
  });

  it('应该处理POST /mcp请求', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const { StreamableHTTPServerTransport } = require('@modelcontextprotocol/sdk/server/streamableHttp.js');
    const getMockServer = jest.fn().mockReturnValue(new McpServer());

    initStreamableServer(getMockServer, options);

    // 模拟请求和响应
    const mockReq = {
      auth: { token: 'test-token' },
      query: { appId: 'mock-app-id', appSecret: 'mock-app-secret' },
      body: { jsonrpc: '2.0', method: 'test' },
    };
    const mockRes = createMockResponse();

    // 调用POST路由处理器
    await postRouteHandler(mockReq, mockRes);

    // 验证StreamableHTTPServerTransport被创建
    expect(StreamableHTTPServerTransport).toHaveBeenCalledWith({ sessionIdGenerator: undefined });

    // 验证服务器连接和请求处理
    expect(getMockServer).toHaveBeenCalledWith({ userAccessToken: 'test-token' }, undefined);
  });

  it('应该处理POST /mcp请求无auth token', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const getMockServer = jest.fn().mockReturnValue(new McpServer());

    initStreamableServer(getMockServer, options);

    // 模拟请求和响应（无auth token）
    const mockReq = {
      query: { appId: 'mock-app-id', appSecret: 'mock-app-secret' },
      body: { jsonrpc: '2.0', method: 'test' },
    };
    const mockRes = createMockResponse();

    // 调用POST路由处理器
    await postRouteHandler(mockReq, mockRes);

    // 验证服务器被创建时没有userAccessToken
    expect(getMockServer).toHaveBeenCalledWith({ userAccessToken: undefined }, undefined);
  });

  it('应该在没有auth对象时正确处理POST请求', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const getMockServer = jest.fn().mockReturnValue(new McpServer());

    initStreamableServer(getMockServer, options);

    // 模拟没有auth属性的请求
    const mockReq = {
      // 没有auth属性
      query: { appId: 'mock-app-id', appSecret: 'mock-app-secret' },
      body: { jsonrpc: '2.0', method: 'test' },
    };
    const mockRes = createMockResponse();

    // 调用POST路由处理器
    await postRouteHandler(mockReq, mockRes);

    // 验证token为undefined
    expect(getMockServer).toHaveBeenCalledWith({ userAccessToken: undefined }, undefined);
  });

  it('应该在有auth对象但没有token时正确处理POST请求', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const getMockServer = jest.fn().mockReturnValue(new McpServer());

    initStreamableServer(getMockServer, options);

    // 模拟有auth对象但没有token的请求
    const mockReq = {
      auth: {}, // 有auth对象但没有token属性
      query: { appId: 'mock-app-id', appSecret: 'mock-app-secret' },
      body: { jsonrpc: '2.0', method: 'test' },
    };
    const mockRes = createMockResponse();

    // 调用POST路由处理器
    await postRouteHandler(mockReq, mockRes);

    // 验证token为undefined
    expect(getMockServer).toHaveBeenCalledWith({ userAccessToken: undefined }, undefined);
  });

  it('应该处理响应关闭事件', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const { StreamableHTTPServerTransport } = require('@modelcontextprotocol/sdk/server/streamableHttp.js');

    const mockServer = new McpServer();
    const getMockServer = jest.fn().mockReturnValue(mockServer);

    initStreamableServer(getMockServer, options);

    // 模拟请求和响应
    const mockReq = {
      query: { appId: 'mock-app-id', appSecret: 'mock-app-secret' },
      body: { jsonrpc: '2.0', method: 'test' },
    };
    const mockRes = createMockResponse();

    // 调用POST路由处理器
    await postRouteHandler(mockReq, mockRes);

    // 等待close事件被触发
    await new Promise((resolve) => setTimeout(resolve, 10));

    // 验证transport和server的close方法被调用
    const transportInstance = StreamableHTTPServerTransport.mock.results[0].value;
    expect(transportInstance.close).toHaveBeenCalled();
    expect(mockServer.close).toHaveBeenCalled();
  });

  it('应该处理GET /mcp请求（方法不允许）', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const getMockServer = jest.fn().mockReturnValue(new McpServer());

    initStreamableServer(getMockServer, options);

    // 模拟请求和响应
    const mockReq = {};
    const mockRes = createMockResponse();

    // 调用GET路由处理器
    await getRouteHandler(mockReq, mockRes);

    // 验证方法不允许的响应
    expect(console.log).toHaveBeenCalledWith('Received GET MCP request');
    expect(mockRes.writeHead).toHaveBeenCalledWith(405);
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({
        jsonrpc: '2.0',
        error: { code: -32000, message: 'Method not allowed.' },
        id: null,
      }),
    );
  });

  it('应该处理GET /mcp请求时的错误', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const getMockServer = jest.fn().mockReturnValue(new McpServer());

    initStreamableServer(getMockServer, options);

    // 模拟响应对象抛出错误
    const mockReq = {};
    const mockRes = {
      writeHead: jest.fn().mockImplementation(() => {
        throw new Error('Response error');
      }),
      end: jest.fn(),
    };

    // 调用GET路由处理器
    await getRouteHandler(mockReq, mockRes);

    // 验证错误处理
    expect(sendJsonRpcError).toHaveBeenCalledWith(mockRes, expect.any(Error));
  });

  it('应该处理DELETE /mcp请求（方法不允许）', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const getMockServer = jest.fn().mockReturnValue(new McpServer());

    initStreamableServer(getMockServer, options);

    // 模拟请求和响应
    const mockReq = {};
    const mockRes = createMockResponse();

    // 调用DELETE路由处理器
    await deleteRouteHandler(mockReq, mockRes);

    // 验证方法不允许的响应
    expect(console.log).toHaveBeenCalledWith('Received DELETE MCP request');
    expect(mockRes.writeHead).toHaveBeenCalledWith(405);
    expect(mockRes.end).toHaveBeenCalledWith(
      JSON.stringify({
        jsonrpc: '2.0',
        error: { code: -32000, message: 'Method not allowed.' },
        id: null,
      }),
    );
  });

  it('应该处理DELETE /mcp请求时的错误', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const getMockServer = jest.fn().mockReturnValue(new McpServer());

    initStreamableServer(getMockServer, options);

    // 模拟响应对象抛出错误
    const mockReq = {};
    const mockRes = {
      writeHead: jest.fn().mockImplementation(() => {
        throw new Error('Response error');
      }),
      end: jest.fn(),
    };

    // 调用DELETE路由处理器
    await deleteRouteHandler(mockReq, mockRes);

    // 验证错误处理
    expect(sendJsonRpcError).toHaveBeenCalledWith(mockRes, expect.any(Error));
  });

  it('应该在启用OAuth时创建认证处理器', () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
      oauth: true,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const getMockServer = jest.fn().mockReturnValue(new McpServer());

    initStreamableServer(getMockServer, options);

    // 验证LarkAuthHandler被创建
    expect(LarkAuthHandler).toHaveBeenCalledWith(mockApp, options);
  });

  it('应该处理服务器启动错误', () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const getMockServer = jest.fn().mockReturnValue(new McpServer());

    // 模拟服务器启动错误
    (mockApp.listen as jest.Mock).mockImplementation((port, host, callback) => {
      if (callback) callback(new Error('Port already in use'));
      return { close: jest.fn() };
    });

    initStreamableServer(getMockServer, options);

    // 验证错误被记录并且进程退出
    expect(console.error).toHaveBeenCalledWith('[StreamableServerTransport] Server error: Error: Port already in use');
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it('应该在缺少必需参数时抛出错误', () => {
    const invalidOptions: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      // 缺少 host 和 port
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const getMockServer = jest.fn().mockReturnValue(new McpServer());

    expect(() => {
      initStreamableServer(getMockServer, invalidOptions);
    }).toThrow('[Lark MCP] Port and host are required');
  });

  it('应该正确传递配置参数', () => {
    const options: McpServerOptions = {
      appId: 'custom-app-id',
      appSecret: 'custom-app-secret',
      host: 'localhost',
      port: 3000,
      oauth: false,
    };

    const getNewServerMock = jest.fn().mockReturnValue({
      connect: jest.fn().mockResolvedValue(undefined),
      close: jest.fn(),
    });

    initStreamableServer(getNewServerMock, options);

    // 验证Express路由被正确设置
    expect(mockApp.post).toHaveBeenCalledWith('/mcp', expect.any(Function), expect.any(Function));
    expect(mockApp.get).toHaveBeenCalledWith('/mcp', expect.any(Function));
    expect(mockApp.delete).toHaveBeenCalledWith('/mcp', expect.any(Function));
    expect(mockApp.listen).toHaveBeenCalledWith(3000, 'localhost', expect.any(Function));
  });

  it('应该在成功启动时记录日志', () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    // 模拟成功的listen回调
    (mockApp.listen as jest.Mock).mockImplementation((port, host, callback) => {
      if (callback) callback(); // 没有错误
      return { close: jest.fn() };
    });

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const getMockServer = jest.fn().mockReturnValue(new McpServer());

    initStreamableServer(getMockServer, options);

    // 验证成功日志
    expect(console.log).toHaveBeenCalledWith('📡 Streamable endpoint: http://localhost:3000/mcp');
  });

  describe('authMiddleware', () => {
    it('应该在没有OAuth时从Authorization头中提取token', () => {
      const options: McpServerOptions = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        host: 'localhost',
        port: 3000,
        oauth: false,
      };

      const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
      const getMockServer = jest.fn().mockReturnValue(new McpServer());

      initStreamableServer(getMockServer, options);

      // 模拟带有Authorization头的请求
      const mockReq: any = {
        headers: {
          authorization: 'Bearer test-auth-token',
        },
      };
      const mockRes = {};
      const mockNext = jest.fn();

      // 直接调用authMiddleware
      authMiddleware(mockReq, mockRes, mockNext);

      // 验证token被正确设置到req.auth
      expect(mockReq.auth).toEqual({
        token: 'test-auth-token',
        clientId: 'LOCAL',
        scopes: [],
      });
      expect(mockNext).toHaveBeenCalled();
    });

    it('应该在没有OAuth且没有Authorization头时正确处理', () => {
      const options: McpServerOptions = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        host: 'localhost',
        port: 3000,
        oauth: false,
      };

      const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
      const getMockServer = jest.fn().mockReturnValue(new McpServer());

      initStreamableServer(getMockServer, options);

      // 模拟没有Authorization头的请求
      const mockReq: any = {
        headers: {},
      };
      const mockRes = {};
      const mockNext = jest.fn();

      // 直接调用authMiddleware
      authMiddleware(mockReq, mockRes, mockNext);

      // 验证req.auth没有被设置
      expect(mockReq.auth).toBeUndefined();
      expect(mockNext).toHaveBeenCalled();
    });

    it('应该在没有OAuth且Authorization头格式不正确时正确处理', () => {
      const options: McpServerOptions = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        host: 'localhost',
        port: 3000,
        oauth: false,
      };

      const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
      const getMockServer = jest.fn().mockReturnValue(new McpServer());

      initStreamableServer(getMockServer, options);

      // 模拟Authorization头格式不正确的请求
      const mockReq: any = {
        headers: {
          authorization: 'InvalidFormat',
        },
      };
      const mockRes = {};
      const mockNext = jest.fn();

      // 直接调用authMiddleware
      authMiddleware(mockReq, mockRes, mockNext);

      // 验证req.auth没有被设置（因为split(' ')[1]返回undefined）
      expect(mockReq.auth).toBeUndefined();
      expect(mockNext).toHaveBeenCalled();
    });

    it('应该在有OAuth时调用authHandler.authenticateRequest', () => {
      const options: McpServerOptions = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        host: 'localhost',
        port: 3000,
        oauth: true,
      };

      const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
      const getMockServer = jest.fn().mockReturnValue(new McpServer());

      initStreamableServer(getMockServer, options);

      const mockReq = {};
      const mockRes = {};
      const mockNext = jest.fn();

      // 直接调用authMiddleware
      authMiddleware(mockReq, mockRes, mockNext);

      // 验证LarkAuthHandler的authenticateRequest被调用
      expect(LarkAuthHandler).toHaveBeenCalledWith(mockApp, options);
      const authHandlerInstance = (LarkAuthHandler as jest.Mock).mock.results[0].value;
      expect(authHandlerInstance.authenticateRequest).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
    });
  });
});
