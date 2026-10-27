// ─── Prompt: design-review ───────────────────────────────────────────────────

export type DesignReviewFocus =
  | 'all'
  | 'layout'
  | 'color'
  | 'typography'
  | 'density'
  | 'motion'
  | 'states'
  | 'a11y'
  | 'responsive';

export type DesignReviewStyle = 'clean' | 'glass' | 'bold' | 'editorial';
export type DesignReviewDensity = 'compact' | 'comfortable' | 'spacious';

export interface DesignReviewArgs {
  code: string;
  focus?: DesignReviewFocus;
  style?: DesignReviewStyle;
  density?: DesignReviewDensity;
}

const focusSections: Record<DesignReviewFocus, string> = {
  all: 'every section of the guide (checklist items 1 to 15)',
  layout: 'sections 1, 2 and 6 (hierarchy, layout and composition, surfaces); checklist items 1, 2, 3, 7',
  color: 'sections 5, 6 and 7 (color, surfaces, style recipes); checklist items 6, 7, 8',
  typography: 'section 4 (typography); checklist item 5',
  density: 'section 3 (spacing and density) and section 12 (touch targets); checklist item 4',
  motion: 'section 8 (motion); checklist item 9',
  states: 'sections 9, 10 and 11 (states, data display, forms); checklist items 10, 11, 12',
  a11y: 'section 13 (accessibility checklist); checklist item 14',
  responsive: 'section 12 (responsive and mobile); checklist item 13',
};

export function getDesignReviewPrompt(args: DesignReviewArgs): string {
  const { code, focus = 'all', style, density } = args;

  const context = [
    `FOCUS: ${focus}`,
    style ? `INTENDED STYLE: ${style}` : null,
    density ? `INTENDED DENSITY: ${density}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const styleRule = style
    ? `\n- Verify the code follows the "${style}" recipe in section 7 of the guide (preset, surfaces, typography, motion).`
    : '';
  const densityRule = density
    ? `\n- Verify spacing and control sizes match the "${density}" column of the density table in section 3.`
    : '';

  return `You are reviewing a user interface built with @e-burgos/tucu-ui against its design guide.

${context}

STEP 1: Read the resource \`tucu://design-guide\` completely. It is the only source of design rules for this review. Use \`tucu://tokens\`, \`tucu://theme\` and \`tucu://catalog\` when you need exact tokens, presets or props.

STEP 2: Review the UI below against ${focusSections[focus]}.${styleRule}${densityRule}

UI TO REVIEW (code or description):
\`\`\`tsx
${code}
\`\`\`

STEP 3: Evaluate each checklist item of the guide (section 15) that falls in the focus. Report only real problems and cite evidence from the code. Use only tucu-ui components, props and tokens that exist; if a prop or variant is not in the guide or the catalog, verify it with \`get_props\` before recommending it. Never invent APIs and never recommend hard-coded colors, \`!important\` or inline styles in place of a token or a prop.

OUTPUT FORMAT:

1. A table of findings, ordered by severity, with exactly these columns:

| Severity | Guide section | Problem | Fix |
| --- | --- | --- | --- |
| blocker / major / minor | e.g. "9 States" | what is wrong and where in the code | a concrete change using tucu-ui components, props or tokens, with a short code snippet when it helps |

Severity scale:
- blocker: breaks usability, accessibility or the intended style (missing labels, no keyboard access, invented props that crash, contrast failure, no error or empty state on a data view).
- major: clearly violates the guide and degrades quality (several primary buttons, hard-coded colors, wrong density mix, animating layout, tables that scroll sideways on phones).
- minor: polish and consistency (spacing step drift, wording, redundant surfaces).

2. A short, prioritized patch plan: numbered steps, blockers first, each naming the component or file to change. Maximum 8 steps.

3. One line: "Verdict: ready / ready after patches / needs rework".

If the code has no problems in the focus area, say so in one sentence instead of inventing findings.`;
}
