import { McpTool } from '../../../../types';
import * as lark from '@larksuiteoapi/node-sdk';
import { z } from 'zod';
import { isPermissionError, handlePermissionError } from '../../../../utils/permission-error';
import { parseBitableUrl } from '../../../../utils/url-parser';

// 工具名称类型
export type bitableBuiltinToolName = 'bitable.builtin.smartQuery';

export const larkBitableBuiltinSmartQueryTool: McpTool = {
  project: 'bitable',
  name: 'bitable.builtin.smartQuery',
  accessTokens: ['user', 'tenant'],
  description:
    '[飞书/Lark] - 多维表格-智能查询 - 智能查询飞书多维表格数据。输入多维表格 URL，自动解析并查询记录。支持 Wiki URL 自动解析。',
  schema: {
    data: z.object({
      url: z.string().describe('飞书多维表格 URL'),
      table_id: z.string().describe('表格 ID（不传则从 URL 解析或列出所有表格）').optional(),
      filter: z.string().describe('过滤条件 JSON 字符串').optional(),
      page_size: z.number().describe('每页记录数（默认 100）').optional(),
    }),
    useUAT: z.boolean().describe('使用用户身份请求，否则为应用身份').optional(),
  },
  customHandler: async (client, params, options): Promise<any> => {
    try {
      const { userAccessToken } = options || {};
      const reqOptions = userAccessToken && params.useUAT ? lark.withUserAccessToken(userAccessToken) : undefined;

      const parsed = parseBitableUrl(params.data.url);
      let appToken = parsed.appToken;
      let tableId = params.data.table_id ?? parsed.tableId;

      // 如果是 wiki URL，需要先获取 obj_token
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
                text: JSON.stringify({ msg: '无法解析 Wiki 节点。请确认 URL 正确且有访问权限。' }),
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
                  msg: `该 Wiki 节点不是多维表格（类型: ${objType}）。请确认 URL 指向的是多维表格。`,
                }),
              },
            ],
          };
        }

        appToken = objToken;
      }

      // 如果没有 table_id，列出所有 table
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
                text: JSON.stringify({ app_token: appToken, tables: [], message: '该多维表格中没有数据表' }),
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
                  message: `该多维表格有 ${tables.length} 个数据表，请指定 table_id 查询`,
                }),
              },
            ],
          };
        }
      }

      // 自动分页获取所有记录
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
