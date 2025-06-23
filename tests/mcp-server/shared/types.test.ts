import {
  mcpServerOptionSchema,
  McpServerOptions,
  McpServerType,
  McpServerTransport,
} from '../../../src/mcp-server/shared/types';
import * as larkmcp from '../../../src/mcp-tool';

describe('MCP Server Types', () => {
  describe('McpServerType', () => {
    it('应该包含有效的服务器类型', () => {
      const validTypes: McpServerType[] = ['oapi', 'recall'];

      validTypes.forEach((type) => {
        expect(['oapi', 'recall']).toContain(type);
      });
    });
  });

  describe('McpServerTransport', () => {
    it('应该包含有效的传输类型', () => {
      const validTransports: McpServerTransport[] = ['stdio', 'sse', 'streamable'];

      validTransports.forEach((transport) => {
        expect(['stdio', 'sse', 'streamable']).toContain(transport);
      });
    });
  });

  describe('mcpServerOptionSchema', () => {
    it('应该验证空对象', () => {
      const result = mcpServerOptionSchema.safeParse({});

      expect(result.success).toBe(true);
      expect(result.data).toEqual({});
    });

    it('应该验证包含所有可选字段的对象', () => {
      const validOptions = {
        tools: 'tool1',
        language: 'zh' as const,
        toolNameCase: 'snake' as const,
        tokenMode: 'auto' as const,
      };

      const result = mcpServerOptionSchema.safeParse(validOptions);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(validOptions);
    });

    describe('tools字段', () => {
      it('应该接受字符串类型的tools', () => {
        const options = { tools: 'single-tool' };
        const result = mcpServerOptionSchema.safeParse(options);

        expect(result.success).toBe(true);
        expect(result.data?.tools).toBe('single-tool');
      });

      it('应该接受字符串数组类型的tools', () => {
        const options = { tools: ['tool1', 'tool2', 'tool3'] };
        const result = mcpServerOptionSchema.safeParse(options);

        expect(result.success).toBe(true);
        expect(result.data?.tools).toEqual(['tool1', 'tool2', 'tool3']);
      });

      it('应该拒绝无效的tools类型', () => {
        const options = { tools: 123 };
        const result = mcpServerOptionSchema.safeParse(options);

        expect(result.success).toBe(false);
      });
    });

    describe('language字段', () => {
      it('应该接受zh语言', () => {
        const options = { language: 'zh' as const };
        const result = mcpServerOptionSchema.safeParse(options);

        expect(result.success).toBe(true);
        expect(result.data?.language).toBe('zh');
      });

      it('应该接受en语言', () => {
        const options = { language: 'en' as const };
        const result = mcpServerOptionSchema.safeParse(options);

        expect(result.success).toBe(true);
        expect(result.data?.language).toBe('en');
      });

      it('应该拒绝无效的语言', () => {
        const options = { language: 'fr' };
        const result = mcpServerOptionSchema.safeParse(options);

        expect(result.success).toBe(false);
      });
    });

    describe('toolNameCase字段', () => {
      it('应该接受snake case', () => {
        const options = { toolNameCase: 'snake' as const };
        const result = mcpServerOptionSchema.safeParse(options);

        expect(result.success).toBe(true);
        expect(result.data?.toolNameCase).toBe('snake');
      });

      it('应该接受camel case', () => {
        const options = { toolNameCase: 'camel' as const };
        const result = mcpServerOptionSchema.safeParse(options);

        expect(result.success).toBe(true);
        expect(result.data?.toolNameCase).toBe('camel');
      });

      it('应该拒绝无效的命名风格', () => {
        const options = { toolNameCase: 'pascal' };
        const result = mcpServerOptionSchema.safeParse(options);

        expect(result.success).toBe(false);
      });
    });

    describe('tokenMode字段', () => {
      it('应该接受auto模式', () => {
        const options = { tokenMode: 'auto' as const };
        const result = mcpServerOptionSchema.safeParse(options);

        expect(result.success).toBe(true);
        expect(result.data?.tokenMode).toBe('auto');
      });

      it('应该接受user_access_token模式', () => {
        const options = { tokenMode: 'user_access_token' as const };
        const result = mcpServerOptionSchema.safeParse(options);

        expect(result.success).toBe(true);
        expect(result.data?.tokenMode).toBe('user_access_token');
      });

      it('应该接受tenant_access_token模式', () => {
        const options = { tokenMode: 'tenant_access_token' as const };
        const result = mcpServerOptionSchema.safeParse(options);

        expect(result.success).toBe(true);
        expect(result.data?.tokenMode).toBe('tenant_access_token');
      });

      it('应该拒绝无效的token模式', () => {
        const options = { tokenMode: 'invalid_mode' };
        const result = mcpServerOptionSchema.safeParse(options);

        expect(result.success).toBe(false);
      });
    });

    describe('组合验证', () => {
      it('应该验证包含多个字段的复杂对象', () => {
        const complexOptions = {
          tools: ['tool1', 'tool2'],
          language: 'en' as const,
          toolNameCase: 'camel' as const,
          tokenMode: 'user_access_token' as const,
        };

        const result = mcpServerOptionSchema.safeParse(complexOptions);

        expect(result.success).toBe(true);
        expect(result.data).toEqual(complexOptions);
      });

      it('应该在包含无效字段时失败', () => {
        const invalidOptions = {
          tools: ['tool1', 'tool2'],
          language: 'invalid_language',
          toolNameCase: 'camel' as const,
          tokenMode: 'user_access_token' as const,
        };

        const result = mcpServerOptionSchema.safeParse(invalidOptions);

        expect(result.success).toBe(false);
      });

      it('应该忽略额外的字段', () => {
        const optionsWithExtra = {
          tools: 'tool1',
          language: 'zh' as const,
          extraField: 'should-be-ignored',
        };

        const result = mcpServerOptionSchema.safeParse(optionsWithExtra);

        expect(result.success).toBe(true);
        expect(result.data).toEqual({
          tools: 'tool1',
          language: 'zh',
        });
        expect(result.data).not.toHaveProperty('extraField');
      });
    });
  });

  describe('McpServerOptions接口', () => {
    it('应该允许所有字段都是可选的', () => {
      const options: McpServerOptions = {};

      expect(options).toBeDefined();
    });

    it('应该允许设置所有字段', () => {
      const options: McpServerOptions = {
        appId: 'test-app-id',
        appSecret: 'test-app-secret',
        domain: 'test.domain.com',
        tools: ['single-tool'],
        language: 'zh',
        toolNameCase: 'snake',
        tokenMode: 'auto' as larkmcp.TokenMode,
        userAccessToken: 'test-token',
        oauth: true,
        scope: ['test-scope'],
        mode: 'stdio',
        host: 'localhost',
        port: 3000,
      };

      expect(options.appId).toBe('test-app-id');
      expect(options.language).toBe('zh');
      expect(options.mode).toBe('stdio');
      expect(options.oauth).toBe(true);
    });

    it('应该支持不同的tools类型', () => {
      const optionsWithStringTools: McpServerOptions = {
        tools: ['single-tool'],
      };

      const optionsWithArrayTools: McpServerOptions = {
        tools: ['tool1', 'tool2'],
      };

      expect(optionsWithStringTools.tools).toEqual(['single-tool']);
      expect(optionsWithArrayTools.tools).toEqual(['tool1', 'tool2']);
    });

    it('应该支持所有语言选项', () => {
      const zhOptions: McpServerOptions = { language: 'zh' };
      const enOptions: McpServerOptions = { language: 'en' };

      expect(zhOptions.language).toBe('zh');
      expect(enOptions.language).toBe('en');
    });

    it('应该支持所有传输模式', () => {
      const stdioOptions: McpServerOptions = { mode: 'stdio' };
      const sseOptions: McpServerOptions = { mode: 'sse' };
      const streamableOptions: McpServerOptions = { mode: 'streamable' };

      expect(stdioOptions.mode).toBe('stdio');
      expect(sseOptions.mode).toBe('sse');
      expect(streamableOptions.mode).toBe('streamable');
    });
  });
});
