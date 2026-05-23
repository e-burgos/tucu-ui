import { describe, it, expect } from 'vitest';
import { fuzzySearch, type SearchResult } from '../src/utils/fuzzy-search.js';

interface TestItem {
  name: string;
}

describe('fuzzySearch', () => {
  const items: TestItem[] = [
    { name: 'Button' },
    { name: 'Badge' },
    { name: 'InputSearcher' },
    { name: 'Input' },
    { name: 'Select' },
    { name: 'Spinner' },
  ];
  const getText = (i: TestItem): string[] => [i.name];

  it('exact match scores 1.0', () => {
    const results = fuzzySearch(items, 'Button', getText);
    expect(results[0].score).toBe(1.0);
    expect(results[0].matchType).toBe('exact');
    expect(results[0].item.name).toBe('Button');
  });

  it('prefix match scores 0.9', () => {
    const results = fuzzySearch(items, 'Butt', getText);
    expect(results[0].score).toBe(0.9);
    expect(results[0].matchType).toBe('prefix');
    expect(results[0].item.name).toBe('Button');
  });

  it('contains match scores 0.7', () => {
    const results = fuzzySearch(items, 'search', getText);
    expect(results[0].matchType).toBe('contains');
    expect(results[0].item.name).toBe('InputSearcher');
  });

  it('fuzzy match finds typos (Levenshtein distance <= 2)', () => {
    const results = fuzzySearch(items, 'Buton', getText);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].item.name).toBe('Button');
    expect(results[0].matchType).toBe('fuzzy');
  });

  it('returns empty for completely unrelated query', () => {
    const results = fuzzySearch(items, 'zzzzzzz', getText);
    expect(results).toHaveLength(0);
  });

  it('returns all items when query is empty', () => {
    const results = fuzzySearch(items, '', getText);
    expect(results.length).toBe(items.length);
  });

  it('respects limit parameter', () => {
    const results = fuzzySearch(items, '', getText, 3);
    expect(results.length).toBe(3);
  });

  it('results are sorted by score descending', () => {
    const results = fuzzySearch(items, 'Inp', getText);
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
    }
  });

  it('case insensitive matching', () => {
    const results = fuzzySearch(items, 'button', getText);
    expect(results[0].item.name).toBe('Button');
    expect(results[0].score).toBe(1.0);
  });
});
