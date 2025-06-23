export function parseStringArray(str?: string | string[]): string[] {
  if (!str) {
    return [];
  }
  if (typeof str === 'string') {
    // split by comma or space and trim space
    return str.split(/[,\s]+/).map((item) => item.trim());
  }
  return str.map((item) => item.trim());
}
