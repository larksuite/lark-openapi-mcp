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
  description: '[Feishu/Lark]-云文档-画板-下载画板为图片-下载画板为图片',
  accessTokens: ['tenant', 'user'],
  supportFileDownload: true,
  schema: {
    path: z.object({ whiteboard_id: z.string().describe('画板唯一标识') }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
  customHandler: async (client: lark.Client, params: any, options: { userAccessToken?: string } = {}): Promise<any> => {
    try {
      if (params?.useUAT && !options.userAccessToken) {
        return {
          isError: true,
          content: [{ type: 'text' as const, text: JSON.stringify({ msg: '当前未配置 userAccessToken' }) }],
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
  description: '[Feishu/Lark]-云文档-画板-获取画板主题-获取画板主题',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({ whiteboard_id: z.string().describe('画板唯一标识') }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const boardV1WhiteboardUpdateTheme = {
  project: 'board',
  name: 'board.v1.whiteboard.updateTheme',
  sdkName: 'board.v1.whiteboard.updateTheme',
  path: '/open-apis/board/v1/whiteboards/:whiteboard_id/update_theme',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-云文档-画板-更新画板主题-更新画板主题',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({ whiteboard_id: z.string().describe('画板唯一标识') }),
    data: z.object({
      theme: z
        .enum(['classic', 'minimalist_gray', 'retro', 'vibrant_color', 'minimalist_blue', 'default'])
        .describe(
          '主题名称。可选值：classic、minimalist_gray、retro、vibrant_color、minimalist_blue、default',
        )
        .optional(),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const boardV1WhiteboardNodeCreatePlantuml = {
  project: 'board',
  name: 'board.v1.whiteboardNode.createPlantuml',
  sdkName: 'board.v1.whiteboardNode.createPlantuml',
  path: '/open-apis/board/v1/whiteboards/:whiteboard_id/nodes/plantuml',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-云文档-画板-节点-解析画板语法-用户可以将PlantUml/Mermaid图表导入画板进行协同编辑',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({ whiteboard_id: z.string().describe('画板唯一标识') }),
    data: z.object({
      plant_uml_code: z.string().describe('PlantUML 或 Mermaid 语法文本'),
      style_type: z
        .number()
        .describe(
          '画板样式。1 为画板样式（生成多个节点），2 为经典样式（生成可二次编辑图片，只有 PlantUML 支持）',
        )
        .optional(),
      syntax_type: z.number().describe('语法类型。1 为 PlantUML，2 为 Mermaid').optional(),
      diagram_type: z
        .number()
        .describe('PlantUML 图表类型。传 0 自动识别；当 syntax_type 为 Mermaid 时传 0')
        .optional(),
    }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const boardV1WhiteboardNodeCreate = {
  project: 'board',
  name: 'board.v1.whiteboardNode.create',
  sdkName: 'board.v1.whiteboardNode.create',
  path: '/open-apis/board/v1/whiteboards/:whiteboard_id/nodes',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-云文档-画板-节点-创建节点-创建画板节点',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({ whiteboard_id: z.string().describe('画板唯一标识') }),
    data: z.object({}).passthrough().describe('创建节点请求体。透传官方创建节点 JSON 结构'),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const boardV1WhiteboardNodeList = {
  project: 'board',
  name: 'board.v1.whiteboardNode.list',
  sdkName: 'board.v1.whiteboardNode.list',
  path: '/open-apis/board/v1/whiteboards/:whiteboard_id/nodes',
  httpMethod: 'GET',
  description: '[Feishu/Lark]-云文档-画板-节点-获取所有节点-获取画板内所有的节点',
  accessTokens: ['tenant', 'user'],
  schema: {
    path: z.object({ whiteboard_id: z.string().describe('画板唯一标识') }),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
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
