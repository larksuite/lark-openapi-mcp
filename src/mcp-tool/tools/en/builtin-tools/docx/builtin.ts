import { McpTool } from '../../../../types';
import * as lark from '@larksuiteoapi/node-sdk';
import { ReadStream } from 'fs';
import { Readable } from 'stream';
import { z } from 'zod';

// Tool name type
export type docxBuiltinToolName = 'docx.builtin.search' | 'docx.builtin.import';

export const larkDocxBuiltinSearchTool: McpTool = {
  project: 'docx',
  name: 'docx.builtin.search',
  accessTokens: ['user'],
  description: '[Feishu/Lark]-Docs-Document-Search Document-Search cloud documents, only supports user_access_token',
  schema: {
    data: z.object({
      search_key: z.string().describe('Search keyword'),
      count: z
        .number()
        .describe('Specify the number of files returned in the search. Value range is [0,50].')
        .optional(),
      offset: z
        .number()
        .describe(
          'Specifies the search offset. The minimum value is 0, which means no offset. The sum of this parameter and the number of returned files must not be greater than or equal to 200 (i.e., offset + count < 200).',
        )
        .optional(),
      owner_ids: z.array(z.string()).describe('Open ID of the file owner').optional(),
      chat_ids: z.array(z.string()).describe('ID of the group where the file is located').optional(),
      docs_types: z
        .array(z.enum(['doc', 'sheet', 'slides', 'bitable', 'mindnote', 'file']))
        .describe(
          'File types, supports the following enumerations: doc: old version document; sheet: spreadsheet; slides: slides; bitable: multi-dimensional table; mindnote: mind map; file: file',
        )
        .optional(),
    }),
    useUAT: z
      .boolean()
      .describe('Whether to use user identity for the request, false means using application identity')
      .optional(),
  },
  customHandler: async (client, params, options): Promise<any> => {
    try {
      const { userAccessToken } = options || {};

      if (!userAccessToken) {
        return {
          isError: true,
          content: [{ type: 'text' as const, text: JSON.stringify({ msg: 'User access token is not configured' }) }],
        };
      }

      const response = await client.request(
        {
          method: 'POST',
          url: '/open-apis/suite/docs-api/search/object',
          data: params.data,
        },
        lark.withUserAccessToken(userAccessToken),
      );

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(response.data ?? response),
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify((error as any).response.data),
          },
        ],
      };
    }
  },
};

export const larkDocxBuiltinImportTool: McpTool = {
  project: 'docx',
  name: 'docx.builtin.import',
  accessTokens: ['user', 'tenant'],
  description: '[Feishu/Lark]-Docs-Document-Import Document-Import cloud document, maximum 20MB',
  schema: {
    data: z
      .object({
        markdown: z.string().describe('Markdown file content'),
        file_name: z.string().describe('File name').max(27).optional(),
      })
      .describe('Request body'),
    useUAT: z.boolean().describe('Use user identity for the request, otherwise use application identity').optional(),
  },
  customHandler: async (client, params, options): Promise<any> => {
    try {
      const { userAccessToken } = options || {};
      const file = Readable.from(params.data.markdown) as ReadStream;

      const data = {
        file_name: 'docx.md',
        parent_type: 'ccm_import_open' as const,
        parent_node: '/',
        size: Buffer.byteLength(params.data.markdown),
        file,
        extra: JSON.stringify({ obj_type: 'docx', file_extension: 'md' }),
      };

      const response =
        userAccessToken && params.useUAT
          ? await client.drive.media.uploadAll({ data }, lark.withUserAccessToken(userAccessToken))
          : await client.drive.media.uploadAll({ data });

      if (!response?.file_token) {
        return {
          isError: true,
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({ msg: 'Document import failed, please check the markdown file content' }),
            },
          ],
        };
      }

      const importData = {
        file_extension: 'md',
        file_name: params.data.file_name,
        file_token: response?.file_token,
        type: 'docx',
        point: {
          mount_type: 1,
          mount_key: '',
        },
      };

      const importResponse =
        userAccessToken && params.useUAT
          ? await client.drive.importTask.create({ data: importData }, lark.withUserAccessToken(userAccessToken))
          : await client.drive.importTask.create({ data: importData });

      const taskId = importResponse.data?.ticket;
      if (!taskId) {
        return {
          isError: true,
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({ msg: 'Document import failed, please check the markdown file content' }),
            },
          ],
        };
      }

      for (let i = 0; i < 5; i++) {
        const taskResponse =
          userAccessToken && params.useUAT
            ? await client.drive.importTask.get({ path: { ticket: taskId } }, lark.withUserAccessToken(userAccessToken))
            : await client.drive.importTask.get({ path: { ticket: taskId } });

        if (taskResponse.data?.result?.job_status === 0) {
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify(taskResponse.data ?? taskResponse),
              },
            ],
          };
        } else if (taskResponse.data?.result?.job_status !== 1 && taskResponse.data?.result?.job_status !== 2) {
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify(taskResponse.data),
              },
            ],
          };
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ msg: 'Document import failed, please try again later' }),
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify((error as any)?.response?.data || error),
          },
        ],
      };
    }
  },
};

export const docxBuiltinTools = [larkDocxBuiltinSearchTool, larkDocxBuiltinImportTool];
