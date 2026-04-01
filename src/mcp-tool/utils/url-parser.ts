export interface ParsedBitableUrl {
  appToken: string;
  tableId?: string;
  viewId?: string;
  isWiki: boolean;
}

/**
 * Parse Feishu/Lark Bitable URL, supports multiple formats:
 * - https://xxx.feishu.cn/base/{appToken}?table={tableId}&view={viewId}
 * - https://xxx.feishu.cn/wiki/{nodeToken}
 * - https://xxx.feishu.cn/{appToken}_{tableId}
 */
export function parseBitableUrl(url: string): ParsedBitableUrl {
  let normalizedUrl = url.trim();
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  const parsed = new URL(normalizedUrl);
  const pathname = parsed.pathname;

  // Wiki URL: /wiki/{nodeToken}
  const wikiMatch = pathname.match(/\/wiki\/([A-Za-z0-9_-]+)/);
  if (wikiMatch) {
    return {
      appToken: wikiMatch[1],
      tableId: parsed.searchParams.get('table') ?? undefined,
      viewId: parsed.searchParams.get('view') ?? undefined,
      isWiki: true,
    };
  }

  // Standard bitable URL: /base/{appToken}
  const baseMatch = pathname.match(/\/base\/([A-Za-z0-9_-]+)/);
  if (baseMatch) {
    return {
      appToken: baseMatch[1],
      tableId: parsed.searchParams.get('table') ?? undefined,
      viewId: parsed.searchParams.get('view') ?? undefined,
      isWiki: false,
    };
  }

  // Shorthand URL: /{appToken}_{tableId}
  const shortMatch = pathname.match(/\/([A-Za-z0-9_-]+)_(tbl[A-Za-z0-9_-]+)/);
  if (shortMatch) {
    return {
      appToken: shortMatch[1],
      tableId: shortMatch[2],
      viewId: parsed.searchParams.get('view') ?? undefined,
      isWiki: false,
    };
  }

  // Fallback: try to extract the last path segment as appToken
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0) {
    const lastSegment = segments[segments.length - 1];
    return {
      appToken: lastSegment,
      tableId: parsed.searchParams.get('table') ?? undefined,
      viewId: parsed.searchParams.get('view') ?? undefined,
      isWiki: false,
    };
  }

  throw new Error(`Cannot parse Feishu/Lark Bitable URL: ${url}`);
}
