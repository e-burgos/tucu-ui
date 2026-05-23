// ─── Prompt: accessibility-check ─────────────────────────────────────────────

export function getAccessibilityCheckPrompt(component: string, code?: string): string {
  return `You are performing an accessibility audit on a @e-burgos/tucu-ui component.

COMPONENT: ${component}
${code ? `CODE:\n\`\`\`tsx\n${code}\n\`\`\`` : ''}

ACCESSIBILITY CHECKLIST FOR TUCU-UI:

### 1. ARIA Labels
- All interactive elements must have accessible names
- Buttons with only icons need aria-label
- Form inputs need associated labels (use label prop)
- Images need alt text (use alt prop)

### 2. Keyboard Navigation
- All interactive elements must be focusable
- Tab order must be logical
- Modal/Drawer must trap focus
- Escape key should close modals/drawers

### 3. Color Contrast
- Use semantic tokens — they are designed for WCAG compliance
- text-primary on bg-background: meets AA
- text-muted-foreground: verify contrast ratio >= 4.5:1
- Never rely on color alone to convey information

### 4. Component-Specific

#### Button
- Icon-only buttons need aria-label
- Loading state should announce via aria-busy
- Disabled buttons should be visually distinct

#### Form/Input
- Always provide label prop (visible label)
- Error messages linked via aria-describedby (automatic in Form)
- Required fields indicated (validation schema handles this)

#### Modal/Drawer
- Must have aria-modal="true" (built-in)
- Focus trapped inside (built-in)
- Provide descriptive title

#### Alert
- role="alert" is applied automatically
- Dismissible alerts need accessible close button

#### Table (BasicTable)
- Uses semantic <table>, <th>, <td> elements
- Column headers provided via columns[].label

### 5. Screen Reader Support
- Use Typography component for proper heading hierarchy (h1 > h2 > h3)
- Don't skip heading levels
- Use aria-live for dynamic content updates
- Toast notifications use aria-live="polite"

### 6. Motion & Animation
- Respect prefers-reduced-motion
- framer-motion animations respect this preference automatically

AUDIT THE CODE:
1. Check for missing aria-labels on interactive elements
2. Verify heading hierarchy
3. Check color contrast (are semantic tokens used?)
4. Verify keyboard navigation paths
5. Check form label associations
6. List any WCAG 2.1 AA violations found

Provide specific fixes with code examples for each issue found.`;
}
