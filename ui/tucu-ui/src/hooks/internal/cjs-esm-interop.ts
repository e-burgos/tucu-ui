/**
 * A handful of react-use submodules are TypeScript-compiled CJS files that
 * set `exports.default = fn` alongside `__esModule: true`. Node's own ESM
 * interop for CommonJS never special-cases `__esModule` — it just makes
 * the whole `module.exports` the default — so a bundler that wraps a
 * default-import in "Node compatibility mode" (esbuild does, see
 * https://github.com/evanw/esbuild/issues/1971) re-wraps an already
 * `.default`-shaped export, producing `{ default: { default: fn } }`
 * instead of `{ default: fn }`. That happens downstream, in whatever
 * bundler a consumer's app uses to pre-bundle this package — not in
 * tucu-ui's own build — so it can't be fixed here by changing import
 * syntax or Rollup's own interop setting.
 *
 * This unwraps whichever shape we actually got at runtime: the function
 * itself, a single `.default`, or a doubly-wrapped `.default.default`.
 */
export function unwrapCjsDefault<T>(mod: unknown): T {
  const asAny = mod as {
    default?: { default?: T } | T;
  };
  if (typeof mod === 'function') return mod as T;
  const inner = asAny.default;
  if (typeof (inner as { default?: T })?.default === 'function') {
    return (inner as { default: T }).default;
  }
  if (typeof inner === 'function') return inner as T;
  return mod as T;
}
