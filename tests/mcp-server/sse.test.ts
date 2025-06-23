import express from 'express';
import { initSSEServer } from '../../src/mcp-server/transport/sse';
import { McpServerOptions } from '../../src/mcp-server/shared/types';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { parseMCPServerOptionsFromRequest } from '../../src/mcp-server/transport/utils';
import { LarkAuthHandler } from '../../src/auth';

// 创建可跟踪的模拟函数
const handlePostMessageMock = jest.fn().mockResolvedValue(undefined);
const mcpConnectMock = jest.fn().mockResolvedValue(undefined);
const mcpCloseMock = jest.fn();
const transportCloseMock = jest.fn();

// 模拟 McpServer
jest.mock('@modelcontextprotocol/sdk/server/mcp.js', () => ({
  McpServer: jest.fn().mockImplementation(() => ({
    connect: mcpConnectMock,
    close: mcpCloseMock,
    server: {},
    _registeredResources: {},
    _registeredResourceTemplates: {},
    _registeredTools: {},
  })),
}));

// 模拟Response对象
const createMockResponse = () => ({
  on: jest.fn((event, callback) => {
    if (event === 'close') {
      // 模拟在测试中立即调用close回调
      setTimeout(callback, 0);
    }
  }),
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
});

jest.mock('express', () => {
  const mockApp = {
    use: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    listen: jest.fn().mockImplementation((port, host, callback) => {
      if (callback) callback();
      return { close: jest.fn() };
    }),
  };

  return jest.fn(() => mockApp);
});

jest.mock('@modelcontextprotocol/sdk/server/sse.js', () => {
  const mockSessionId = 'test-session-id';
  return {
    SSEServerTransport: jest.fn().mockImplementation((path, res) => ({
      sessionId: mockSessionId,
      handlePostMessage: handlePostMessageMock,
      close: transportCloseMock,
    })),
  };
});

// 模拟utils.ts
jest.mock('../../src/mcp-server/transport/utils', () => {
  const original = jest.requireActual('../../src/mcp-server/transport/utils');
  return {
    ...original,
    parseMCPServerOptionsFromRequest: jest.fn().mockReturnValue({
      success: true,
      data: {
        appId: 'mock-app-id',
        appSecret: 'mock-app-secret',
      },
    }),
  };
});

// 模拟LarkAuthHandler
jest.mock('../../src/auth', () => ({
  LarkAuthHandler: jest.fn().mockImplementation(() => ({
    authenticateRequest: jest.fn((req, res, next) => next()),
  })),
}));

// 保存原始console和process.exit
const originalConsole = console;
const originalProcessExit = process.exit;

