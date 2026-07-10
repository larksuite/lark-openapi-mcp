import { McpTool } from '../../../../types';
import * as lark from '@larksuiteoapi/node-sdk';
import { z } from 'zod';

// Tool name type
export type sheetsBuiltinToolName = 'sheets.builtin.readRange' | 'sheets.builtin.readMultipleRanges';

const valueRenderOptionSchema = z
  .enum(['ToString', 'Formula', 'FormattedValue', 'UnformattedValue'])
  .describe(
    'How cell values are rendered. ToString: returns values as strings; Formula: returns formulas; FormattedValue: returns values as displayed; UnformattedValue: returns raw values (default)',
  )
  .optional();

const dateTimeRenderOptionSchema = z
  .enum(['FormattedString'])
  .describe(
    'How date/time values are rendered. FormattedString: returns dates as formatted strings. When omitted, dates are returned as serial numbers',
  )
  .optional();

export const larkSheetsBuiltinReadRangeTool: McpTool = {
  project: 'sheets',
  name: 'sheets.builtin.readRange',
  accessTokens: ['user', 'tenant'],
  description:
    '[Feishu/Lark]-Docs-Sheets-Read Range-Read cell values from a spreadsheet range. Use sheets.v3.spreadsheetSheet.query to get sheet IDs first',
  schema: {
    data: z.object({
      spreadsheet_token: z.string().describe('Spreadsheet token, the unique identifier of the spreadsheet'),
      range: z
        .string()
        .describe(
          "Cell range in the format 'sheetId!A1:D5'. Passing only 'sheetId' reads the whole sheet. sheetId comes from sheets.v3.spreadsheetSheet.query",
        ),
      valueRenderOption: valueRenderOptionSchema,
      dateTimeRenderOption: dateTimeRenderOptionSchema,
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
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
  description:
    '[Feishu/Lark]-Docs-Sheets-Read Multiple Ranges-Read cell values from multiple ranges of a spreadsheet in one call',
  schema: {
    data: z.object({
      spreadsheet_token: z.string().describe('Spreadsheet token, the unique identifier of the spreadsheet'),
      ranges: z
        .array(z.string())
        .min(1)
        .describe(
          "Cell ranges in the format ['sheetId!A1:D5', 'sheetId!F1:H5']. sheetId comes from sheets.v3.spreadsheetSheet.query",
        ),
      valueRenderOption: valueRenderOptionSchema,
      dateTimeRenderOption: dateTimeRenderOptionSchema,
    }),
    useUAT: z.boolean().describe('Use user access token, otherwise use tenant access token').optional(),
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
