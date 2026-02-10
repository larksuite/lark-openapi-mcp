import express from 'express';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { InitTransportServerFunction } from '../shared';
import { authStore } from '../../auth';
import { LarkAuthHandlerLocal } from '../../auth';
import { logger } from '../../utils/logger';

export const initStdioServer: InitTransportServerFunction = async (
  getNewServer,
  options,
  { needAuthFlow } = { needAuthFlow: false },
) => {
  const { userAccessToken, appId, oauth } = options;

  let authHandler: LarkAuthHandlerLocal | undefined;
  let isShuttingDown = false;

  if (!userAccessToken && needAuthFlow) {
    const app = express();
    app.use(express.json());
    authHandler = new LarkAuthHandlerLocal(app, options);
    if (oauth) {
      authHandler.setupRoutes();
    }
  }

  const transport = new StdioServerTransport();

  const userAccessTokenValue = userAccessToken
    ? userAccessToken
    : appId
      ? { getter: async () => await authStore.getLocalAccessToken(appId) }
      : undefined;

  const mcpServer = getNewServer({ ...options, userAccessToken: userAccessTokenValue }, authHandler);

  // Graceful shutdown: handle process termination signals and stdin close
  const cleanup = async () => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    logger.info('[StdioServerTransport] Received shutdown signal, cleaning up...');

    try {
      if (authHandler && 'stopServer' in authHandler) {
        await (authHandler as any).stopServer?.();
      }
    } catch (error) {
      logger.error(`[StdioServerTransport] Error stopping auth server: ${error}`);
    }

    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  // Also handle stdin close (important for IDE integration like Cursor)
  process.stdin.on('close', cleanup);
  process.stdin.on('end', cleanup);

  logger.info(
    `[StdioServerTransport] Connecting to MCP Server, userAccessToken: ${Boolean(userAccessToken)}, appId: ${appId}`,
  );
  mcpServer.connect(transport).catch((error) => {
    logger.error(`[StdioServerTransport] MCP Connect Error: ${error}`);
    process.exit(1);
  });
};
