import { McpTool } from '../../../../types';
import * as lark from '@larksuiteoapi/node-sdk';
import { z } from 'zod';
import { isPermissionError, handlePermissionError } from '../../../../utils/permission-error';
import { parseBitableUrl } from '../../../../utils/url-parser';

// Tool name type
export type bitableBuiltinToolName = 'bitable.builtin.smartQuery';

export const larkBitableBuiltinSmartQueryTool: McpTool = {
  project: 'bitable',
  name: 'bitable.builtin.smartQuery',
  accessTokens: ['user', 'tenant'],
  description:
    '[Feishu/Lark]-Bitable-Smart Query-Smart query Feishu/Lark Bitable data. Input a Bitable URL and automatically parse and query records. Supports Wiki URL auto-resolution.',
  schema: {
    data: z.object({
      url: z.string().describe('Feishu/Lark Bitable URL'),
      table_id: z
        .string()
        .describe('Table ID (if not provided, it will be parsed from URL or list all tables)')
        .optional(),
      filter: z.string().describe('Filter condition JSON string').optional(),
      page_size: z.number().describe('Number of records per page (default 100)').optional(),
    }),
    useUAT: z.boolean().describe('Use user identity for the request, otherwise use application identity').optional(),
  },
  customHandler: async (client, params, options): Promise<any> => {
    try {
      const { userAccessToken } = options || {};
      const reqOptions = userAccessToken && params.useUAT ? lark.withUserAccessToken(userAccessToken) : undefined;

      const parsed = parseBitableUrl(params.data.url);
      let appToken = parsed.appToken;
      let tableId = params.data.table_id ?? parsed.tableId;

      // If wiki URL, resolve to get obj_token
      if (parsed.isWiki) {
        const nodeRes = reqOptions
          ? await client.wiki.space.getNode({ params: { token: parsed.appToken } }, reqOptions)
          : await client.wiki.space.getNode({ params: { token: parsed.appToken } });

        const node = nodeRes?.data?.node;
        const objToken = node?.obj_token;
        const objType = node?.obj_type;

        if (!objToken) {
          return {
            isError: true,
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify({ msg: 'Cannot resolve Wiki node. Please verify the URL is correct and you have access.' }),
              },
            ],
          };
        }

        if (objType !== undefined && String(objType) !== 'bitable' && Number(objType) !== 22) {
          return {
            isError: true,
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify({
                  msg: `This Wiki node is not a Bitable (type: ${objType}). Please verify the URL points to a Bitable.`,
                }),
              },
            ],
          };
        }

        appToken = objToken;
      }

      // If no table_id, list all tables
      if (!tableId) {
        const tablesRes = reqOptions
          ? await client.bitable.appTable.list({ path: { app_token: appToken } }, reqOptions)
          : await client.bitable.appTable.list({ path: { app_token: appToken } });

        const tables = tablesRes?.data?.items ?? [];
        if (tables.length === 0) {
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify({ app_token: appToken, tables: [], message: 'No data tables found in this Bitable' }),
              },
            ],
          };
        }

        if (tables.length === 1) {
          tableId = tables[0].table_id;
        } else {
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify({
                  app_token: appToken,
                  tables: tables.map((t) => ({ table_id: t.table_id, name: t.name, revision: t.revision })),
                  message: `This Bitable has ${tables.length} data tables. Please specify a table_id to query.`,
                }),
              },
            ],
          };
        }
      }

      // Auto-paginate to get all records
      const pageSize = params.data.page_size ?? 100;
      const allRecords: Array<{ record_id?: string; fields?: Record<string, unknown> }> = [];
      let pageToken: string | undefined;
      let total = 0;

      do {
        const listParams: Record<string, unknown> = {
          page_size: pageSize,
          page_token: pageToken,
        };
        if (params.data.filter) {
          listParams.filter = params.data.filter;
        }

        const recordsRes = reqOptions
          ? await client.bitable.appTableRecord.list(
              { path: { app_token: appToken, table_id: tableId! }, params: listParams as any },
              reqOptions,
            )
          : await client.bitable.appTableRecord.list({
              path: { app_token: appToken, table_id: tableId! },
              params: listParams as any,
            });

        const items = recordsRes?.data?.items ?? [];
        allRecords.push(...(items as typeof allRecords));
        total = recordsRes?.data?.total ?? allRecords.length;
        pageToken = recordsRes?.data?.page_token ?? undefined;
      } while (pageToken);

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              success: true,
              app_token: appToken,
              table_id: tableId,
              total,
              count: allRecords.length,
              records: allRecords.map((r) => ({ record_id: r.record_id, fields: r.fields })),
            }),
          },
        ],
      };
    } catch (error) {
      if (isPermissionError(error)) {
        return {
          isError: true,
          content: [{ type: 'text' as const, text: handlePermissionError(error) }],
        };
      }
      return {
        isError: true,
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify((error as any)?.response?.data || { msg: (error as Error)?.message || String(error) }),
          },
        ],
      };
    }
  },
};

export const bitableBuiltinTools = [larkBitableBuiltinSmartQueryTool];
