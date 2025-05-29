#!/usr/bin/env node

import fs from 'fs';
import dotenv from 'dotenv';
import { Command } from 'commander';
import { currentVersion } from './utils/version';
import { initStdioServer, initSSEServer, initMcpServer } from './mcp-server';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { RecallTool } from './mcp-tool/document-tool/recall';
import { OAPI_MCP_DEFAULT_ARGS, OAPI_MCP_ENV_ARGS } from './utils/constants';
import { FeishuOAuth } from './utils/oauth';
import { TokenStorage } from './utils/token-storage';
import { OAuthCallbackServer } from './utils/oauth-server';

dotenv.config();

const program = new Command();

program.name('lark-mcp').description('Feishu/Lark MCP Tool').version(currentVersion);

program
  .command('mcp')
  .description('Start Feishu/Lark MCP Service')
  .option('-a, --app-id <appId>', 'Feishu/Lark App ID')
  .option('-s, --app-secret <appSecret>', 'Feishu/Lark App Secret')
  .option('-d, --domain <domain>', 'Feishu/Lark Domain (default: "https://open.feishu.cn")')
  .option('-t, --tools <tools>', 'Allowed Tools List, separated by commas')
  .option('-c, --tool-name-case <toolNameCase>', 'Tool Name Case, snake or camel or kebab or dot (default: "snake")')
  .option('-l, --language <language>', 'Tools Language, zh or en (default: "en")')
  .option('-u, --user-access-token <userAccessToken>', 'User Access Token (beta)')
  .option('--token-mode <tokenMode>', 'Token Mode, auto or user_access_token or tenant_access_token (default: "auto")')
  .option('-m, --mode <mode>', 'Transport Mode, stdio or sse (default: "stdio")')
  .option('--host <host>', 'Host to listen (default: "localhost")')
  .option('-p, --port <port>', 'Port to listen in sse mode (default: "3000")')
  .option('--config <configPath>', 'Config file path (JSON)')
  .action(async (options) => {
    let fileOptions = {};
    if (options.config) {
      try {
        const configContent = fs.readFileSync(options.config, 'utf-8');
        fileOptions = JSON.parse(configContent);
      } catch (err) {
        console.error('Failed to read config file:', err);
        process.exit(1);
      }
    }
    const mergedOptions = { ...OAPI_MCP_DEFAULT_ARGS, ...OAPI_MCP_ENV_ARGS, ...fileOptions, ...options };
    const { mcpServer } = await initMcpServer(mergedOptions);
    if (mergedOptions.mode === 'stdio') {
      initStdioServer(mcpServer);
    } else if (mergedOptions.mode === 'sse') {
      initSSEServer(mcpServer, mergedOptions);
    } else {
      console.error('Invalid mode:', mergedOptions.mode);
      process.exit(1);
    }
  });

program
  .command('recall-developer-documents')
  .description('Start Feishu/Lark Open Platform Recall MCP Service')
  .option('-d, --domain <domain>', 'Feishu Open Platform Domain', 'https://open.feishu.cn')
  .option('-m, --mode <mode>', 'Transport Mode, stdio or sse', 'stdio')
  .option('--host <host>', 'Host to listen', 'localhost')
  .option('-p, --port <port>', 'Port to listen in sse mode', '3001')
  .action((options) => {
    const server = new McpServer({
      id: 'lark-recall-mcp-server',
      name: 'Lark Recall MCP Service',
      version: currentVersion,
    });
    server.tool(RecallTool.name, RecallTool.description, RecallTool.schema, (params) =>
      RecallTool.handler(params, options),
    );
    if (options.mode === 'stdio') {
      initStdioServer(server);
    } else if (options.mode === 'sse') {
      initSSEServer(server, options);
    } else {
      console.error('Invalid mode:', options.mode);
      process.exit(1);
    }
  });

