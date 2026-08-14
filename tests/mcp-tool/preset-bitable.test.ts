/**
 * preset.bitable.default (issue #77).
 *
 * The changelog documents `preset.bitable.default` as a supported preset, but
 * the PresetName enum / presetTools map never defined it, so `-t
 * preset.bitable.default` registered zero tools. These tests lock in the
 * mapping and the end-to-end expansion path.
 */

import { describe, expect, it } from '@jest/globals';
import { initOAPIMcpServer } from '../../src/mcp-server/shared/init';
import { PresetName, presetTools } from '../../src/mcp-tool/constants';
import { AllTools } from '../../src/mcp-tool/tools';

describe('preset.bitable.default (#77)', () => {
  it('defines the bitable preset with only registered tool names', () => {
    const names = presetTools[PresetName.BITABLE_DEFAULT];
    expect(names.length).toBeGreaterThan(0);

    const registered = new Set(AllTools.map((t) => t.name));
    for (const name of names) {
      expect(registered.has(name)).toBe(true);
    }
  });

  it('expands preset.bitable.default into the allowed tool list', () => {
    const { larkClient } = initOAPIMcpServer({
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      tools: ['preset.bitable.default'],
    });

    const names = larkClient.getTools().map((t) => t.name);
    const expected = presetTools[PresetName.BITABLE_DEFAULT];
    expect(names).toEqual(expect.arrayContaining(expected));
    // every listed bitable tool is actually registered
    expect(names.length).toBe(expected.length);
  });

  it('keeps other presets working alongside the bitable preset', () => {
    const { larkClient } = initOAPIMcpServer({
      appId: 'test-app-id',
      appSecret: 'test-app-secret',
      tools: ['preset.bitable.default', 'preset.im.default'],
    });

    const names = larkClient.getTools().map((t) => t.name);
    const bitableNames = presetTools[PresetName.BITABLE_DEFAULT];
    const imNames = presetTools[PresetName.IM_DEFAULT];
    expect(names).toEqual(expect.arrayContaining([...bitableNames, ...imNames]));
  });
});
