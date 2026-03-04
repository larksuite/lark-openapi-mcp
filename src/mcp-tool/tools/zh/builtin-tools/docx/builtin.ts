import { McpTool } from '../../../../types';
import * as lark from '@larksuiteoapi/node-sdk';
import { ReadStream } from 'fs';
import { Readable } from 'stream';
import { z } from 'zod';
import { blocksToMarkdown, Block } from '../../../../utils/block-converter';
import { isPermissionError, handlePermissionError } from '../../../../utils/permission-error';
import { downloadImage, uploadImageToDoc, extractFileName } from '../../../../utils/image-processor';

// 工具名称类型
export type docxBuiltinToolName = 'docx.builtin.search' | 'docx.builtin.import' | 'docx.builtin.markdownWrite' | 'docx.builtin.markdownRead';

export const larkDocxBuiltinSearchTool: McpTool = {
  project: 'docx',
  name: 'docx.builtin.search',
  accessTokens: ['user'],
  description: '[飞书/Lark] - 云文档-文档 - 搜索文档 - 搜索云文档，只支持user_access_token',
  schema: {
    data: z.object({
      search_key: z.string().describe('搜索关键词'),
      count: z.number().describe('指定搜索返回的文件数量。取值范围为 [0,50]。').optional(),
      offset: z
        .number()
        .describe(
          '指定搜索的偏移量，该参数最小为 0，即不偏移。该参数的值与返回的文件数量之和不得大于或等于 200（即 offset + count < 200）。',
        )
        .optional(),
      owner_ids: z.array(z.string()).describe('文件所有者的 Open ID').optional(),
      chat_ids: z.array(z.string()).describe('文件所在群的 ID').optional(),
      docs_types: z
        .array(z.enum(['doc', 'sheet', 'slides', 'bitable', 'mindnote', 'file']))
        .describe(
          '文件类型，支持以下枚举：doc：旧版文档;sheet：电子表格;slides：幻灯片;bitable：多维表格;mindnote：思维笔记;file：文件',
        )
        .optional(),
    }),
    useUAT: z.boolean().describe('是否使用用户身份请求，false则使用应用身份请求').optional(),
  },
  customHandler: async (client, params, options): Promise<any> => {
    try {
      const { userAccessToken } = options || {};

      if (!userAccessToken) {
        return {
          isError: true,
          content: [{ type: 'text' as const, text: JSON.stringify({ msg: '当前未配置 userAccessToken' }) }],
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
  description: '[飞书/Lark] - 云文档-文档 - 导入文档 - 导入云文档，最大20MB',
  schema: {
    data: z
      .object({
        markdown: z.string().describe('markdown文件内容'),
        file_name: z.string().describe('文件名').max(27).optional(),
      })
      .describe('请求体'),
    useUAT: z.boolean().describe('使用用户身份请求，否则为应用身份').optional(),
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
          content: [{ type: 'text' as const, text: JSON.stringify({ msg: '导入文档失败，请检查markdown文件内容' }) }],
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
          content: [{ type: 'text' as const, text: JSON.stringify({ msg: '导入文档失败，请检查markdown文件内容' }) }],
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
            content: [{ type: 'text' as const, text: JSON.stringify(taskResponse.data) }],
          };
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ msg: '导入文档失败，请稍后再试' }),
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

export const larkDocxBuiltinMarkdownWriteTool: McpTool = {
  project: 'docx',
  name: 'docx.builtin.markdownWrite',
  accessTokens: ['user', 'tenant'],
  description:
    '[飞书/Lark] - 云文档-文档 - Markdown 写入 - 写入/编辑飞书文档。可以创建新文档或向已有文档写入 Markdown 内容，自动上传外链图片。',
  schema: {
    data: z.object({
      document_id: z.string().describe('文档 ID。不传则创建新文档').optional(),
      markdown: z.string().describe('要写入的 Markdown 内容'),
      title: z.string().describe('新建文档标题（仅创建新文档时有效）').optional(),
      folder_token: z.string().describe('新建文档放置的文件夹 token（仅创建新文档时有效）').optional(),
    }),
    useUAT: z.boolean().describe('使用用户身份请求，否则为应用身份').optional(),
  },
  customHandler: async (client, params, options): Promise<any> => {
    try {
      const { userAccessToken } = options || {};
      let documentId = params.data.document_id;

      // 1. 如果没有 document_id，创建新文档
      if (!documentId) {
        const createReqOptions = userAccessToken && params.useUAT ? lark.withUserAccessToken(userAccessToken) : undefined;
        const createRes = createReqOptions
          ? await client.docx.document.create({ data: { title: params.data.title, folder_token: params.data.folder_token } }, createReqOptions)
          : await client.docx.document.create({ data: { title: params.data.title, folder_token: params.data.folder_token } });

        documentId = createRes?.data?.document?.document_id;
        if (!documentId) {
          return {
            isError: true,
            content: [{ type: 'text' as const, text: JSON.stringify({ msg: '创建文档失败：未获取到 document_id' }) }],
          };
        }
      }

      // 2. Markdown 转 Blocks
      const convertReqOptions = userAccessToken && params.useUAT ? lark.withUserAccessToken(userAccessToken) : undefined;
      const convertRes = convertReqOptions
        ? await client.request(
            { method: 'POST', url: '/open-apis/docx/v1/documents/convert', data: { content_type: 'markdown', content: params.data.markdown } },
            convertReqOptions,
          )
        : await client.request(
            { method: 'POST', url: '/open-apis/docx/v1/documents/convert', data: { content_type: 'markdown', content: params.data.markdown } },
          );

      const convertData = (convertRes as any)?.data ?? convertRes;
      const convertedBlocks = convertData?.blocks ?? [];
      const firstLevelBlockIds = convertData?.first_level_block_ids ?? [];

      if (convertedBlocks.length === 0) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({ success: true, document_id: documentId, message: '文档已创建，但 Markdown 转换后无内容块' }),
            },
          ],
        };
      }

      // 构建 block map
      const blockMap = new Map<string, (typeof convertedBlocks)[number]>();
      for (const block of convertedBlocks) {
        if (block.block_id) {
          blockMap.set(block.block_id, block);
        }
      }

      // 3. 如果编辑已有文档，先清除原有内容
      if (params.data.document_id) {
        await clearDocumentContent(client, documentId, userAccessToken && params.useUAT ? userAccessToken : undefined);
      }

      // 获取实际的 page block_id
      const pageBlockId = await getPageBlockId(client, documentId, userAccessToken && params.useUAT ? userAccessToken : undefined);

      // 4. 插入顶层 blocks
      const topLevelBlocks = firstLevelBlockIds
        .map((id: string) => blockMap.get(id))
        .filter(Boolean) as typeof convertedBlocks;

      if (topLevelBlocks.length > 0) {
        const allDescendants = collectDescendants(topLevelBlocks, blockMap);
        const childrenIds = firstLevelBlockIds.filter((id: string) => blockMap.has(id));
        const reqOptions = userAccessToken && params.useUAT ? lark.withUserAccessToken(userAccessToken) : undefined;

        if (allDescendants.length > 0) {
          const createReq = {
            data: { children_id: childrenIds, descendants: allDescendants as any },
            params: { document_revision_id: -1 },
            path: { document_id: documentId, block_id: pageBlockId },
          };
          reqOptions
            ? await client.docx.documentBlockDescendant.create(createReq, reqOptions)
            : await client.docx.documentBlockDescendant.create(createReq);
        } else {
          const createReq = {
            data: { children: topLevelBlocks as any },
            params: { document_revision_id: -1 },
            path: { document_id: documentId, block_id: pageBlockId },
          };
          reqOptions
            ? await client.docx.documentBlockChildren.create(createReq, reqOptions)
            : await client.docx.documentBlockChildren.create(createReq);
        }
      }

      // 5. 处理外链图片
      const imageFailures: Array<{ url: string; error: string }> = [];
      await processExternalImages(client, documentId, convertedBlocks, imageFailures, userAccessToken && params.useUAT ? userAccessToken : undefined);

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              success: true,
              document_id: documentId,
              url: `https://feishu.cn/docx/${documentId}`,
              blocks_inserted: topLevelBlocks.length,
              ...(imageFailures.length > 0 ? { image_failures: imageFailures } : {}),
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

export const larkDocxBuiltinMarkdownReadTool: McpTool = {
  project: 'docx',
  name: 'docx.builtin.markdownRead',
  accessTokens: ['user', 'tenant'],
  description:
    '[飞书/Lark] - 云文档-文档 - Markdown 读取 - 读取飞书文档内容，转换为 Markdown 格式返回。',
  schema: {
    data: z.object({
      document_id: z.string().describe('飞书文档 ID'),
    }),
    useUAT: z.boolean().describe('使用用户身份请求，否则为应用身份').optional(),
  },
  customHandler: async (client, params, options): Promise<any> => {
    try {
      const { userAccessToken } = options || {};

      // 分页获取所有 blocks
      const allBlocks: Block[] = [];
      let pageToken: string | undefined;

      do {
        const reqOptions = userAccessToken && params.useUAT ? lark.withUserAccessToken(userAccessToken) : undefined;
        const res = reqOptions
          ? await client.docx.documentBlock.list(
              { path: { document_id: params.data.document_id }, params: { page_size: 500, page_token: pageToken } },
              reqOptions,
            )
          : await client.docx.documentBlock.list({
              path: { document_id: params.data.document_id },
              params: { page_size: 500, page_token: pageToken },
            });

        const items = res?.data?.items;
        if (items) {
          allBlocks.push(...(items as Block[]));
        }

        pageToken = res?.data?.page_token ?? undefined;
      } while (pageToken);

      if (allBlocks.length === 0) {
        return {
          content: [{ type: 'text' as const, text: '文档为空，没有内容块。' }],
        };
      }

      // 构建 blockMap
      const blockMap = new Map<string, Block>();
      for (const block of allBlocks) {
        if (block.block_id) {
          blockMap.set(block.block_id, block);
        }
      }

      // 转换为 Markdown
      const markdown = blocksToMarkdown(allBlocks, blockMap);

      return {
        content: [{ type: 'text' as const, text: markdown || '（文档内容为空）' }],
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

// --- markdownWrite 辅助函数 ---

async function getPageBlockId(client: lark.Client, documentId: string, userAccessToken?: string): Promise<string> {
  const reqOptions = userAccessToken ? lark.withUserAccessToken(userAccessToken) : undefined;
  const listRes = reqOptions
    ? await client.docx.documentBlock.list({ path: { document_id: documentId }, params: { page_size: 50 } }, reqOptions)
    : await client.docx.documentBlock.list({ path: { document_id: documentId }, params: { page_size: 50 } });

  const items = listRes?.data?.items ?? [];
  const pageBlock = items.find((item) => item.block_type === 1);

  if (pageBlock?.block_id) {
    return pageBlock.block_id;
  }

  return documentId;
}

function collectDescendants(
  topLevelBlocks: Array<{ block_id?: string; children?: string[]; [key: string]: unknown }>,
  blockMap: Map<string, { block_id?: string; children?: string[]; [key: string]: unknown }>,
): Array<{ block_id?: string; children?: string[]; [key: string]: unknown }> {
  const result: Array<{ block_id?: string; children?: string[]; [key: string]: unknown }> = [];
  const visited = new Set<string>();

  function collect(blockId: string) {
    if (visited.has(blockId)) return;
    visited.add(blockId);

    const block = blockMap.get(blockId);
    if (!block) return;

    result.push(block);

    if (block.children) {
      for (const childId of block.children) {
        collect(childId);
      }
    }
  }

  for (const block of topLevelBlocks) {
    if (block.block_id) {
      collect(block.block_id);
    }
  }

  return result;
}

async function clearDocumentContent(client: lark.Client, documentId: string, userAccessToken?: string) {
  const reqOptions = userAccessToken ? lark.withUserAccessToken(userAccessToken) : undefined;
  let pageBlock: { block_id?: string; children?: string[] } | undefined;
  let pageToken: string | undefined;

  do {
    const listRes = reqOptions
      ? await client.docx.documentBlock.list(
          { path: { document_id: documentId }, params: { page_size: 500, page_token: pageToken } },
          reqOptions,
        )
      : await client.docx.documentBlock.list({
          path: { document_id: documentId },
          params: { page_size: 500, page_token: pageToken },
        });

    const items = listRes?.data?.items ?? [];
    if (!pageBlock) {
      pageBlock = items.find((item) => item.block_type === 1) as typeof pageBlock;
    }

    pageToken = listRes?.data?.page_token ?? undefined;
  } while (pageToken);

  const childCount = pageBlock?.children?.length ?? 0;
  if (childCount === 0) return;

  const blockId = pageBlock?.block_id ?? documentId;

  const deleteReq = {
    data: { start_index: 0, end_index: childCount },
    params: { document_revision_id: -1 },
    path: { document_id: documentId, block_id: blockId },
  };
  reqOptions
    ? await client.docx.documentBlockChildren.batchDelete(deleteReq, reqOptions)
    : await client.docx.documentBlockChildren.batchDelete(deleteReq);
}

async function processExternalImages(
  client: lark.Client,
  documentId: string,
  originalBlocks: Array<{ block_id?: string; block_type: number; image?: { token?: string } }>,
  imageFailures: Array<{ url: string; error: string }>,
  userAccessToken?: string,
) {
  const externalImageUrls: string[] = [];
  for (const block of originalBlocks) {
    if (block.block_type === 27 && block.image?.token) {
      const token = block.image.token;
      if (token.startsWith('http://') || token.startsWith('https://')) {
        externalImageUrls.push(token);
      }
    }
  }

  if (externalImageUrls.length === 0) return;

  // 重新获取文档的实际 blocks（服务端会重新生成 block_id）
  const actualBlocks: Array<{ block_id?: string; block_type: number; image?: { token?: string } }> = [];
  let pageToken: string | undefined;
  const reqOptions = userAccessToken ? lark.withUserAccessToken(userAccessToken) : undefined;

  do {
    const listRes = reqOptions
      ? await client.docx.documentBlock.list(
          { path: { document_id: documentId }, params: { page_size: 500, page_token: pageToken } },
          reqOptions,
        )
      : await client.docx.documentBlock.list({
          path: { document_id: documentId },
          params: { page_size: 500, page_token: pageToken },
        });

    const items = listRes?.data?.items ?? [];
    actualBlocks.push(...(items as typeof actualBlocks));
    pageToken = listRes?.data?.page_token ?? undefined;
  } while (pageToken);

  const actualImageBlocks = actualBlocks.filter((b) => b.block_type === 27 && b.image?.token);

  for (let i = 0; i < externalImageUrls.length; i++) {
    const url = externalImageUrls[i];
    const actualBlock = actualImageBlocks[i];

    if (!actualBlock?.block_id) {
      imageFailures.push({ url, error: '无法匹配到实际的 image block' });
      continue;
    }

    try {
      const buffer = await downloadImage(url);
      const fileName = extractFileName(url);
      const fileToken = await uploadImageToDoc(client, documentId, buffer, fileName, userAccessToken);

      const patchReq = {
        method: 'PATCH' as const,
        url: `/open-apis/docx/v1/documents/${documentId}/blocks/${actualBlock.block_id}`,
        data: { update_image_block: { token: fileToken } },
        params: { document_revision_id: -1 },
      };
      reqOptions ? await client.request(patchReq, reqOptions) : await client.request(patchReq);
    } catch (err) {
      if (isPermissionError(err)) {
        imageFailures.push({ url, error: handlePermissionError(err) });
      } else {
        const msg = err instanceof Error ? err.message : String(err);
        imageFailures.push({ url, error: msg });
      }
    }
  }
}

export const docxBuiltinTools = [
  larkDocxBuiltinSearchTool,
  larkDocxBuiltinImportTool,
  larkDocxBuiltinMarkdownWriteTool,
  larkDocxBuiltinMarkdownReadTool,
];
