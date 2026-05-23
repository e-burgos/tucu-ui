// ─── Resource: Migration Guide ──────────────────────────────────────────────

export function getMigrationContent(): string {
  return `# Migration Guide — @e-burgos/tucu-ui

## v2.x Breaking Changes

### Variant System Overhaul (v2.0)
The variant system was standardized. Many previously valid variant names were removed.

#### Button Changes
| Before (v1.x) | After (v2.x) | Notes |
|----------------|--------------|-------|
| variant="primary" | variant="solid" color="primary" | Crash if not migrated |
| variant="secondary" | variant="ghost" | Crash if not migrated |
| variant="outline" | variant="ghost" | Crash if not migrated |
| variant="destructive" | variant="solid" color="danger" | Crash if not migrated |
| size="lg" | size="large" | Crash if not migrated |
| size="sm" | size="small" | Crash if not migrated |
| size="md" | size="medium" | Crash if not migrated |
| size="xs" | size="mini" | Crash if not migrated |

#### Badge Changes
| Before | After |
|--------|-------|
| variant="secondary" | variant="ghost" |
| variant="flat" | variant="soft" |

#### Alert Changes
| Before | After |
|--------|-------|
| variant="destructive" | variant="error" |
| variant="default" | variant="info" |

### Import Path Consolidation (v2.0)
All imports consolidated to single entry point:
\`\`\`tsx
// Before (v1.x) — multiple paths
import { Button } from '@e-burgos/tucu-ui/components/button';
import { useTheme } from '@e-burgos/tucu-ui/hooks';

// After (v2.x) — single entry point
import { Button, useTheme } from '@e-burgos/tucu-ui';
\`\`\`

### Router Changes (v2.0)
\`\`\`tsx
// Before — direct react-router-dom import
import { useNavigate } from 'react-router-dom';

// After — use ReactRouter from tucu-ui
import { ReactRouter } from '@e-burgos/tucu-ui';
const navigate = ReactRouter.useNavigate();
\`\`\`

### Layout System (v2.0)
- Added macOS and macOS Tahoe layouts
- LAYOUT_OPTIONS enum expanded

### ThemeProvider Changes (v2.0)
- \`defaultTheme\` renamed to \`defaultMode\` internally
- Added \`colorScheme\` support ('default' | 'macos')
- Added \`applyMacOSTheme()\` and \`applyDefaultTheme()\` actions

## Migration Checklist
1. [ ] Replace all Button variant="primary" with variant="solid" color="primary"
2. [ ] Replace all Button variant="outline" with variant="ghost"
3. [ ] Replace all size="lg"/"sm"/"md"/"xs" with full names
4. [ ] Replace all Badge variant="secondary" with variant="ghost"
5. [ ] Replace all Alert variant="destructive" with variant="error"
6. [ ] Consolidate imports to single '@e-burgos/tucu-ui'
7. [ ] Replace react-router-dom imports with ReactRouter from tucu-ui
8. [ ] Test runtime — invalid variants cause crash with no clear error

## Crash Pattern
Invalid variants cause this runtime error:
\`\`\`
TypeError: Cannot read properties of undefined (reading '0')
\`\`\`
This happens because the component tries to look up a style map by variant name, and undefined variants return undefined.
`;
}
