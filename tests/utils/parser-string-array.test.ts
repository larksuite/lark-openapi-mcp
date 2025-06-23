import { parseStringArray } from '../../src/utils/parser-string-array';

describe('parseStringArray', () => {
  it('should return empty array for undefined input', () => {
    const result = parseStringArray(undefined);
    expect(result).toEqual([]);
  });

  it('should return empty array for null input', () => {
    const result = parseStringArray(null as any);
    expect(result).toEqual([]);
  });

  it('should return empty array for empty string', () => {
    const result = parseStringArray('');
    expect(result).toEqual([]);
  });

  it('should parse comma-separated string', () => {
    const result = parseStringArray('apple,banana,cherry');
    expect(result).toEqual(['apple', 'banana', 'cherry']);
  });

  it('should parse space-separated string', () => {
    const result = parseStringArray('apple banana cherry');
    expect(result).toEqual(['apple', 'banana', 'cherry']);
  });

  it('should parse mixed comma and space-separated string', () => {
    const result = parseStringArray('apple, banana cherry,orange');
    expect(result).toEqual(['apple', 'banana', 'cherry', 'orange']);
  });

  it('should trim whitespace from each item', () => {
    const result = parseStringArray('  apple  ,  banana  ,  cherry  ');
    expect(result).toEqual(['', 'apple', 'banana', 'cherry', '']);
  });

  it('should handle multiple consecutive separators', () => {
    const result = parseStringArray('apple,,,   banana   ,,, cherry');
    expect(result).toEqual(['apple', 'banana', 'cherry']);
  });

  it('should handle string array input and trim each item', () => {
    const result = parseStringArray(['  apple  ', '  banana  ', '  cherry  ']);
    expect(result).toEqual(['apple', 'banana', 'cherry']);
  });

  it('should handle empty string array', () => {
    const result = parseStringArray([]);
    expect(result).toEqual([]);
  });

  it('should handle array with empty strings', () => {
    const result = parseStringArray(['apple', '', 'banana', '   ', 'cherry']);
    expect(result).toEqual(['apple', '', 'banana', '', 'cherry']);
  });

  it('should handle single item string', () => {
    const result = parseStringArray('apple');
    expect(result).toEqual(['apple']);
  });

  it('should handle single item array', () => {
    const result = parseStringArray(['apple']);
    expect(result).toEqual(['apple']);
  });

  it('should handle string with only separators', () => {
    const result = parseStringArray(',,,   ');
    expect(result).toEqual(['', '']);
  });

  it('should handle complex mixed separators', () => {
    const result = parseStringArray('apple,banana orange\tpear,\n\rgrape');
    expect(result).toEqual(['apple', 'banana', 'orange', 'pear', 'grape']);
  });
});
