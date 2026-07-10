import { McpTool } from '../../../../types';
import * as lark from '@larksuiteoapi/node-sdk';
import { z } from 'zod';

// Tool name type
export type sheetsBuiltinToolName = 'sheets.builtin.readRange' | 'sheets.builtin.readMultipleRanges';

const valueRenderOptionSchema = z
  .enum(['ToString', 'Formula', 'FormattedValue', 'UnformattedValue'])
  .describe(
    '单元格数据格式。ToString：返回纯文本值；Formula：返回公式；FormattedValue：返回格式化后的值；UnformattedValue：返回原始值（默认）',
  )
  .optional();

const dateTimeRenderOptionSchema = z
  .enum(['FormattedString'])
  .describe('日期时间单元格数据格式。FormattedString：返回格式化后的字符串。不传时日期以序列号形式返回')
  .optional();

export const larkSheetsBuiltinReadRangeTool: McpTool = {
  project: 'sheets',
  name: 'sheets.builtin.readRange',
  accessTokens: ['user', 'tenant'],
  description:
    '[飞书/Lark]-云文档-电子表格-读取单个范围-读取电子表格中指定范围的单元格数据。可先调用 sheets.v3.spreadsheetSheet.query 获取工作表 ID',
  schema: {
    data: z.object({
      spreadsheet_token: z.string().describe('电子表格的唯一标识 token'),
      range: z
        .string()
        .describe(
          "查询范围，格式为 'sheetId!A1:D5'。仅传 'sheetId' 时读取整个工作表。sheetId 可通过 sheets.v3.spreadsheetSheet.query 获取",
        ),
      valueRenderOption: valueRenderOptionSchema,
      dateTimeRenderOption: dateTimeRenderOptionSchema,
    }),
    useUAT: z.boolean().describe('是否使用用户身份请求，否则使用应用身份').optional(),
  },
  customHandler: async (client, params, options): Promise<any> => {
    try {
      const { userAccessToken } = options || {};
      const { spreadsheet_token, range, valueRenderOption, dateTimeRenderOption } = params.data;
      const request = {
        method: 'GET',
        url: `/open-apis/sheets/v2/spreadsheets/${spreadsheet_token}/values/${encodeURIComponent(range)}`,
        params: { valueRenderOption, dateTimeRenderOption },
      };
      const response =
        userAccessToken && params.useUAT
          ? await client.request(request, lark.withUserAccessToken(userAccessToken))
          : await client.request(request);
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
            text: JSON.stringify((error as any)?.response?.data || (error as Error)?.message || error),
          },
        ],
      };
    }
  },
};

export const larkSheetsBuiltinReadMultipleRangesTool: McpTool = {
  project: 'sheets',
  name: 'sheets.builtin.readMultipleRanges',
  accessTokens: ['user', 'tenant'],
  description: '[飞书/Lark]-云文档-电子表格-读取多个范围-一次调用读取电子表格中多个范围的单元格数据',
  schema: {
    data: z.object({
      spreadsheet_token: z.string().describe('电子表格的唯一标识 token'),
      ranges: z
        .array(z.string())
        .min(1)
        .describe(
          "查询范围列表，格式为 ['sheetId!A1:D5', 'sheetId!F1:H5']。sheetId 可通过 sheets.v3.spreadsheetSheet.query 获取",
        ),
      valueRenderOption: valueRenderOptionSchema,
      dateTimeRenderOption: dateTimeRenderOptionSchema,
    }),
    useUAT: z.boolean().describe('是否使用用户身份请求，否则使用应用身份').optional(),
  },
  customHandler: async (client, params, options): Promise<any> => {
    try {
      const { userAccessToken } = options || {};
      const { spreadsheet_token, ranges, valueRenderOption, dateTimeRenderOption } = params.data;
      const request = {
        method: 'GET',
        url: `/open-apis/sheets/v2/spreadsheets/${spreadsheet_token}/values_batch_get`,
        params: { ranges: ranges.join(','), valueRenderOption, dateTimeRenderOption },
      };
      const response =
        userAccessToken && params.useUAT
          ? await client.request(request, lark.withUserAccessToken(userAccessToken))
          : await client.request(request);
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
            text: JSON.stringify((error as any)?.response?.data || (error as Error)?.message || error),
          },
        ],
      };
    }
  },
};

export const sheetsBuiltinTools = [larkSheetsBuiltinReadRangeTool, larkSheetsBuiltinReadMultipleRangesTool];
