export interface SearchResult<T> {
  item: T;
  score: number;
  matchType: 'exact' | 'prefix' | 'contains' | 'fuzzy';
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export function fuzzySearch<T>(
  items: T[],
  query: string,
  getSearchableText: (item: T) => string[],
  limit?: number
): SearchResult<T>[] {
  if (!query.trim()) {
    return items.slice(0, limit).map((item) => ({
      item,
      score: 1.0,
      matchType: 'exact' as const,
    }));
  }

  const normalizedQuery = query.toLowerCase().trim();
  const results: SearchResult<T>[] = [];

  for (const item of items) {
    const texts = getSearchableText(item).map((t) => t.toLowerCase());
    let bestScore = 0;
    let bestMatchType: SearchResult<T>['matchType'] = 'fuzzy';

    for (const text of texts) {
      // Exact match
      if (text === normalizedQuery) {
        bestScore = 1.0;
        bestMatchType = 'exact';
        break;
      }

      // Prefix match
      if (text.startsWith(normalizedQuery)) {
        const score = 0.9;
        if (score > bestScore) {
          bestScore = score;
          bestMatchType = 'prefix';
        }
        continue;
      }

      // Contains match
      if (text.includes(normalizedQuery)) {
        const score = 0.7;
        if (score > bestScore) {
          bestScore = score;
          bestMatchType = 'contains';
        }
        continue;
      }

      // Fuzzy match via Levenshtein
      const distance = levenshteinDistance(normalizedQuery, text);
      const maxLen = Math.max(normalizedQuery.length, text.length);
      if (distance <= 2 && maxLen > 0) {
        const score = 0.3 + 0.3 * (1 - distance / maxLen);
        if (score > bestScore) {
          bestScore = score;
          bestMatchType = 'fuzzy';
        }
      }

      // Also check individual words in longer texts
      const words = text.split(/\s+/);
      for (const word of words) {
        if (word === normalizedQuery) {
          const score = 0.95;
          if (score > bestScore) {
            bestScore = score;
            bestMatchType = 'exact';
          }
        } else if (word.startsWith(normalizedQuery)) {
          const score = 0.85;
          if (score > bestScore) {
            bestScore = score;
            bestMatchType = 'prefix';
          }
        } else if (word.includes(normalizedQuery)) {
          const score = 0.65;
          if (score > bestScore) {
            bestScore = score;
            bestMatchType = 'contains';
          }
        } else {
          const wordDist = levenshteinDistance(normalizedQuery, word);
          if (wordDist <= 2 && word.length > 0) {
            const score =
              0.3 +
              0.3 *
                (1 - wordDist / Math.max(normalizedQuery.length, word.length));
            if (score > bestScore) {
              bestScore = score;
              bestMatchType = 'fuzzy';
            }
          }
        }
      }
    }

    if (bestScore > 0) {
      results.push({ item, score: bestScore, matchType: bestMatchType });
    }
  }

  results.sort((a, b) => b.score - a.score);

  return limit ? results.slice(0, limit) : results;
}
