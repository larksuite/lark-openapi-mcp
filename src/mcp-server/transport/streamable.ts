import express, { NextFunction, Request, Response } from 'express';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { InitTransportServerFunction } from '../shared';
import { parseMCPServerOptionsFromRequest, sendJsonRpcError } from './utils';
import { LarkAuthHandler } from '../../auth';
import { logger } from '../../utils/logger';
import { createLocalUserAccessToken } from '../shared/local-user-access-token';

export const initStreamableServer: InitTransportServerFunction = (
  getNewServer,
  options,
  { needAuthFlow } = { needAuthFlow: false },
) => {
  const { userAccessToken, oauth, port, host, credentialSource, appId } = options;

  if (!port || !host) {
    throw new Error('[Lark MCP] Port and host are required');
  }

  const app = express();
  app.use(express.json());

  let authHandler: LarkAuthHandler | undefined;

  if (!userAccessToken && needAuthFlow) {
    authHandler = new LarkAuthHandler(app, options);
    if (oauth) {
      authHandler.setupRoutes();
    }
  }

  const localUserAccessToken = credentialSource === 'login' && appId ? createLocalUserAccessToken(appId) : undefined;

  const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (authHandler && oauth) {
      authHandler.authenticateRequest(req, res, next);
    } else {
      const authToken = req.headers.authorization?.split(' ')[1];
      if (authToken) {
        req.auth = { token: authToken, clientId: 'client_id_for_local_auth', scopes: [] };
      }
      next();
    }
  };

  app.post('/mcp', authMiddleware, async (req: Request, res: Response) => {
    const token = req.auth?.token;
    const { data } = parseMCPServerOptionsFromRequest(req);
    const resolvedUserAccessToken = localUserAccessToken || userAccessToken || data.userAccessToken || token;
    const server = getNewServer({ ...options, ...data, userAccessToken: resolvedUserAccessToken }, authHandler);
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    res.on('close', () => {
      transport.close();
      server.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  });

  const handleMethodNotAllowed = async (_req: Request, res: Response) => {
    res
      .writeHead(405)
      .end(JSON.stringify({ jsonrpc: '2.0', error: { code: -32000, message: 'Method not allowed.' }, id: null }));
  };

  app.get('/mcp', async (req: Request, res: Response) => {
    try {
      console.log('Received GET MCP request');
      logger.info(`[StreamableServerTransport] Received GET MCP request`);
      await handleMethodNotAllowed(req, res);
    } catch (error) {
      sendJsonRpcError(res, error as Error);
    }
  });

  app.delete('/mcp', async (req: Request, res: Response) => {
    try {
      console.log('Received DELETE MCP request');
      logger.info(`[StreamableServerTransport] Received DELETE MCP request`);
      await handleMethodNotAllowed(req, res);
    } catch (error) {
      sendJsonRpcError(res, error as Error);
    }
  });

  app.listen(port, host, (error) => {
    if (error) {
      logger.error(`[StreamableServerTransport] Server error: ${error}`);
      process.exit(1);
    }
    console.log(`📡 Streamable endpoint: http://${host}:${port}/mcp`);
    logger.info(`[StreamableServerTransport] Streamable endpoint: http://${host}:${port}/mcp`);
  });
};
