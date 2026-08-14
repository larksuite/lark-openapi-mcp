import { wikiV1NodeSearch as enWikiV1NodeSearch } from '../../src/mcp-tool/tools/en/gen-tools/zod/wiki_v1';
import { wikiV1NodeSearch as zhWikiV1NodeSearch } from '../../src/mcp-tool/tools/zh/gen-tools/zod/wiki_v1';

describe('wiki.v1.node.search', () => {
  it('should call the correct API path /open-apis/wiki/v2/nodes/search (issue #74)', () => {
    expect(enWikiV1NodeSearch.path).toBe('/open-apis/wiki/v2/nodes/search');
    expect(zhWikiV1NodeSearch.path).toBe('/open-apis/wiki/v2/nodes/search');
  });

  it('should not contain the non-existent v1 endpoint', () => {
    expect(enWikiV1NodeSearch.path).not.toContain('/open-apis/wiki/v1/');
    expect(zhWikiV1NodeSearch.path).not.toContain('/open-apis/wiki/v1/');
  });
});
