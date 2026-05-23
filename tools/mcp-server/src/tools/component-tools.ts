import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  componentRegistry,
  getCategories,
  getComponentByName,
  getComponentsByCategory,
  type ComponentRegistryEntry,
} from '../data/component-registry.js';
import { fuzzySearch } from '../utils/fuzzy-search.js';

export function registerComponentTools(server: McpServer): void {
  // ─── Tool 1: list_components ─────────────────────────────
  server.tool(
    'list_components',
    'List available tucu-ui components, optionally filtered by category. Returns component names, categories, and descriptions.',
    {
      category: z
        .string()
        .optional()
        .describe(
          `Filter by category. Available: ${getCategories().join(', ')}`
        ),
      limit: z
        .number()
        .optional()
        .describe('Max number of components to return. Default: all.'),
    },
    async ({ category, limit }) => {
      let components: ComponentRegistryEntry[] = category
        ? getComponentsByCategory(category)
        : componentRegistry;

      if (limit && limit > 0) {
        components = components.slice(0, limit);
      }

      const result = components.map((c) => ({
        name: c.name,
        category: c.category,
        description: c.description,
        themeAware: c.themeAware,
      }));

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              {
                total: result.length,
                categories: getCategories(),
                components: result,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Tool 2: get_component ───────────────────────────────
  server.tool(
    'get_component',
    'Get full details of a specific tucu-ui component by name (fuzzy matched). Returns variants, example code, warnings, and related components.',
    {
      name: z.string().describe('Component name to look up (fuzzy matched).'),
    },
    async ({ name }) => {
      // Try exact match first
      let component = getComponentByName(name);

      // Fall back to fuzzy search
      if (!component) {
        const results = fuzzySearch(
          componentRegistry,
          name,
          (c) => [c.name],
          1
        );
        if (results.length > 0 && results[0].score >= 0.3) {
          component = results[0].item;
        }
      }

      if (!component) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(
                {
                  error: `Component "${name}" not found.`,
                  suggestion:
                    'Use search_components or list_components to find available components.',
                  availableCategories: getCategories(),
                },
                null,
                2
              ),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(component, null, 2),
          },
        ],
      };
    }
  );

  // ─── Tool 3: search_components ───────────────────────────
  server.tool(
    'search_components',
    'Search tucu-ui components by keyword across names and descriptions. Supports fuzzy matching.',
    {
      query: z
        .string()
        .describe('Search query (name, keyword, or description fragment).'),
      category: z
        .string()
        .optional()
        .describe('Optional category filter to narrow results.'),
      limit: z
        .number()
        .optional()
        .describe('Max results to return. Default: 10.'),
    },
    async ({ query, category, limit }) => {
      const searchLimit = limit ?? 10;

      let pool = category
        ? getComponentsByCategory(category)
        : componentRegistry;

      const results = fuzzySearch(
        pool,
        query,
        (c) => [c.name, c.description, c.category],
        searchLimit
      );

      const mapped = results.map((r) => ({
        name: r.item.name,
        category: r.item.category,
        description: r.item.description,
        score: r.score,
        matchType: r.matchType,
      }));

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              { query, resultsCount: mapped.length, results: mapped },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Tool 4: get_props ───────────────────────────────────
  server.tool(
    'get_props',
    'Get the variants and key props for a tucu-ui component. Returns variant options, usage warnings, and an example snippet.',
    {
      component: z.string().describe('Component name to get props for.'),
    },
    async ({ component }) => {
      // Try exact match first
      let entry = getComponentByName(component);

      // Fall back to fuzzy search
      if (!entry) {
        const results = fuzzySearch(
          componentRegistry,
          component,
          (c) => [c.name],
          1
        );
        if (results.length > 0 && results[0].score >= 0.3) {
          entry = results[0].item;
        }
      }

      if (!entry) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(
                {
                  error: `Component "${component}" not found.`,
                  suggestion: 'Use search_components to find the correct name.',
                },
                null,
                2
              ),
            },
          ],
        };
      }

      const propsInfo = {
        name: entry.name,
        importPath: entry.importPath,
        variants: entry.variants ?? {},
        themeAware: entry.themeAware,
        warnings: entry.warnings ?? [],
        example: entry.example,
        relatedComponents: entry.relatedComponents ?? [],
      };

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(propsInfo, null, 2),
          },
        ],
      };
    }
  );
}
