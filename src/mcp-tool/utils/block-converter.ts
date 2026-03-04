/**
 * Feishu Document Block Type Enum
 * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/list
 */
const BlockType = {
  PAGE: 1,
  TEXT: 2,
  HEADING1: 3,
  HEADING2: 4,
  HEADING3: 5,
  HEADING4: 6,
  HEADING5: 7,
  HEADING6: 8,
  HEADING7: 9,
  HEADING8: 10,
  HEADING9: 11,
  BULLET: 12,
  ORDERED: 13,
  CODE: 14,
  QUOTE: 15,
  TODO: 17,
  DIVIDER: 22,
  IMAGE: 27,
  TABLE: 31,
  TABLE_CELL: 32,
  CALLOUT: 34,
  QUOTE_CONTAINER: 36,
} as const;

export interface TextElement {
  text_run?: {
    content: string;
    text_element_style?: {
      bold?: boolean;
      italic?: boolean;
      strikethrough?: boolean;
      underline?: boolean;
      inline_code?: boolean;
      link?: {
        url: string;
      };
    };
  };
  mention_user?: {
    user_id: string;
  };
  mention_doc?: {
    token: string;
    url?: string;
    title?: string;
  };
}

export interface BlockStyle {
  align?: number;
  done?: boolean;
  language?: number;
  wrap?: boolean;
}

export interface Block {
  block_id?: string;
  parent_id?: string;
  children?: string[];
  block_type: number;
  page?: { elements?: TextElement[]; style?: BlockStyle };
  text?: { elements?: TextElement[]; style?: BlockStyle };
  heading1?: { elements?: TextElement[]; style?: BlockStyle };
  heading2?: { elements?: TextElement[]; style?: BlockStyle };
  heading3?: { elements?: TextElement[]; style?: BlockStyle };
  heading4?: { elements?: TextElement[]; style?: BlockStyle };
  heading5?: { elements?: TextElement[]; style?: BlockStyle };
  heading6?: { elements?: TextElement[]; style?: BlockStyle };
  heading7?: { elements?: TextElement[]; style?: BlockStyle };
  heading8?: { elements?: TextElement[]; style?: BlockStyle };
  heading9?: { elements?: TextElement[]; style?: BlockStyle };
  bullet?: { elements?: TextElement[]; style?: BlockStyle };
  ordered?: { elements?: TextElement[]; style?: BlockStyle };
  code?: { elements?: TextElement[]; style?: BlockStyle };
  quote?: { elements?: TextElement[]; style?: BlockStyle };
  todo?: { elements?: TextElement[]; style?: BlockStyle };
  divider?: Record<string, unknown>;
  image?: { token?: string; width?: number; height?: number };
  table?: { cells?: string[]; property?: { row_size?: number; column_size?: number } };
  callout?: { elements?: TextElement[]; style?: BlockStyle };
  quote_container?: Record<string, unknown>;
}

const CODE_LANGUAGE_MAP: Record<number, string> = {
  1: 'plaintext',
  2: 'abap',
  3: 'ada',
  4: 'apache',
  5: 'apex',
  6: 'assembly',
  7: 'bash',
  8: 'csharp',
  9: 'c',
  10: 'cpp',
  11: 'cmake',
  12: 'css',
  13: 'coffeescript',
  14: 'd',
  15: 'dart',
  16: 'delphi',
  17: 'django',
  18: 'dockerfile',
  19: 'erlang',
  20: 'fortran',
  21: 'foxpro',
  22: 'go',
  23: 'groovy',
  24: 'html',
  25: 'htmlbars',
  26: 'http',
  27: 'haskell',
  28: 'json',
  29: 'java',
  30: 'javascript',
  31: 'julia',
  32: 'kotlin',
  33: 'latex',
  34: 'lisp',
  35: 'lua',
  36: 'matlab',
  37: 'makefile',
  38: 'markdown',
  39: 'nginx',
  40: 'objectivec',
  41: 'opencl',
  42: 'php',
  43: 'perl',
  44: 'powershell',
  45: 'prolog',
  46: 'protobuf',
  47: 'python',
  48: 'r',
  49: 'rpm',
  50: 'ruby',
  51: 'rust',
  52: 'sas',
  53: 'scss',
  54: 'sql',
  55: 'scala',
  56: 'scheme',
  57: 'scratch',
  58: 'shell',
  59: 'swift',
  60: 'thrift',
  61: 'typescript',
  62: 'vbscript',
  63: 'visual_basic',
  64: 'xml',
  65: 'yaml',
};

/**
 * Format TextElement to markdown string
 */
