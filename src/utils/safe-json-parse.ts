export function safeJsonParse<T>(str: string | undefined | null, fallback: T): T {
  if (!str) {
    return fallback;
  }
  try {
    return JSON.parse(str);
  } catch (e) {
    return fallback;
  }
}
