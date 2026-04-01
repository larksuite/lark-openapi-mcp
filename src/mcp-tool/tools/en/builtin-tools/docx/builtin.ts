import { McpTool } from '../../../../types';
import * as lark from '@larksuiteoapi/node-sdk';
import { ReadStream } from 'fs';
import { Readable } from 'stream';
import { z } from 'zod';
import { blocksToMarkdown, Block } from '../../../../utils/block-converter';
import { isPermissionError, handlePermissionError } from '../../../../utils/permission-error';
import { downloadImage, uploadImageToDoc, extractFileName } from '../../../../utils/image-processor';

// Tool name type
export type docxBuiltinToolName = 'docx.builtin.search' | 'docx.builtin.import' | 'docx.builtin.markdownWrite' | 'docx.builtin.markdownRead';

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

export const larkDocxBuiltinMarkdownWriteTool: McpTool = {
  project: 'docx',
  name: 'docx.builtin.markdownWrite',
  accessTokens: ['user', 'tenant'],
  description:
    '[Feishu/Lark]-Docs-Document-Markdown Write-Write or edit Feishu documents. Supports creating new documents or writing Markdown content to existing documents with automatic external image upload.',
  schema: {
    data: z.object({
      document_id: z.string().describe('Document ID. If not provided, a new document will be created').optional(),
      markdown: z.string().describe('Markdown content to write'),
      title: z.string().describe('New document title (only effective when creating a new document)').optional(),
      folder_token: z
        .string()
        .describe('Folder token for the new document (only effective when creating a new document)')
        .optional(),
    }),
    useUAT: z.boolean().describe('Use user identity for the request, otherwise use application identity').optional(),
  },
  customHandler: async (client, params, options): Promise<any> => {
    try {
      const { userAccessToken } = options || {};
      let documentId = params.data.document_id;

      // 1. Create new document if no document_id
      if (!documentId) {
        const createReqOptions = userAccessToken && params.useUAT ? lark.withUserAccessToken(userAccessToken) : undefined;
        const createRes = createReqOptions
          ? await client.docx.document.create({ data: { title: params.data.title, folder_token: params.data.folder_token } }, createReqOptions)
          : await client.docx.document.create({ data: { title: params.data.title, folder_token: params.data.folder_token } });

        documentId = createRes?.data?.document?.document_id;
        if (!documentId) {
          return {
            isError: true,
            content: [{ type: 'text' as const, text: JSON.stringify({ msg: 'Failed to create document: document_id not returned' }) }],
          };
        }
      }

      // 2. Convert Markdown to Blocks
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
              text: JSON.stringify({ success: true, document_id: documentId, message: 'Document created but no content blocks after Markdown conversion' }),
            },
          ],
        };
      }

      // Build block map
      const blockMap = new Map<string, (typeof convertedBlocks)[number]>();
      for (const block of convertedBlocks) {
        if (block.block_id) {
          blockMap.set(block.block_id, block);
        }
      }

      // 3. Clear existing content if editing
      if (params.data.document_id) {
        await clearDocumentContent(client, documentId, userAccessToken && params.useUAT ? userAccessToken : undefined);
      }

      // Get actual page block_id
      const pageBlockId = await getPageBlockId(client, documentId, userAccessToken && params.useUAT ? userAccessToken : undefined);

      // 4. Insert top-level blocks
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

      // 5. Process external images
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
    '[Feishu/Lark]-Docs-Document-Markdown Read-Read Feishu document content and convert to Markdown format.',
  schema: {
    data: z.object({
      document_id: z.string().describe('Feishu document ID'),
    }),
    useUAT: z.boolean().describe('Use user identity for the request, otherwise use application identity').optional(),
  },
  customHandler: async (client, params, options): Promise<any> => {
    try {
      const { userAccessToken } = options || {};

      // Paginate to get all blocks
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
          content: [{ type: 'text' as const, text: 'Document is empty, no content blocks.' }],
        };
      }

      // Build blockMap
      const blockMap = new Map<string, Block>();
      for (const block of allBlocks) {
        if (block.block_id) {
          blockMap.set(block.block_id, block);
        }
      }

      // Convert to Markdown
      const markdown = blocksToMarkdown(allBlocks, blockMap);

      return {
        content: [{ type: 'text' as const, text: markdown || '(Document content is empty)' }],
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

// --- Helper functions for markdownWrite ---

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

  // Re-fetch actual blocks from server (block_ids are regenerated)
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
      imageFailures.push({ url, error: 'Cannot match to actual image block' });
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