function formatTextElement(el: TextElement): string {
  if (el.mention_user) {
    return `@${el.mention_user.user_id}`;
  }

  if (el.mention_doc) {
    const title = el.mention_doc.title || el.mention_doc.token;
    const url = el.mention_doc.url || '';
    return url ? `[${title}](${url})` : title;
  }

  if (!el.text_run) return '';

  let text = el.text_run.content;
  const style = el.text_run.text_element_style;

  if (!style) return text;

  if (style.inline_code) {
    return `\`${text}\``;
  }

  if (style.bold) {
    text = `**${text}**`;
  }

  if (style.italic) {
    text = `*${text}*`;
  }

  if (style.strikethrough) {
    text = `~~${text}~~`;
  }

  if (style.link) {
    let url: string;
    try {
      url = decodeURIComponent(style.link.url);
    } catch {
      url = style.link.url;
    }
    text = `[${text}](${url})`;
  }

  return text;
}

/**
 * Convert elements array to text
 */
function elementsToText(elements?: TextElement[]): string {
  if (!elements || elements.length === 0) return '';
  return elements.map(formatTextElement).join('');
}

/**
 * Get block content (elements)
 */
function getBlockContent(block: Block): { elements?: TextElement[]; style?: BlockStyle } | undefined {
  switch (block.block_type) {
    case BlockType.PAGE:
      return block.page;
    case BlockType.TEXT:
      return block.text;
    case BlockType.HEADING1:
      return block.heading1;
    case BlockType.HEADING2:
      return block.heading2;
    case BlockType.HEADING3:
      return block.heading3;
    case BlockType.HEADING4:
      return block.heading4;
    case BlockType.HEADING5:
      return block.heading5;
    case BlockType.HEADING6:
      return block.heading6;
    case BlockType.HEADING7:
      return block.heading7;
    case BlockType.HEADING8:
      return block.heading8;
    case BlockType.HEADING9:
      return block.heading9;
    case BlockType.BULLET:
      return block.bullet;
    case BlockType.ORDERED:
      return block.ordered;
    case BlockType.CODE:
      return block.code;
    case BlockType.QUOTE:
      return block.quote;
    case BlockType.TODO:
      return block.todo;
    case BlockType.CALLOUT:
      return block.callout;
    default:
      return undefined;
  }
}

/**
 * Convert Feishu Document Blocks to Markdown
 */
export function blocksToMarkdown(blocks: Block[], blockMap?: Map<string, Block>): string {
  const map = blockMap ?? new Map<string, Block>();
  if (!blockMap) {
    for (const block of blocks) {
      if (block.block_id) {
        map.set(block.block_id, block);
      }
    }
  }

  const pageBlock = blocks.find((b) => b.block_type === BlockType.PAGE);
  const topLevelIds =
    pageBlock?.children ??
    blocks
      .filter((b) => b.block_type !== BlockType.PAGE)
      .map((b) => b.block_id!)
      .filter(Boolean);

  const lines: string[] = [];
  let orderedCounter = 0;
  let prevType = 0;

  for (const blockId of topLevelIds) {
    const block = map.get(blockId);
    if (!block) continue;

    if (block.block_type !== BlockType.ORDERED && prevType === BlockType.ORDERED) {
      orderedCounter = 0;
    }

    const line = convertBlockToMarkdown(block, map, 0, orderedCounter);
    if (line !== null) {
      lines.push(line);
    }

    if (block.block_type === BlockType.ORDERED) {
      orderedCounter++;
    }

    prevType = block.block_type;
  }

  return lines.join('\n');
}

