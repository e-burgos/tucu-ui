# Security Policy

## Supported Versions

Only the latest published version of each package receives security fixes:

| Package                   | Supported          |
| -------------------------- | ------------------- |
| `@e-burgos/tucu-ui`         | latest on npm only |
| `@e-burgos/tucu-ui-mcp`     | latest on npm only |

There is no LTS branch — upgrade to the latest release to get a fix.

## Reporting a Vulnerability

Please **do not open a public GitHub issue** for security vulnerabilities.

Instead, use [GitHub Security Advisories](https://github.com/e-burgos/tucu-ui/security/advisories/new) to report privately. Include:

- A description of the vulnerability and its impact
- Steps to reproduce (a minimal repro is ideal)
- The affected package(s) and version(s)

You should expect an initial response within a few business days. Once a fix is available, it will ship as a patch release and the advisory will be published/credited unless you request otherwise.

## Supply Chain

- Both packages publish to npm via **npm Trusted Publishing (OIDC)** from GitHub Actions (`.github/workflows/publish-tucu-ui.yml`, `publish-mcp.yml`) — there is no long-lived npm token stored as a repository secret to leak or rotate, and npm generates build provenance automatically for every release.
- `NPM_TOKEN`, if ever used locally for the `--local-publish` emergency path (see `harness/skills/publish/SKILL.md`), is read only from the environment or a gitignored `.env.local` — never committed, never printed by tooling.
- The MCP server (`tools/mcp-server`) executes tool calls on behalf of connected AI agents; it does not accept or execute arbitrary shell commands from MCP clients.

## Scope

This policy covers the `tucu-ui` monorepo (the `@e-burgos/tucu-ui` component library and the `@e-burgos/tucu-ui-mcp` server). It does not cover third-party dependencies — report those upstream.
