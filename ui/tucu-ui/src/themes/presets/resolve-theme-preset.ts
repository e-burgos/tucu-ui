import { resolvePresetReference } from './theme-preset-registry';
import type {
  ResolveThemePresetOptions,
  ThemePreset,
  ThemePresetRule,
} from './theme-preset.types';

const WILDCARD_PREFIX = '*.';

const normalizeHost = (host: string): string =>
  host.trim().toLowerCase().replace(/:\d+$/, '');

const matchesHostPattern = (
  host: string,
  pattern: string | RegExp
): boolean => {
  if (pattern instanceof RegExp) return pattern.test(host);
  const normalizedPattern = normalizeHost(pattern);
  if (normalizedPattern.startsWith(WILDCARD_PREFIX)) {
    return host.endsWith(normalizedPattern.slice(1));
  }
  return host === normalizedPattern;
};

const ruleMatches = (
  rule: ThemePresetRule,
  host: string | undefined,
  tenant: string | undefined
): boolean => {
  if (rule.host === undefined && rule.tenant === undefined) return false;
  if (rule.host !== undefined) {
    if (host === undefined || !matchesHostPattern(host, rule.host)) return false;
  }
  if (rule.tenant !== undefined && rule.tenant !== tenant) return false;
  return true;
};

export function resolveThemePreset({
  host,
  tenant,
  rules,
  fallback,
}: ResolveThemePresetOptions): ThemePreset | undefined {
  const normalizedHost = host === undefined ? undefined : normalizeHost(host);
  const matchedRule = rules.find((rule) =>
    ruleMatches(rule, normalizedHost, tenant)
  );
  return resolvePresetReference(matchedRule?.preset ?? fallback);
}