program
  .command('oauth')
  .description('Manage OAuth authentication')
  .option('-a, --app-id <appId>', 'Feishu/Lark App ID')
  .option('-s, --app-secret <appSecret>', 'Feishu/Lark App Secret')
  .option('-d, --domain <domain>', 'Feishu/Lark Domain (default: "https://passport.feishu.cn")')
  .option('-r, --redirect-uri <redirectUri>', 'OAuth redirect URI (default: "http://localhost:8080/callback")')
  .option('--scope <scope>', 'OAuth scope (default: "user:email")')
  .option('--clear', 'Clear stored tokens')
  .option('--interactive', 'Start interactive OAuth flow with built-in callback server')
  .option('--port <port>', 'Port for OAuth callback server (default: 8080)', '8080')
  .action(async (options) => {
    const tokenStorage = new TokenStorage();
    
    if (options.clear) {
      await tokenStorage.clearTokens();
      console.log('Stored tokens cleared successfully');
      return;
    }

    const appId = options.appId || process.env.APP_ID;
    const appSecret = options.appSecret || process.env.APP_SECRET;
    const port = parseInt(options.port);
    const redirectUri = options.redirectUri || `http://localhost:${port}/callback`;
    const domain = options.domain || 'https://passport.feishu.cn';

    if (!appId || !appSecret) {
      console.error('Error: App ID and App Secret are required for OAuth');
      console.error('Use --app-id and --app-secret options or set APP_ID and APP_SECRET environment variables');
      process.exit(1);
    }

    const oauth = new FeishuOAuth({
      clientId: appId,
      clientSecret: appSecret,
      redirectUri,
      domain,
    });

    if (options.interactive) {
      console.log('\n🔐 Starting Interactive OAuth Flow');
      console.log('═'.repeat(50));
      
      const callbackServer = new OAuthCallbackServer(port);
      
      try {
        const authUrl = oauth.generateAuthUrl({ scope: options.scope });
        
        console.log('1. Opening your browser for authorization...');
        console.log(`   ${authUrl}\n`);
        console.log('2. Waiting for authorization callback...');
        
        // Start callback server
        const callbackPromise = callbackServer.waitForCallback();
        
        // Try to open browser
        try {
          const { default: open } = await import('open');
          await open(authUrl).catch(() => {
            console.log('⚠️  Could not open browser automatically. Please open the URL manually.');
          });
        } catch (error) {
          console.log('⚠️  Could not open browser automatically. Please open the URL manually.');
        }
        
        const result = await callbackPromise;
        
        if (result.code) {
          console.log('🔄 Exchanging authorization code for tokens...');
          const tokens = await oauth.exchangeCodeForTokens(result.code);
          await tokenStorage.storeTokens(tokens);
          console.log('✅ OAuth tokens obtained and stored successfully!');
          console.log('You can now use the MCP server without providing user access tokens manually.');
        }
      } catch (error) {
        console.error('❌ Interactive OAuth flow failed:', (error as Error).message);
        process.exit(1);
      } finally {
        callbackServer.stop();
      }
    } else {
      const authUrl = oauth.generateAuthUrl({ scope: options.scope });
      
      console.log('\n🔐 OAuth Authorization Required');
      console.log('═'.repeat(50));
      console.log('1. Open the following URL in your browser:');
      console.log(`\n   ${authUrl}\n`);
      console.log('2. Complete the authorization process');
      console.log('3. Copy the authorization code from the callback URL');
      console.log('4. Run: lark-mcp oauth-callback <authorization-code>');
      console.log('\nTip: Use --interactive flag for automatic handling');
      console.log('═'.repeat(50));
    }
  });

program
  .command('oauth-callback')
  .description('Handle OAuth callback with authorization code')
  .argument('<code>', 'Authorization code from OAuth callback')
  .option('-a, --app-id <appId>', 'Feishu/Lark App ID')
  .option('-s, --app-secret <appSecret>', 'Feishu/Lark App Secret')
  .option('-d, --domain <domain>', 'Feishu/Lark Domain (default: "https://passport.feishu.cn")')
  .option('-r, --redirect-uri <redirectUri>', 'OAuth redirect URI (default: "http://localhost:8080/callback")')
  .action(async (code, options) => {
    const appId = options.appId || process.env.APP_ID;
    const appSecret = options.appSecret || process.env.APP_SECRET;
    const redirectUri = options.redirectUri || 'http://localhost:8080/callback';
    const domain = options.domain || 'https://passport.feishu.cn';

    if (!appId || !appSecret) {
      console.error('Error: App ID and App Secret are required');
      process.exit(1);
    }

    try {
      const oauth = new FeishuOAuth({
        clientId: appId,
        clientSecret: appSecret,
        redirectUri,
        domain,
      });

      console.log('🔄 Exchanging authorization code for tokens...');
      const tokens = await oauth.exchangeCodeForTokens(code);
      
      const tokenStorage = new TokenStorage();
      await tokenStorage.storeTokens(tokens);
      
      console.log('✅ OAuth tokens obtained and stored successfully!');
      console.log('You can now use the MCP server without providing user access tokens manually.');
    } catch (error) {
      console.error('❌ Failed to exchange authorization code:', (error as Error).message);
      process.exit(1);
    }
  });

if (process.argv.length === 2) {
  program.help();
}

program.parse(process.argv);

export { program };
