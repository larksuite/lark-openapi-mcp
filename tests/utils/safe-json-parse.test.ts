import { safeJsonParse } from '../../src/utils/safe-json-parse';

describe('safeJsonParse', () => {
  it('should return fallback for undefined input', () => {
    const fallback = { default: 'value' };
    const result = safeJsonParse(undefined, fallback);
    expect(result).toBe(fallback);
  });

  it('should return fallback for null input', () => {
    const fallback = { default: 'value' };
    const result = safeJsonParse(null, fallback);
    expect(result).toBe(fallback);
  });

  it('should return fallback for empty string input', () => {
    const fallback = { default: 'value' };
    const result = safeJsonParse('', fallback);
    expect(result).toBe(fallback);
  });

  it('should parse valid JSON string', () => {
    const jsonString = '{"name": "test", "value": 123}';
    const fallback = { default: 'value' };
    const result = safeJsonParse(jsonString, fallback);
    expect(result).toEqual({ name: 'test', value: 123 });
  });

  it('should parse valid JSON array', () => {
    const jsonString = '[1, 2, 3, "test"]';
    const fallback: any[] = [];
    const result = safeJsonParse(jsonString, fallback);
    expect(result).toEqual([1, 2, 3, 'test']);
  });

  it('should parse primitive JSON values', () => {
    expect(safeJsonParse('true', false)).toBe(true);
    expect(safeJsonParse('false', true)).toBe(false);
    expect(safeJsonParse('null', 'fallback')).toBe(null);
    expect(safeJsonParse('123', 0)).toBe(123);
    expect(safeJsonParse('"hello"', 'fallback')).toBe('hello');
  });

  it('should return fallback for invalid JSON', () => {
    const fallback = { error: 'invalid' };
    const result = safeJsonParse('invalid json', fallback);
    expect(result).toBe(fallback);
  });

  it('should return fallback for malformed JSON object', () => {
    const fallback = { error: 'malformed' };
    const result = safeJsonParse('{"name": "test",}', fallback);
    expect(result).toBe(fallback);
  });

  it('should return fallback for malformed JSON array', () => {
    const fallback: any[] = [];
    const result = safeJsonParse('[1, 2, 3,]', fallback);
    expect(result).toBe(fallback);
  });

  it('should return fallback for unclosed JSON', () => {
    const fallback = { error: 'unclosed' };
    const result = safeJsonParse('{"name": "test"', fallback);
    expect(result).toBe(fallback);
  });

  it('should handle complex nested JSON', () => {
    const jsonString = '{"users": [{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}], "total": 2}';
    const fallback = {};
    const result = safeJsonParse(jsonString, fallback);
    expect(result).toEqual({
      users: [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
      ],
      total: 2,
    });
  });

  it('should work with different fallback types', () => {
    expect(safeJsonParse('invalid', 'string fallback')).toBe('string fallback');
    expect(safeJsonParse('invalid', 42)).toBe(42);
    expect(safeJsonParse('invalid', true)).toBe(true);
    expect(safeJsonParse('invalid', null)).toBe(null);
    expect(safeJsonParse('invalid', undefined)).toBe(undefined);
  });

  it('should handle whitespace-only strings', () => {
    const fallback = { whitespace: 'test' };
    expect(safeJsonParse('   ', fallback)).toBe(fallback);
    expect(safeJsonParse('\t\n\r', fallback)).toBe(fallback);
  });

  it('should preserve type information from parsed JSON', () => {
    interface TestType {
      id: number;
      name: string;
      active: boolean;
    }

    const jsonString = '{"id": 1, "name": "test", "active": true}';
    const fallback: TestType = { id: 0, name: '', active: false };
    const result = safeJsonParse<TestType>(jsonString, fallback);

    expect(result.id).toBe(1);
    expect(result.name).toBe('test');
    expect(result.active).toBe(true);
  });
});
