// ─── Prompt: migrate-component ───────────────────────────────────────────────

export function getMigrateComponentPrompt(
  component: string,
  fromVersion: string,
  toVersion: string
): string {
  return `You are migrating a @e-burgos/tucu-ui component between versions.

COMPONENT: ${component}
FROM VERSION: ${fromVersion}
TO VERSION: ${toVersion}

BREAKING CHANGES (v1.x → v2.x):

### Button Changes
| Before (v1.x) | After (v2.x) |
|----------------|--------------|
| variant="primary" | variant="solid" color="primary" |
| variant="secondary" | variant="ghost" |
| variant="outline" | variant="ghost" |
| variant="destructive" | variant="solid" color="danger" |
| size="lg" | size="large" |
| size="sm" | size="small" |
| size="md" | size="medium" |
| size="xs" | size="mini" |

### Badge Changes
| Before | After |
|--------|-------|
| variant="secondary" | variant="ghost" |
| variant="flat" | variant="soft" |

### Alert Changes
| Before | After |
|--------|-------|
| variant="destructive" | variant="error" |
| variant="default" | variant="info" |

### Import Changes
\`\`\`tsx
// Before — multiple paths
import { Button } from '@e-burgos/tucu-ui/components/button';
import { useTheme } from '@e-burgos/tucu-ui/hooks';

// After — single entry point
import { Button, useTheme } from '@e-burgos/tucu-ui';
\`\`\`

### Router Changes
\`\`\`tsx
// Before
import { useNavigate } from 'react-router-dom';

// After
import { ReactRouter } from '@e-burgos/tucu-ui';
const navigate = ReactRouter.useNavigate();
\`\`\`

INSTRUCTIONS:
1. Identify all deprecated props on ${component}
2. Map each to its v2.x equivalent
3. Show before/after code
4. Flag any props that were removed entirely
5. Verify imports use single entry point

Provide the complete migrated code for the ${component} component.`;
}
