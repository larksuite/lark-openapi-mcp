import express, { NextFunction, Request, Response } from 'express';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { InitTransportServerFunction } from '../shared';
import { LarkAuthHandler } from '../../auth';
import { parseMCPServerOptionsFromRequest } from './utils';
import { logger } from '../../utils/logger';

export const initSSEServer: InitTransportServerFunction = (getNewServer, options) => {
  const { port, host } = options;

  if (!port || !host) {
    throw new Error('[Lark MCP] Port and host are required');
  }

  const app = express();
  const transports: Map<string, SSEServerTransport> = new Map();

  let authHandler: LarkAuthHandler | undefined;
  if (options.oauth) {
    authHandler = new LarkAuthHandler(app, options);
  }

  const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (authHandler) {
      authHandler.authenticateRequest(req, res, next);
    } else {
      const authToken = req.headers.authorization?.split(' ')[1];
      if (authToken) {
        req.auth = { token: authToken, clientId: 'LOCAL', scopes: [] };
      }
      next();
    }
  };

  app.get('/sse', authMiddleware, async (req: Request, res: Response) => {
    logger.info(`[SSEServerTransport] Received GET SSE request`);

    const token = req.auth?.token;
    const { data } = parseMCPServerOptionsFromRequest(req);
    const mcpServer = getNewServer({ ...data, userAccessToken: data.userAccessToken || token }, authHandler);
    const transport = new SSEServerTransport('/messages', res);
    transports.set(transport.sessionId, transport);

    res.on('close', () => {
      transport.close();
      mcpServer.close();
      transports.delete(transport.sessionId);
    });

    await mcpServer.connect(transport);
  });

  app.post('/messages', authMiddleware, async (req: Request, res: Response) => {
    console.log('Received POST messages request');
    logger.info(`[SSEServerTransport] Received POST messages request`);

    const sessionId = req.query.sessionId as string;
    const transport = transports.get(sessionId);
    if (!transport) {
      res.status(400).send('No transport found for sessionId');
      return;
    }
    await transport.handlePostMessage(req, res);
  });

  app.listen(port, host, (error) => {
    if (error) {
      logger.error(`[SSEServerTransport] Server error: ${error}`);
      process.exit(1);
    }
    console.log(`📡 SSE endpoint: http://${host}:${port}/sse`);
    logger.info(`[SSEServerTransport] SSE endpoint: http://${host}:${port}/sse`);
  });
};
