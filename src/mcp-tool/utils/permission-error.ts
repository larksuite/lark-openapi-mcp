/**
 * Handle permission error (code 99991672) and return user-friendly message
 */
export function handlePermissionError(error: unknown): string {
  const err = error as Record<string, unknown>;
  const response = err?.response as Record<string, unknown> | undefined;
  const data = response?.data as Record<string, unknown> | undefined;
  const code = err?.code ?? response?.code ?? data?.code;

  if (Number(code) === 99991672) {
    const violations = (data?.permission_violations ??
      response?.permission_violations ??
      err?.permission_violations ??
      []) as Array<{ uri?: string }>;
    const authUrls = violations.map((v) => v.uri).filter(Boolean);
    if (authUrls.length > 0) {
      return JSON.stringify({
        msg: 'Insufficient permissions. Please visit the following links to request access.',
        auth_urls: authUrls,
      });
    }
    return JSON.stringify({ msg: 'Insufficient permissions. Please contact your Feishu/Lark app admin to configure the required permissions.' });
  }

  throw error;
}

/**
 * Check if error is a permission error
 */
export function isPermissionError(error: unknown): boolean {
  const err = error as Record<string, unknown>;
  const response = err?.response as Record<string, unknown> | undefined;
  const data = response?.data as Record<string, unknown> | undefined;
  const code = err?.code ?? response?.code ?? data?.code;
  return Number(code) === 99991672;
}
