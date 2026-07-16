import { authStore } from '../../auth';
import type { SettableValue } from '../../mcp-tool';

export function createLocalUserAccessToken(appId: string): SettableValue {
  return {
    getter: async () => await authStore.getLocalAccessToken(appId),
    setter: async (accessToken?: string) => {
      if (!accessToken) {
        return;
      }
      await authStore.rotateLocalAccessToken(accessToken, appId);
    },
  };
}
