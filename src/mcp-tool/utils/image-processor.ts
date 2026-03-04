import * as lark from '@larksuiteoapi/node-sdk';

const IMAGE_DOWNLOAD_TIMEOUT_MS = 30_000;

/**
 * Download external image with 30s timeout
 */
export async function downloadImage(url: string): Promise<Buffer> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), IMAGE_DOWNLOAD_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status} ${response.statusText} (${url})`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Upload image to Feishu document
 */
export async function uploadImageToDoc(
  client: lark.Client,
  documentId: string,
  buffer: Buffer,
  fileName: string,
  userAccessToken?: string,
): Promise<string> {
  const data = {
    file_name: fileName,
    parent_type: 'docx_image' as const,
    parent_node: documentId,
    size: buffer.length,
    file: buffer,
  };

  const result = userAccessToken
    ? await client.drive.media.uploadAll({ data }, lark.withUserAccessToken(userAccessToken))
    : await client.drive.media.uploadAll({ data });

  const fileToken =
    result?.file_token ?? ((result as Record<string, Record<string, unknown>>)?.data?.file_token as string | undefined);
  if (!fileToken) {
    throw new Error('Failed to upload image: file_token not returned');
  }

  return fileToken;
}

/**
 * Extract file name from URL
 */
export function extractFileName(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const parts = pathname.split('/');
    const last = parts[parts.length - 1];
    if (last && last.includes('.')) {
      return last;
    }
  } catch {
    // ignore
  }
  return `image_${Date.now()}.png`;
}
