import * as lark from '@larksuiteoapi/node-sdk';
import { z } from 'zod';

const readableToBase64 = async (stream: NodeJS.ReadableStream) => {
  const chunks: Buffer[] = [];

  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString('base64');
};

export type boardV1ToolName =
  | 'board.v1.whiteboard.downloadAsImage'
  | 'board.v1.whiteboard.theme'
  | 'board.v1.whiteboard.updateTheme'
  | 'board.v1.whiteboardNode.createPlantuml'
  | 'board.v1.whiteboardNode.create'
  | 'board.v1.whiteboardNode.list';
export const boardV1WhiteboardDownloadAsImage = {
  project: 'board',
  name: 'board.v1.whiteboard.downloadAsImage',
  sdkName: 'board.v1.whiteboard.downloadAsImage',
  path: '/open-apis/board/v1/whiteboards/:whiteboard_id/download_as_image',
  httpMethod: 'GET',
  description: '[Feishu/Lark]-Docs-Board-Download board as image-Download board as image',
  accessTokens: ['tenant', 'user'],
  supportFileDownload: true,
  schema: {
    path: z.object({ whiteboard_id: z.string().describe('The unique identification of the board') }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
  customHandler: async (client: lark.Client, params: any, options: { userAccessToken?: string } = {}): Promise<any> => {
    try {
      if (params?.useUAT && !options.userAccessToken) {
        return {
          isError: true,
          content: [{ type: 'text' as const, text: JSON.stringify({ msg: 'User access token is not configured' }) }],
        };
      }

      const response =
        params?.useUAT && options.userAccessToken
          ? await client.board.v1.whiteboard.downloadAsImage(
              { path: params.path },
              lark.withUserAccessToken(options.userAccessToken),
            )
          : await client.board.v1.whiteboard.downloadAsImage({ path: params.path });

      const image = await readableToBase64(response.getReadableStream());

      return {
        content: [{ type: 'image' as const, data: image, mimeType: 'image/png' }],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify((error as any)?.response?.data || (error as Error)?.message || error),
          },
        ],
      };
    }
  },
};
export const boardV1WhiteboardTheme = {
  project: 'board',
  name: 'board.v1.whiteboard.theme',
  sdkName: 'board.v1.whiteboard.theme',
  path: '/open-apis/board/v1/whiteboards/:whiteboard_id/theme',
  httpMethod: 'GET',
  description: '[Feishu/Lark]-Docs-Board-Get board theme-Get board theme',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({ whiteboard_id: z.string().describe('The unique identification of the board') }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const boardV1WhiteboardUpdateTheme = {
  project: 'board',
  name: 'board.v1.whiteboard.updateTheme',
  sdkName: 'board.v1.whiteboard.updateTheme',
  path: '/open-apis/board/v1/whiteboards/:whiteboard_id/update_theme',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-Docs-Board-Update Theme-Update Theme',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({ whiteboard_id: z.string().describe('The unique identification of the board') }),
    data: z.object({
      theme: z
        .enum(['classic', 'minimalist_gray', 'retro', 'vibrant_color', 'minimalist_blue', 'default'])
        .describe(
          'Theme name. Options: classic, minimalist_gray, retro, vibrant_color, minimalist_blue, default',
        )
        .optional(),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const boardV1WhiteboardNodeCreatePlantuml = {
  project: 'board',
  name: 'board.v1.whiteboardNode.createPlantuml',
  sdkName: 'board.v1.whiteboardNode.createPlantuml',
  path: '/open-apis/board/v1/whiteboards/:whiteboard_id/nodes/plantuml',
  httpMethod: 'POST',
  description:
    '[Feishu/Lark]-Docs-Board-nodes-whiteboard syntactic parse-Import PlantUML or Mermaid diagrams into the board',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({ whiteboard_id: z.string().describe('The unique identification of the board') }),
    data: z.object({
      plant_uml_code: z.string().describe('PlantUML or Mermaid source code'),
      style_type: z
        .number()
        .describe(
          'Board style. 1 means board style (multiple nodes), 2 means classic style (editable image, PlantUML only)',
        )
        .optional(),
      syntax_type: z.number().describe('Syntax type. 1 for PlantUML, 2 for Mermaid').optional(),
      diagram_type: z
        .number()
        .describe('PlantUML diagram type. Pass 0 for auto-detection; use 0 when syntax_type is Mermaid')
        .optional(),
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const boardV1WhiteboardNodeCreate = {
  project: 'board',
  name: 'board.v1.whiteboardNode.create',
  sdkName: 'board.v1.whiteboardNode.create',
  path: '/open-apis/board/v1/whiteboards/:whiteboard_id/nodes',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-Docs-Board-nodes-Create node-Create board nodes',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({ whiteboard_id: z.string().describe('The unique identification of the board') }),
    data: z.object({}).passthrough().describe('Create-node request body. Pass through the official board node JSON'),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const boardV1WhiteboardNodeList = {
  project: 'board',
  name: 'board.v1.whiteboardNode.list',
  sdkName: 'board.v1.whiteboardNode.list',
  path: '/open-apis/board/v1/whiteboards/:whiteboard_id/nodes',
  httpMethod: 'GET',
  description: '[Feishu/Lark]-Docs-Board-nodes-list nodes-Obtain all nodes of a board',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({ whiteboard_id: z.string().describe('The unique identification of the board') }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
  },
};
export const boardV1Tools = [
  boardV1WhiteboardDownloadAsImage,
  boardV1WhiteboardTheme,
  boardV1WhiteboardUpdateTheme,
  boardV1WhiteboardNodeCreatePlantuml,
  boardV1WhiteboardNodeCreate,
  boardV1WhiteboardNodeList,
];