function convertBlockToMarkdown(
  block: Block,
  blockMap: Map<string, Block>,
  depth: number,
  orderedIndex: number,
): string | null {
  const content = getBlockContent(block);
  const text = elementsToText(content?.elements);
  const indent = '  '.repeat(depth);

  switch (block.block_type) {
    case BlockType.PAGE:
      return null;

    case BlockType.TEXT:
      return `${indent}${text}`;

    case BlockType.HEADING1:
      return `${indent}# ${text}`;
    case BlockType.HEADING2:
      return `${indent}## ${text}`;
    case BlockType.HEADING3:
      return `${indent}### ${text}`;
    case BlockType.HEADING4:
      return `${indent}#### ${text}`;
    case BlockType.HEADING5:
      return `${indent}##### ${text}`;
    case BlockType.HEADING6:
    case BlockType.HEADING7:
    case BlockType.HEADING8:
    case BlockType.HEADING9:
      return `${indent}###### ${text}`;

    case BlockType.BULLET: {
      const childLines = convertChildren(block, blockMap, depth + 1);
      const displayText = text || extractChildText(block, blockMap);
      const bulletLine = `${indent}- ${displayText}`;
      return childLines ? `${bulletLine}\n${childLines}` : bulletLine;
    }

    case BlockType.ORDERED: {
      const num = orderedIndex + 1;
      const childLines = convertChildren(block, blockMap, depth + 1);
      const displayText = text || extractChildText(block, blockMap);
      const orderedLine = `${indent}${num}. ${displayText}`;
      return childLines ? `${orderedLine}\n${childLines}` : orderedLine;
    }

    case BlockType.CODE: {
      const lang = CODE_LANGUAGE_MAP[content?.style?.language ?? 1] ?? '';
      return `${indent}\`\`\`${lang}\n${text}\n${indent}\`\`\``;
    }

    case BlockType.QUOTE: {
      const quotedLines = text
        .split('\n')
        .map((line) => `${indent}> ${line}`)
        .join('\n');
      const childLines = convertQuoteChildren(block, blockMap, depth);
      return childLines ? `${quotedLines}\n${childLines}` : quotedLines;
    }

    case BlockType.TODO: {
      const done = content?.style?.done;
      const checkbox = done ? '[x]' : '[ ]';
      return `${indent}- ${checkbox} ${text}`;
    }

    case BlockType.DIVIDER:
      return `${indent}---`;

    case BlockType.IMAGE: {
      const token = block.image?.token ?? '';
      return `${indent}![image](${token})`;
    }

    case BlockType.TABLE:
      return convertTable(block, blockMap, indent);

    case BlockType.CALLOUT: {
      const calloutContent = text ? `> ${text}` : '';
      const childLines = convertQuoteChildren(block, blockMap, depth);
      return childLines ? `${calloutContent}\n${childLines}` : calloutContent;
    }

    case BlockType.QUOTE_CONTAINER: {
      return convertQuoteChildren(block, blockMap, depth);
    }

    default:
      return text ? `${indent}${text}` : null;
  }
}

function convertChildren(block: Block, blockMap: Map<string, Block>, depth: number): string | null {
  if (!block.children || block.children.length === 0) return null;

  const lines: string[] = [];
  let orderedCounter = 0;

  for (const childId of block.children) {
    const child = blockMap.get(childId);
    if (!child) continue;

    const line = convertBlockToMarkdown(child, blockMap, depth, orderedCounter);
    if (line !== null) {
      lines.push(line);
    }

    if (child.block_type === BlockType.ORDERED) {
      orderedCounter++;
    } else {
      orderedCounter = 0;
    }
  }

  return lines.length > 0 ? lines.join('\n') : null;
}

function convertQuoteChildren(block: Block, blockMap: Map<string, Block>, depth: number): string | null {
  if (!block.children || block.children.length === 0) return null;

  const lines: string[] = [];
  const indent = '  '.repeat(depth);

  for (const childId of block.children) {
    const child = blockMap.get(childId);
    if (!child) continue;

    const content = getBlockContent(child);
    const text = elementsToText(content?.elements);
    if (text) {
      lines.push(`${indent}> ${text}`);
    }
  }

  return lines.length > 0 ? lines.join('\n') : null;
}

function convertTable(block: Block, blockMap: Map<string, Block>, indent: string): string | null {
  const property = block.table?.property;
  if (!property?.row_size || !property?.column_size) return null;

  const cells = block.children ?? block.table?.cells ?? [];
  const rows: string[][] = [];

  for (let r = 0; r < property.row_size; r++) {
    const row: string[] = [];
    for (let c = 0; c < property.column_size; c++) {
      const cellIndex = r * property.column_size + c;
      const cellId = cells[cellIndex];
      if (!cellId) {
        row.push('');
        continue;
      }
      const cellBlock = blockMap.get(cellId);
      if (!cellBlock || !cellBlock.children) {
        row.push('');
        continue;
      }
      const cellTexts: string[] = [];
      for (const childId of cellBlock.children) {
        const child = blockMap.get(childId);
        if (!child) continue;
        const content = getBlockContent(child);
        const text = elementsToText(content?.elements);
        if (text) cellTexts.push(text);
      }
      row.push(cellTexts.join(' '));
    }
    rows.push(row);
  }

  if (rows.length === 0) return null;

  const lines: string[] = [];
  const header = rows[0];
  lines.push(`${indent}| ${header.join(' | ')} |`);
  lines.push(`${indent}| ${header.map(() => '---').join(' | ')} |`);
  for (let r = 1; r < rows.length; r++) {
    lines.push(`${indent}| ${rows[r].join(' | ')} |`);
  }

  return lines.join('\n');
}

/**
 * Extract text from child blocks when parent elements are empty
 */
function extractChildText(block: Block, blockMap: Map<string, Block>): string {
  if (!block.children || block.children.length === 0) return '';

  const texts: string[] = [];
  for (const childId of block.children) {
    const child = blockMap.get(childId);
    if (!child) continue;
    const content = getBlockContent(child);
    const childText = elementsToText(content?.elements);
    if (childText) texts.push(childText);
  }

  return texts.join(' ');
}
