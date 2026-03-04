import { McpTool } from '../../../../types';
import * as lark from '@larksuiteoapi/node-sdk';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { z } from 'zod';
import { isPermissionError, handlePermissionError } from '../../../../utils/permission-error';

// Tool name type
export type driveBuiltinToolName = 'drive.builtin.upload' | 'drive.builtin.download';

export const larkDriveBuiltinUploadTool: McpTool = {
  project: 'drive',
  name: 'drive.builtin.upload',
  accessTokens: ['user', 'tenant'],
  description:
    '[Feishu/Lark]-Drive-File Upload-Upload local file to Feishu/Lark Drive. Supports automatic chunked upload for large files (>20MB).',
  schema: {
    data: z.object({
      file_path: z.string().describe('Absolute path of the local file'),
      folder_token: z.string().describe('Target folder token'),
      file_name: z.string().describe('File name (defaults to original file name)').optional(),
    }),
    useUAT: z.boolean().describe('Use user identity for the request, otherwise use application identity').optional(),
  },
  customHandler: async (client, params, options): Promise<any> => {
    try {
      const { userAccessToken } = options || {};

      // Validate file exists
      if (!fs.existsSync(params.data.file_path)) {
        return {
          isError: true,
          content: [{ type: 'text' as const, text: JSON.stringify({ msg: `File not found: ${params.data.file_path}` }) }],
        };
      }

      const stat = fs.statSync(params.data.file_path);
      if (!stat.isFile()) {
        return {
          isError: true,
          content: [{ type: 'text' as const, text: JSON.stringify({ msg: `Path is not a file: ${params.data.file_path}` }) }],
        };
      }

      const fileName = params.data.file_name ?? path.basename(params.data.file_path);
      const fileSize = stat.size;
      const CHUNK_THRESHOLD = 20 * 1024 * 1024; // 20MB

      let fileToken: string | undefined;
      const reqOptions = userAccessToken && params.useUAT ? lark.withUserAccessToken(userAccessToken) : undefined;

      if (fileSize < CHUNK_THRESHOLD) {
        // Small file direct upload
        const data = {
          file_name: fileName,
          parent_type: 'explorer' as const,
          parent_node: params.data.folder_token,
          size: fileSize,
          file: fs.createReadStream(params.data.file_path),
        };
        const result = reqOptions
          ? await client.drive.file.uploadAll({ data }, reqOptions)
          : await client.drive.file.uploadAll({ data });

        fileToken =
          result?.file_token ??
          ((result as Record<string, Record<string, unknown>>)?.data?.file_token as string | undefined);
      } else {
        // Large file chunked upload
        fileToken = await chunkedUpload(client, params.data.file_path, fileName, fileSize, params.data.folder_token, reqOptions);
      }

      if (!fileToken) {
        return {
          isError: true,
          content: [{ type: 'text' as const, text: JSON.stringify({ msg: 'Upload failed: file_token not returned' }) }],
        };
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ success: true, file_token: fileToken, file_name: fileName, file_size: fileSize }),
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

export const larkDriveBuiltinDownloadTool: McpTool = {
  project: 'drive',
  name: 'drive.builtin.download',
  accessTokens: ['user', 'tenant'],
  description: '[Feishu/Lark]-Drive-File Download-Download file from Feishu/Lark Drive to local filesystem.',
  schema: {
    data: z.object({
      file_token: z.string().describe('File token'),
      save_path: z.string().describe('Save path (defaults to temp directory)').optional(),
    }),
    useUAT: z.boolean().describe('Use user identity for the request, otherwise use application identity').optional(),
  },
  customHandler: async (client, params, options): Promise<any> => {
    try {
      const { userAccessToken } = options || {};

      let savePath: string;

      if (params.data.save_path) {
        if (!path.isAbsolute(params.data.save_path)) {
          return {
            isError: true,
            content: [{ type: 'text' as const, text: JSON.stringify({ msg: 'Save path must be an absolute path' }) }],
          };
        }

        const resolved = path.resolve(params.data.save_path);
        if (resolved !== params.data.save_path && resolved !== path.normalize(params.data.save_path)) {
          return {
            isError: true,
            content: [{ type: 'text' as const, text: JSON.stringify({ msg: 'Save path contains unsafe path traversal' }) }],
          };
        }

        savePath = resolved;
      } else {
        savePath = path.join(os.tmpdir(), `feishu-download-${Date.now()}`);
      }

      // Ensure target directory exists
      const dir = path.dirname(savePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const reqOptions = userAccessToken && params.useUAT ? lark.withUserAccessToken(userAccessToken) : undefined;
      const resp = reqOptions
        ? await client.drive.file.download({ path: { file_token: params.data.file_token } }, reqOptions)
        : await client.drive.file.download({ path: { file_token: params.data.file_token } });

      await resp.writeFile(savePath);

      const stat = fs.statSync(savePath);

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ success: true, save_path: savePath, file_size: stat.size }),
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

// --- Helper function for chunked upload ---

async function chunkedUpload(
  client: lark.Client,
  filePath: string,
  fileName: string,
  fileSize: number,
  folderToken: string,
  reqOptions?: ReturnType<typeof lark.withUserAccessToken>,
): Promise<string | undefined> {
  // 1. Prepare upload
  const prepareData = {
    file_name: fileName,
    parent_type: 'explorer' as const,
    parent_node: folderToken,
    size: fileSize,
  };
  const prepareRes = reqOptions
    ? await client.drive.file.uploadPrepare({ data: prepareData }, reqOptions)
    : await client.drive.file.uploadPrepare({ data: prepareData });

  const uploadId = prepareRes?.data?.upload_id;
  const blockSize = prepareRes?.data?.block_size;
  const blockNum = prepareRes?.data?.block_num;

  if (!uploadId || !blockSize || !blockNum) {
    throw new Error('Chunked upload prepare failed: missing required parameters');
  }

  // 2. Upload parts
  const fd = fs.openSync(filePath, 'r');
  try {
    for (let seq = 0; seq < blockNum; seq++) {
      const offset = seq * blockSize;
      const chunkSize = Math.min(blockSize, fileSize - offset);
      const buffer = Buffer.alloc(chunkSize);
      fs.readSync(fd, buffer, 0, chunkSize, offset);

      const partData = { upload_id: uploadId, seq, size: chunkSize, file: buffer };
      reqOptions
        ? await client.drive.file.uploadPart({ data: partData }, reqOptions)
        : await client.drive.file.uploadPart({ data: partData });
    }
  } finally {
    fs.closeSync(fd);
  }

  // 3. Finish upload
  const finishData = { upload_id: uploadId, block_num: blockNum };
  const finishRes = reqOptions
    ? await client.drive.file.uploadFinish({ data: finishData }, reqOptions)
    : await client.drive.file.uploadFinish({ data: finishData });

  return finishRes?.data?.file_token;
}

export const driveBuiltinTools = [larkDriveBuiltinUploadTool, larkDriveBuiltinDownloadTool];
