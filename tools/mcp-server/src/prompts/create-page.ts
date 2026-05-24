// ─── Prompt: create-page ─────────────────────────────────────────────────────

export function getCreatePagePrompt(
  name: string,
  layout: string,
  sections?: string
): string {
  return `You are creating a page for a @e-burgos/tucu-ui application.

PAGE NAME: ${name}
LAYOUT: ${layout}
${sections ? `SECTIONS: ${sections}` : ''}

AVAILABLE LAYOUTS:
- admin: Collapsible sidebar + fixed header (LAYOUT_OPTIONS.ADMIN)
- horizontal: Top navigation (LAYOUT_OPTIONS.HORIZONTAL)
- clean: No navigation, full canvas (LAYOUT_OPTIONS.CLEAN)
- macos: macOS-style sidebar + toolbar (LAYOUT_OPTIONS.MACOS)
- macos-tahoe: Tahoe design with rounded corners (LAYOUT_OPTIONS.MACOS_TAHOE)

RULES:
1. The page component is rendered inside ThemeProvider, so no layout wrapper needed
2. Use semantic tokens for colors (bg-primary, text-secondary, etc.)
3. Use CardContainer for card sections
4. Use Typography for headings and text
5. For navigation, use ReactRouter from '@e-burgos/tucu-ui'
6. The page must be added to menuItems in ThemeProvider

PATTERN:
\`\`\`tsx
import { CardContainer, Typography, Button, LucideIcons } from '@e-burgos/tucu-ui';

const ${name}Page = () => (
  <div className="space-y-6 p-6">
    <Typography tag="h2" color="default">${name}</Typography>
    <CardContainer className="p-6">
      {/* Page content */}
    </CardContainer>
  </div>
);

export default ${name}Page;
\`\`\`

REGISTER IN APP:
\`\`\`tsx
// Add to ThemeProvider menuItems
{ name: '${name}', path: '/${name.toLowerCase()}', icon: <LucideIcons.File />, component: <${name}Page /> }
\`\`\`

Generate a complete page component with the specified layout context and sections.`;
}
