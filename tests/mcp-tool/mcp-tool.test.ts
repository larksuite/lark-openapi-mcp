import { Client } from '@larksuiteoapi/node-sdk';
import { LarkMcpTool } from '../../src/mcp-tool/mcp-tool';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { filterTools } from '../../src/mcp-tool/utils/filter-tools';
import { caseTransf } from '../../src/mcp-tool/utils/case-transf';
import { ToolName } from '../../src/mcp-tool/tools';
import { larkOapiHandler } from '../../src/mcp-tool/utils/handler';
import { TokenMode } from '../../src/mcp-tool/types';
import { LarkAuthHandler, isTokenValid } from '../../src/auth';

// 模拟依赖项
jest.mock('../../src/mcp-tool/utils/filter-tools');
jest.mock('../../src/mcp-tool/utils/case-transf');
jest.mock('../../src/mcp-tool/utils/handler');
jest.mock('../../src/auth');

// mock larkOapiHandler
const mockLarkOapiHandler = jest.fn();
jest.mocked(larkOapiHandler).mockImplementation(mockLarkOapiHandler);

// 模拟McpServer
const mockServer = {
  tool: jest.fn(),
} as unknown as McpServer;

describe('LarkMcpTool', () => {
  let larkMcpTool: LarkMcpTool;
  let mockClient: jest.Mocked<Client>;
  let mockAuth: jest.Mocked<LarkAuthHandler>;

  beforeEach(() => {
    jest.clearAllMocks();

    // 设置mock返回值
    (filterTools as jest.Mock).mockReturnValue([
      {
        name: 'im.v1.message.create',
        description: '发送消息',
        schema: {},
        project: 'im',
        accessTokens: ['user', 'tenant'],
        sdkName: 'im.message.create',
      },
    ]);

    (caseTransf as jest.Mock).mockImplementation((toolName, caseType) => {
      if (caseType === 'snake') return 'im_v1_message_create';
      if (caseType === 'camel') return 'imV1MessageCreate';
      if (caseType === 'kebab') return 'im-v1-message-create';
      return 'im_v1_message_create';
    });

    mockClient = new Client({ appId: 'test-app-id', appSecret: 'test-app-secret' }) as jest.Mocked<Client>;
    larkMcpTool = new LarkMcpTool({
      client: mockClient,
      tokenMode: TokenMode.AUTO,
    });

    // 模拟LarkAuthHandler
    mockAuth = {
      refreshToken: jest.fn(),
      reAuthorize: jest.fn(),
    } as any;

    // 模拟isTokenValid
    (isTokenValid as jest.Mock).mockResolvedValue({
      valid: true,
      isExpired: false,
      token: null,
    });
  });

  describe('constructor and basic functionality', () => {
    it('应该正确初始化和处理基本配置', () => {
      // 测试多种初始化方式
      expect(filterTools).toHaveBeenCalled();

      // 测试无客户端创建
      const tool = new LarkMcpTool({
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      });
      expect(Client).toHaveBeenCalledWith({
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
      });

      // 测试中文工具配置
      new LarkMcpTool({
        client: mockClient,
        toolsOptions: { language: 'zh' },
      });
      expect(filterTools).toHaveBeenCalledWith(expect.any(Array), expect.objectContaining({ language: 'zh' }));
    });

    it('应该正确管理用户访问令牌', () => {
      larkMcpTool.updateUserAccessToken('test-token');
      const tools = larkMcpTool.getTools();
      expect(tools).toEqual([
        {
          name: 'im.v1.message.create',
          description: '发送消息',
          schema: {},
          project: 'im',
          accessTokens: ['user', 'tenant'],
          sdkName: 'im.message.create',
        },
      ]);
    });
  });

  describe('registerMcpServer', () => {
    it('应该正确注册工具到MCP服务器并处理不同配置', () => {
      // 基本注册
      larkMcpTool.registerMcpServer(mockServer);
      expect(caseTransf).toHaveBeenCalledWith('im.v1.message.create', undefined);
      expect(mockServer.tool).toHaveBeenCalledWith('im_v1_message_create', '发送消息', {}, expect.any(Function));

      // 不同命名风格
      jest.clearAllMocks();
      larkMcpTool.registerMcpServer(mockServer, { toolNameCase: 'camel' });
      expect(caseTransf).toHaveBeenCalledWith('im.v1.message.create', 'camel');
      expect(mockServer.tool).toHaveBeenCalledWith('imV1MessageCreate', '发送消息', {}, expect.any(Function));
    });

    it('应该处理客户端未初始化错误', async () => {
      const toolWithoutClient = new LarkMcpTool({
        toolsOptions: { allowTools: ['im.v1.message.create'] as ToolName[] },
      });

      toolWithoutClient.registerMcpServer(mockServer);
      const handlerFunction = (mockServer.tool as jest.Mock).mock.calls[0][3];

      const result = await handlerFunction({ content: 'test' });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('{"msg":"Client not initialized"}');
    });

    it('应该支持自定义处理器', async () => {
      const customHandlerMock = jest.fn().mockResolvedValue({
        content: [{ type: 'text', text: 'Custom handler response' }],
      });

      (filterTools as jest.Mock).mockReturnValueOnce([
        {
          name: 'custom.handler.tool',
          description: '自定义处理程序工具',
          schema: {},
          project: 'custom',
          accessTokens: ['user', 'tenant'],
          sdkName: 'custom.handler.tool',
          customHandler: customHandlerMock,
        },
      ]);

      const toolWithCustomHandler = new LarkMcpTool({
        client: mockClient,
        tokenMode: TokenMode.AUTO,
      });

      toolWithCustomHandler.registerMcpServer(mockServer);
      const handlerFunction = (mockServer.tool as jest.Mock).mock.calls[0][3];

      await handlerFunction({ content: 'test' });
      expect(customHandlerMock).toHaveBeenCalledWith(
        mockClient,
        { content: 'test', useUAT: false },
        { tool: expect.any(Object) },
      );
    });
  });

  describe('token mode and authentication', () => {
    it('应该处理不同的令牌模式', () => {
      // 测试USER_ACCESS_TOKEN模式
      const userTokenTool = new LarkMcpTool({
        client: mockClient,
        tokenMode: TokenMode.USER_ACCESS_TOKEN,
      });
      expect(filterTools).toHaveBeenCalledWith(
        expect.any(Array),
        expect.objectContaining({ tokenMode: TokenMode.USER_ACCESS_TOKEN }),
      );

      // 测试TENANT_ACCESS_TOKEN模式
      const tenantTokenTool = new LarkMcpTool({
        client: mockClient,
        tokenMode: TokenMode.TENANT_ACCESS_TOKEN,
      });
      expect(filterTools).toHaveBeenCalledWith(
        expect.any(Array),
        expect.objectContaining({ tokenMode: TokenMode.TENANT_ACCESS_TOKEN }),
      );

      // 测试默认AUTO模式
      const autoTool = new LarkMcpTool({ client: mockClient });
      expect(filterTools).toHaveBeenCalledWith(
        expect.any(Array),
        expect.objectContaining({ tokenMode: TokenMode.AUTO }),
      );
    });

    it('应该处理USER_ACCESS_TOKEN模式的错误情况', async () => {
      const userTokenTool = new LarkMcpTool({
        client: mockClient,
        tokenMode: TokenMode.USER_ACCESS_TOKEN,
      });

      // 设置一个有效的用户访问令牌
      userTokenTool.updateUserAccessToken('valid-user-token');

      userTokenTool.registerMcpServer(mockServer);
      const handlerFunction = (mockServer.tool as jest.Mock).mock.calls[0][3];

      await handlerFunction({ content: 'test' });
      expect(mockLarkOapiHandler).toHaveBeenCalledWith(
        mockClient,
        { content: 'test', useUAT: true },
        { userAccessToken: 'valid-user-token', tool: expect.any(Object) },
      );
    });
  });

  describe('error handling and edge cases', () => {
    it('应该处理空工具数组', () => {
      (filterTools as jest.Mock).mockReturnValueOnce([]);
      const emptyTool = new LarkMcpTool({ client: mockClient });
      expect(emptyTool.getTools()).toEqual([]);
    });
  });

  describe('ensureGetUserAccessToken', () => {
    beforeEach(() => {
      larkMcpTool = new LarkMcpTool(
        {
          client: mockClient,
          oauth: true,
        },
        mockAuth,
      );
      larkMcpTool.updateUserAccessToken('test-token');
    });

    it('应该处理有效令牌和无OAuth情况', async () => {
      // 无OAuth的情况
      const toolWithoutAuth = new LarkMcpTool({ client: mockClient });
      toolWithoutAuth.updateUserAccessToken('test-token');
      const result1 = await toolWithoutAuth.ensureGetUserAccessToken();
      expect(result1).toEqual({ userAccessToken: 'test-token' });

      // 有效令牌的情况
      const result2 = await larkMcpTool.ensureGetUserAccessToken();
      expect(result2).toEqual({ userAccessToken: 'test-token' });
    });

    it('应该处理令牌过期和刷新', async () => {
      // 令牌过期，有refresh token
      (isTokenValid as jest.Mock).mockResolvedValueOnce({
        valid: false,
        isExpired: true,
        token: { token: 'old-token', extra: { refreshToken: 'refresh-token' } },
      });

      mockAuth.refreshToken.mockResolvedValueOnce({
        access_token: 'new-token',
        token_type: 'Bearer',
        refresh_token: 'new-refresh-token',
      });

      const result = await larkMcpTool.ensureGetUserAccessToken();
      expect(result).toEqual({ userAccessToken: 'new-token' });
      expect(mockAuth.refreshToken).toHaveBeenCalledWith('old-token');
    });

    it('应该处理重新授权场景', async () => {
      // 令牌无效，需要重新授权
      (isTokenValid as jest.Mock).mockResolvedValueOnce({
        valid: false,
        isExpired: false,
        token: null,
      });

      mockAuth.reAuthorize.mockResolvedValueOnce({
        accessToken: '',
        authorizeUrl: 'https://auth.example.com',
      });

      const result = await larkMcpTool.ensureGetUserAccessToken();
      expect(result).toEqual({ authorizeUrl: 'https://auth.example.com' });
    });

    it('应该处理刷新失败和其他错误情况', async () => {
      // 刷新失败回退到重新授权
      (isTokenValid as jest.Mock).mockResolvedValueOnce({
        valid: false,
        isExpired: true,
        token: { token: 'old-token', extra: { refreshToken: 'refresh-token' } },
      });

      mockAuth.refreshToken.mockRejectedValueOnce(new Error('Refresh failed'));
      mockAuth.reAuthorize.mockResolvedValueOnce({
        accessToken: '',
        authorizeUrl: 'https://auth.example.com',
      });

      const result = await larkMcpTool.ensureGetUserAccessToken();
      expect(result).toEqual({ authorizeUrl: 'https://auth.example.com' });
    });
  });

  describe('getter and setter functions', () => {
    it('应该处理getter和setter函数', async () => {
      const mockGetter = jest.fn().mockResolvedValue('token-from-getter');
      const mockSetter = jest.fn();

      const tool = new LarkMcpTool({ client: mockClient, oauth: true }, mockAuth);

      // 测试getter
      tool.updateUserAccessToken({ getter: mockGetter });
      tool.registerMcpServer(mockServer);
      const handlerFunction = (mockServer.tool as jest.Mock).mock.calls[0][3];
      await handlerFunction({ content: 'test', useUAT: true });
      expect(mockGetter).toHaveBeenCalled();

      // 测试setter
      tool.updateUserAccessToken({ setter: mockSetter });
      (isTokenValid as jest.Mock).mockResolvedValueOnce({
        valid: false,
        isExpired: true,
        token: { token: 'old-token', extra: { refreshToken: 'refresh-token' } },
      });

      mockAuth.refreshToken.mockResolvedValueOnce({
        access_token: 'new-token',
        token_type: 'Bearer',
        refresh_token: 'new-refresh-token',
      });

      await handlerFunction({ content: 'test', useUAT: true });
      expect(mockSetter).toHaveBeenCalledWith('new-token');
    });
  });

  describe('reAuthorize and authorization messages', () => {
    it('应该处理重新授权逻辑', async () => {
      const tool = new LarkMcpTool({ client: mockClient, oauth: true }, mockAuth);
      tool.updateUserAccessToken('invalid-token');

      // 直接返回access token
      mockAuth.reAuthorize.mockResolvedValueOnce({
        authorizeUrl: '',
        accessToken: 'new-access-token',
      });

      const result1 = await tool.reAuthorize();
      expect(result1).toEqual({ userAccessToken: 'new-access-token' });

      // 没有auth handler的情况
      const toolWithoutAuth = new LarkMcpTool({ client: mockClient, oauth: false });
      const result2 = await toolWithoutAuth.reAuthorize();
      expect(result2).toEqual({});
    });

    it('应该处理不同错误代码的重新授权消息', () => {
      const tool = new LarkMcpTool(
        {
          client: mockClient,
          oauth: true,
          domain: 'https://open.feishu.cn',
          appId: 'test-app-id',
        },
        mockAuth,
      );

      (mockAuth as any).callbackUrl = 'http://localhost:3000/callback';

      // 测试USER_ACCESS_TOKEN_UNAUTHORIZED错误
      const result1 = tool.getReAuthorizeMessage('https://auth.example.com', 99991679, 'Unauthorized scope');
      expect(result1.isError).toBe(true);
      const parsedContent1 = JSON.parse(result1.content[0].text);
      expect(parsedContent1.instruction).toContain('not authorized to some scopes');

      // 测试其他错误代码
      const result2 = tool.getReAuthorizeMessage('https://auth.example.com', 99991661, 'Invalid token');
      expect(result2.isError).toBe(true);
      expect(result2.content[0].text).toContain('invalid or expired');

      // 测试没有authorize URL
      const result3 = tool.getReAuthorizeMessage(undefined, 99991661, 'Invalid token');
      expect(result3.isError).toBe(true);
      const parsedContent = JSON.parse(result3.content[0].text);
      expect(parsedContent.instruction).toBeUndefined();
    });

    it('应该处理工具执行中的用户访问令牌错误和重新授权', async () => {
      const tool = new LarkMcpTool(
        {
          client: mockClient,
          oauth: true,
          domain: 'https://open.feishu.cn',
          appId: 'test-app-id',
          tokenMode: TokenMode.USER_ACCESS_TOKEN,
        },
        mockAuth,
      );

      (mockAuth as any).callbackUrl = 'http://localhost:3000/callback';
      tool.updateUserAccessToken('invalid-token');

      // 模拟ensureGetUserAccessToken返回authorizeUrl（没有userAccessToken）
      (isTokenValid as jest.Mock).mockResolvedValueOnce({
        valid: false,
        isExpired: false,
        token: null,
      });

      mockAuth.reAuthorize.mockResolvedValueOnce({
        authorizeUrl: 'https://auth.example.com',
        accessToken: '',
      });

      tool.registerMcpServer(mockServer);
      const handlerFunction = (mockServer.tool as jest.Mock).mock.calls[0][3];

      const result = await handlerFunction({ content: 'test', useUAT: true });

      expect(result.isError).toBe(true);
      const parsedContent = JSON.parse(result.content[0].text);
      expect(parsedContent.instruction).toContain('https://auth.example.com');
    });

    it('应该处理API调用返回USER_ACCESS_TOKEN_UNAUTHORIZED错误的重新授权', async () => {
      const tool = new LarkMcpTool(
        {
          client: mockClient,
          oauth: true,
          domain: 'https://open.feishu.cn',
          appId: 'test-app-id',
          tokenMode: TokenMode.USER_ACCESS_TOKEN,
        },
        mockAuth,
      );

      (mockAuth as any).callbackUrl = 'http://localhost:3000/callback';
      tool.updateUserAccessToken('valid-token');

      // 模拟有效的token检查
      (isTokenValid as jest.Mock).mockResolvedValue({
        valid: true,
        isExpired: false,
        token: null,
      });

      // 模拟API调用返回USER_ACCESS_TOKEN_UNAUTHORIZED错误
      mockLarkOapiHandler.mockResolvedValueOnce({
        isError: true,
        content: [{ type: 'text', text: JSON.stringify({ code: 99991679, msg: 'Token unauthorized' }) }],
      });

      // 模拟重新授权
      mockAuth.reAuthorize.mockResolvedValueOnce({
        authorizeUrl: 'https://reauth.example.com',
        accessToken: '',
      });

      tool.registerMcpServer(mockServer);
      const handlerFunction = (mockServer.tool as jest.Mock).mock.calls[0][3];

      const result = await handlerFunction({ content: 'test', useUAT: true });

      expect(result.isError).toBe(true);
      const parsedContent = JSON.parse(result.content[0].text);
      expect(parsedContent.instruction).toContain('not authorized to some scopes');
      expect(parsedContent.instruction).toContain('https://reauth.example.com');
      expect(mockAuth.reAuthorize).toHaveBeenCalled();
    });

    it('应该处理API调用返回USER_ACCESS_TOKEN_INVALID错误的重新授权', async () => {
      const tool = new LarkMcpTool(
        {
          client: mockClient,
          oauth: true,
          domain: 'https://open.feishu.cn',
          appId: 'test-app-id',
          tokenMode: TokenMode.USER_ACCESS_TOKEN,
        },
        mockAuth,
      );

      (mockAuth as any).callbackUrl = 'http://localhost:3000/callback';
      tool.updateUserAccessToken('valid-token');

      // 模拟有效的token检查
      (isTokenValid as jest.Mock).mockResolvedValue({
        valid: true,
        isExpired: false,
        token: null,
      });

      // 模拟API调用返回USER_ACCESS_TOKEN_INVALID错误（使用正确的错误代码99991668）
      mockLarkOapiHandler.mockResolvedValueOnce({
        isError: true,
        content: [{ type: 'text', text: JSON.stringify({ code: 99991668, msg: 'Token invalid' }) }],
      });

      // 模拟重新授权
      mockAuth.reAuthorize.mockResolvedValueOnce({
        authorizeUrl: 'https://reauth.example.com',
        accessToken: '',
      });

      tool.registerMcpServer(mockServer);
      const handlerFunction = (mockServer.tool as jest.Mock).mock.calls[0][3];

      const result = await handlerFunction({ content: 'test', useUAT: true });

      expect(result.isError).toBe(true);
      const parsedContent = JSON.parse(result.content[0].text);
      // 验证错误消息内容，99991668是USER_ACCESS_TOKEN_INVALID，不是UNAUTHORIZED，所以应该显示"invalid or expired"
      expect(parsedContent.instruction).toContain('invalid or expired');
      expect(parsedContent.instruction).toContain('https://reauth.example.com');
      expect(mockAuth.reAuthorize).toHaveBeenCalled();
    });

    it('应该处理API调用返回其他错误而不触发重新授权', async () => {
      const tool = new LarkMcpTool(
        {
          client: mockClient,
          oauth: true,
          tokenMode: TokenMode.USER_ACCESS_TOKEN,
        },
        mockAuth,
      );

      tool.updateUserAccessToken('valid-token');

      // 模拟有效的token检查
      (isTokenValid as jest.Mock).mockResolvedValue({
        valid: true,
        isExpired: false,
        token: null,
      });

      // 模拟API调用返回其他错误（不是token相关）
      const apiErrorResult = {
        isError: true,
        content: [{ type: 'text', text: JSON.stringify({ code: 12345, msg: 'Other API error' }) }],
      };
      mockLarkOapiHandler.mockResolvedValueOnce(apiErrorResult);

      tool.registerMcpServer(mockServer);
      const handlerFunction = (mockServer.tool as jest.Mock).mock.calls[0][3];

      const result = await handlerFunction({ content: 'test', useUAT: true });

      // 应该直接返回API错误，不触发重新授权
      expect(result).toEqual(apiErrorResult);
      expect(mockAuth.reAuthorize).not.toHaveBeenCalled();
    });

    it('应该处理API调用成功但不是错误的情况', async () => {
      const tool = new LarkMcpTool(
        {
          client: mockClient,
          oauth: true,
          tokenMode: TokenMode.USER_ACCESS_TOKEN,
        },
        mockAuth,
      );

      tool.updateUserAccessToken('valid-token');

      // 模拟有效的token检查
      (isTokenValid as jest.Mock).mockResolvedValue({
        valid: true,
        isExpired: false,
        token: null,
      });

      // 模拟API调用成功
      const successResult = {
        isError: false,
        content: [{ type: 'text', text: JSON.stringify({ code: 0, msg: 'Success', data: {} }) }],
      };
      mockLarkOapiHandler.mockResolvedValueOnce(successResult);

      tool.registerMcpServer(mockServer);
      const handlerFunction = (mockServer.tool as jest.Mock).mock.calls[0][3];

      const result = await handlerFunction({ content: 'test', useUAT: true });

      // 应该直接返回成功结果
      expect(result).toEqual(successResult);
      expect(mockAuth.reAuthorize).not.toHaveBeenCalled();
    });

    it('应该处理工具执行中抛出异常的情况', async () => {
      const tool = new LarkMcpTool({
        client: mockClient,
        tokenMode: TokenMode.AUTO,
      });

      // 注册工具并保存handler函数引用
      tool.registerMcpServer(mockServer);
      const handlerFunction = (mockServer.tool as jest.Mock).mock.calls[0][3];

      // 重新设置mock，让handler抛出异常
      mockLarkOapiHandler.mockImplementationOnce(() => {
        throw new Error('Handler execution failed');
      });

      const result = await handlerFunction({ content: 'test' });

      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('"Handler execution failed"');
    });
  });
});