describe('initSSEServer', () => {
  // 获取模拟的Express应用程序
  const mockApp = express();
  let sseRouteHandler: any;
  let messagesRouteHandler: any;

  beforeEach(() => {
    // 重置模拟
    jest.clearAllMocks();

    // 模拟console和process.exit
    console.log = jest.fn();
    console.error = jest.fn();
    process.exit = jest.fn() as any;

    // 重置parseMCPServerOptionsFromRequest的模拟
    (parseMCPServerOptionsFromRequest as jest.Mock).mockReturnValue({
      success: true,
      data: {
        appId: 'mock-app-id',
        appSecret: 'mock-app-secret',
      },
    });

    // 捕获路由处理器
    (mockApp.get as jest.Mock).mockImplementation((path, ...handlers) => {
      if (path === '/sse') {
        sseRouteHandler = handlers[handlers.length - 1]; // 最后一个handler
      }
    });

    (mockApp.post as jest.Mock).mockImplementation((path, ...handlers) => {
      if (path === '/messages') {
        messagesRouteHandler = handlers[handlers.length - 1]; // 最后一个handler
      }
    });
  });

  afterEach(() => {
    // 恢复原始console和process.exit
    console = originalConsole;
    process.exit = originalProcessExit;
  });

  it('应该初始化Express应用程序并创建HTTP服务器', () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const mockServer = new McpServer();

    initSSEServer(() => mockServer, options);

    // 验证基本的Express设置
    expect(express).toHaveBeenCalled();
    expect(mockApp.get).toHaveBeenCalledWith('/sse', expect.any(Function), expect.any(Function));
    expect(mockApp.post).toHaveBeenCalledWith('/messages', expect.any(Function), expect.any(Function));
    expect(mockApp.listen).toHaveBeenCalledWith(options.port, options.host, expect.any(Function));
  });

  it('应该处理SSE路由请求', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const mockServer = new McpServer();

    initSSEServer(() => mockServer, options);

    // 模拟请求和响应
    const mockReq = {};
    const mockRes = createMockResponse();

    // 调用SSE路由处理器
    await sseRouteHandler(mockReq, mockRes);

    // 验证SSEServerTransport被创建
    expect(SSEServerTransport).toHaveBeenCalledWith('/messages', mockRes);

    // 验证MCP服务器连接
    expect(mcpConnectMock).toHaveBeenCalled();
  });

  it('应该处理/messages POST请求 - 成功情况', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const mockServer = new McpServer();

    initSSEServer(() => mockServer, options);

    // 首先设置一个transport（通过调用SSE路由）
    const mockRes1 = createMockResponse();
    await sseRouteHandler({}, mockRes1);

    // 模拟POST /messages请求
    const mockReq = {
      query: { sessionId: 'test-session-id' },
    };

    const mockRes2 = createMockResponse();

    // 调用messages路由处理器
    await messagesRouteHandler(mockReq, mockRes2);

    // 验证handlePostMessage被调用
    expect(handlePostMessageMock).toHaveBeenCalledWith(mockReq, mockRes2);
  });

  it('应该处理/messages POST请求 - 找不到transport的情况', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const mockServer = new McpServer();

    initSSEServer(() => mockServer, options);

    // 模拟POST /messages请求，但没有对应的sessionId
    const mockReq = {
      query: { sessionId: 'non-existent-session-id' },
    };

    const mockRes = createMockResponse();

    // 调用messages路由处理器
    await messagesRouteHandler(mockReq, mockRes);

    // 验证返回400错误
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith('No transport found for sessionId');
  });

  it('应该处理响应关闭事件', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const mockServer = new McpServer();

    initSSEServer(() => mockServer, options);

    // 模拟请求和响应
    const mockReq = {};
    const mockRes = createMockResponse();

    // 调用SSE路由处理器
    await sseRouteHandler(mockReq, mockRes);

    // 等待close事件被触发
    await new Promise((resolve) => setTimeout(resolve, 10));

    // 验证close回调被调用
    expect(transportCloseMock).toHaveBeenCalled();
    expect(mcpCloseMock).toHaveBeenCalled();
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
    const mockServer = new McpServer();

    initSSEServer(() => mockServer, options);

    // 验证LarkAuthHandler被创建
    expect(LarkAuthHandler).toHaveBeenCalledWith(mockApp, options);

    // 验证路由包含认证中间件
    expect(mockApp.get).toHaveBeenCalledWith('/sse', expect.any(Function), expect.any(Function));
    expect(mockApp.post).toHaveBeenCalledWith('/messages', expect.any(Function), expect.any(Function));
  });

  it('应该处理服务器启动错误', () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const mockServer = new McpServer();

    // 模拟服务器启动错误
    (mockApp.listen as jest.Mock).mockImplementation((port, host, callback) => {
      if (callback) callback(new Error('Port already in use'));
      return { close: jest.fn() };
    });

    initSSEServer(() => mockServer, options);

    // 验证错误被记录并且进程退出
    expect(console.error).toHaveBeenCalledWith('[SSEServerTransport] Server error: Error: Port already in use');
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it('应该在缺少必需参数时抛出错误', () => {
    const invalidOptions: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      // 缺少 host 和 port
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const mockServer = new McpServer();

    expect(() => {
      initSSEServer(() => mockServer, invalidOptions);
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

    initSSEServer(getNewServerMock, options);

    // 验证Express路由被正确设置
    expect(mockApp.get).toHaveBeenCalledWith('/sse', expect.any(Function), expect.any(Function));
    expect(mockApp.post).toHaveBeenCalledWith('/messages', expect.any(Function), expect.any(Function));
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
    const mockServer = new McpServer();

    initSSEServer(() => mockServer, options);

    // 验证成功日志
    expect(console.log).toHaveBeenCalledWith('📡 SSE endpoint: http://localhost:3000/sse');
  });

  it('应该在没有OAuth时不创建认证处理器', () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
      oauth: false,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const mockServer = new McpServer();

    initSSEServer(() => mockServer, options);

    // 验证LarkAuthHandler没有被创建
    expect(LarkAuthHandler).not.toHaveBeenCalled();
  });

  it('应该处理console.log被调用的情况', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const mockServer = new McpServer();

    initSSEServer(() => mockServer, options);

    // 模拟POST /messages请求以触发console.log
    const mockReq = {
      query: { sessionId: 'test-session-id' },
    };
    const mockRes = createMockResponse();

    // 调用messages路由处理器
    await messagesRouteHandler(mockReq, mockRes);

    // 验证console.log被调用
    expect(console.log).toHaveBeenCalledWith('Received POST messages request');
  });

  it('应该调用parseMCPServerOptionsFromRequest解析请求参数', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
    const mockServer = new McpServer();

    initSSEServer(() => mockServer, options);

    const mockReq = {};
    const mockRes = createMockResponse();

    await sseRouteHandler(mockReq, mockRes);

    expect(parseMCPServerOptionsFromRequest).toHaveBeenCalledWith(mockReq);
  });

  describe('authMiddleware without OAuth', () => {
    it('应该处理带有Authorization头的请求', async () => {
      const options: McpServerOptions = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        host: 'localhost',
        port: 3000,
        // 不设置oauth，使用默认的authMiddleware逻辑
      };

      const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
      const mockServer = new McpServer();

      initSSEServer(() => mockServer, options);

      const mockReq: any = {
        headers: {
          authorization: 'Bearer test-token-123',
        },
      };
      const mockRes = createMockResponse();
      const mockNext = jest.fn();

      // 获取authMiddleware函数 (第二个参数是authMiddleware)
      const getCall = (mockApp.get as jest.Mock).mock.calls.find((call) => call[0] === '/sse');
      const authMiddleware = getCall[1];

      // 直接调用authMiddleware
      authMiddleware(mockReq, mockRes, mockNext);

      // 验证请求对象被正确设置
      expect(mockReq.auth).toEqual({
        token: 'test-token-123',
        clientId: 'LOCAL',
        scopes: [],
      });
      expect(mockNext).toHaveBeenCalled();
    });

    it('应该处理没有Authorization头的请求', async () => {
      const options: McpServerOptions = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        host: 'localhost',
        port: 3000,
        // 不设置oauth
      };

      const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
      const mockServer = new McpServer();

      initSSEServer(() => mockServer, options);

      const mockReq: any = {
        headers: {},
      };
      const mockRes = createMockResponse();
      const mockNext = jest.fn();

      // 获取authMiddleware函数
      const getCall = (mockApp.get as jest.Mock).mock.calls.find((call) => call[0] === '/sse');
      const authMiddleware = getCall[1];

      // 直接调用authMiddleware
      authMiddleware(mockReq, mockRes, mockNext);

      // 验证没有设置auth属性
      expect(mockReq.auth).toBeUndefined();
      expect(mockNext).toHaveBeenCalled();
    });

    it('应该处理格式错误的Authorization头', async () => {
      const options: McpServerOptions = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        host: 'localhost',
        port: 3000,
      };

      const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
      const mockServer = new McpServer();

      initSSEServer(() => mockServer, options);

      const mockReq: any = {
        headers: {
          authorization: 'InvalidFormat', // 没有空格分隔的格式
        },
      };
      const mockRes = createMockResponse();
      const mockNext = jest.fn();

      // 获取authMiddleware函数
      const getCall = (mockApp.get as jest.Mock).mock.calls.find((call) => call[0] === '/sse');
      const authMiddleware = getCall[1];

      // 直接调用authMiddleware
      authMiddleware(mockReq, mockRes, mockNext);

      // 验证没有设置auth属性（因为split后第二部分是undefined）
      expect(mockReq.auth).toBeUndefined();
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('POST /messages 认证', () => {
    it('应该在有authHandler时调用认证中间件', async () => {
      const options: McpServerOptions = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        host: 'localhost',
        port: 3000,
        oauth: true,
        domain: 'test.domain.com',
      };

      const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
      const mockServer = new McpServer();

      // 创建一个具有authenticateRequest方法的mock LarkAuthHandler
      const mockAuthHandler = {
        authenticateRequest: jest.fn((req, res, next) => next()),
      };
      (LarkAuthHandler as jest.Mock).mockImplementation(() => mockAuthHandler);

      initSSEServer(() => mockServer, options);

      // 首先设置一个transport
      const mockRes1 = createMockResponse();
      await sseRouteHandler({}, mockRes1);

      // 现在测试POST /messages
      const mockReq = {
        query: { sessionId: 'test-session-id' },
      };
      const mockRes2 = createMockResponse();

      // 获取POST路由的中间件（第一个参数是路径，第二个是认证中间件，第三个是主处理器）
      const postRouteCall = (mockApp.post as jest.Mock).mock.calls.find((call) => call[0] === '/messages');
      const authMiddleware = postRouteCall[1];

      // 调用认证中间件
      const mockNext = jest.fn();
      authMiddleware(mockReq, mockRes2, mockNext);

      // 验证认证方法被调用
      expect(mockAuthHandler.authenticateRequest).toHaveBeenCalledWith(mockReq, mockRes2, mockNext);
    });

    it('应该在没有authHandler时跳过认证', () => {
      const options: McpServerOptions = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        host: 'localhost',
        port: 3000,
        // 不设置oauth，authHandler将为undefined
      };

      const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
      const mockServer = new McpServer();

      initSSEServer(() => mockServer, options);

      // 获取POST路由的中间件
      const postRouteCall = (mockApp.post as jest.Mock).mock.calls.find((call) => call[0] === '/messages');
      const authMiddleware = postRouteCall[1];

      // 调用认证中间件
      const mockReq = {
        headers: {},
      };
      const mockRes = createMockResponse();
      const mockNext = jest.fn();

      authMiddleware(mockReq, mockRes, mockNext);

      // 验证next()被直接调用（因为没有authHandler?.authenticateRequest调用）
      expect(mockNext).toHaveBeenCalled();
    });
  });
});
