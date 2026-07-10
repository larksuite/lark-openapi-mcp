import { z } from 'zod';
export type wikiV1ToolName = 'wiki.v1.node.search';
export const wikiV1NodeSearch = {
  project: 'wiki',
  name: 'wiki.v1.node.search',
  sdkName: 'wiki.v1.node.search',
  path: '/open-apis/wiki/v2/nodes/search',
  httpMethod: 'POST',
  description: '[Feishu/Lark]-云文档-知识库-搜索 Wiki',
  accessTokens: ['user'],
  schema: {
    data: z.object({
      query: z.string().describe('搜索关键词'),
      space_id: z.string().describe('文档所属的知识空间ID，为空搜索所有 wiki').optional(),
      node_id: z
        .string()
        .describe('wiki token，不为空搜索该节点及其所有子节点，为空搜索所有 wiki（根据 space_id 选择 space）')
        .optional(),
    }),
    params: z
      .object({
        page_token: z
          .string()
          .describe(
            '分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果',
          )
          .optional(),
        page_size: z.number().describe('分页大小').optional(),
      })
      .optional(),
    useUAT: z.boolean().describe('使用用户身份请求, 否则使用应用身份').optional(),
  },
};
export const wikiV1Tools = [wikiV1NodeSearch];
