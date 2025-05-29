import { initStdioServer } from '../../src/mcp-server/stdio';
import { initMcpServer } from '../../src/mcp-server/shared/init';
import { McpServerOptions } from '../../src/mcp-server/shared/types';

// 创建可追踪的模拟函数
const connectMock = jest.fn().mockResolvedValue(undefined);
const connectErrorMock = jest.fn().mockRejectedValue(new Error('Connection error'));

// 模拟依赖
jest.mock('../../src/mcp-server/shared/init', () => {
  return {
    initMcpServer: jest.fn().mockImplementation(() => ({
      mcpServer: {
        connect: connectMock,
      },
      larkClient: {},
    })),
  };
});

// 模拟 McpServer
jest.mock('@modelcontextprotocol/sdk/server/mcp.js', () => ({
  McpServer: jest.fn().mockImplementation(() => ({
    connect: connectMock,
    server: {},
    _registeredResources: {},
    _registeredResourceTemplates: {},
    _registeredTools: {},
  })),
}));

jest.mock('@modelcontextprotocol/sdk/server/stdio', () => ({
  StdioServerTransport: jest.fn().mockImplementation(() => ({
    connect: jest.fn(),
  })),
}));

// 保存原始console
const originalConsole = console;

// 创建用于stdin的模拟函数
const setEncodingMock = jest.fn().mockReturnValue(process.stdin);
const resumeMock = jest.fn().mockReturnValue(process.stdin);
const onMock = jest.fn().mockReturnValue(process.stdin);

describe('initStdioServer', () => {
  beforeEach(() => {
    // 重置所有模拟
    jest.clearAllMocks();

    // 模拟console方法
    console.log = jest.fn();
    console.error = jest.fn();

    // 模拟process方法，但不直接替换对象
    jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
    jest.spyOn(process.stdin, 'setEncoding').mockImplementation(setEncodingMock);
    jest.spyOn(process.stdin, 'resume').mockImplementation(resumeMock);
    jest.spyOn(process.stdin, 'on').mockImplementation(onMock);
    jest.spyOn(process.stderr, 'write').mockImplementation(() => true);
    jest.spyOn(process, 'exit').mockImplementation((code?: string | number | null) => {
      return undefined as never;
    });
  });

  afterEach(() => {
    // 恢复原始console
    console = originalConsole;

    // 清除所有模拟
    jest.restoreAllMocks();
  });

  it('应该初始化MCP服务器并连接', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    // 首先初始化MCP服务器
    const { mcpServer } = await initMcpServer(options);

    // 然后使用mcpServer调用initStdioServer
    initStdioServer(mcpServer);

    // 验证调用
    expect(initMcpServer).toHaveBeenCalledWith(options);
    expect(connectMock).toHaveBeenCalled();
  });

  it('应该处理连接错误', async () => {
    const options: McpServerOptions = {
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      host: 'localhost',
      port: 3000,
    };

    // 修改connect的实现以模拟错误
    (initMcpServer as jest.Mock).mockImplementationOnce(() => ({
      mcpServer: {
        connect: connectErrorMock,
      },
      larkClient: {},
    }));

    // 首先初始化MCP服务器
    const { mcpServer } = await initMcpServer(options);

    // 然后使用mcpServer调用initStdioServer
    initStdioServer(mcpServer);

    // 假设错误处理是异步的，我们需要等待Promise rejecting
    return new Promise<void>(process.nextTick).then(() => {
      // 验证错误处理
      expect(connectErrorMock).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('MCP Connect Error:', expect.any(Error));
      expect(process.exit).toHaveBeenCalledWith(1);
    });
  });
});
