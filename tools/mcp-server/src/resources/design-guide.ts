// ─── Resource: Design Guide ──────────────────────────────────────────────────

export function getDesignGuideContent(): string {
  return `# tucu-ui Design Guide

How to compose interfaces with \`@e-burgos/tucu-ui\` (3.9) that look intentional instead of generated. Written for AI agents and developers: every component, prop and token below exists in the library. For the full API of a component read \`tucu://catalog\`; for tokens and presets read \`tucu://tokens\` and \`tucu://theme\`; for CSS hooks read \`tucu://styling-overrides\`.

How to use this guide:

1. Decide the **style** (\`clean\`, \`glass\`, \`bold\`, \`editorial\`), the **density** (\`compact\`, \`comfortable\`, \`spacious\`) and the **motion** level (\`none\`, \`subtle\`, \`expressive\`) once per product, before writing markup.
2. Compose from library components and tokens. Do not restyle them with ad-hoc CSS.
3. Run the **Review checklist** at the end before delivering.

## 1. Principles

- **Hierarchy before decoration.** Every view has one thing the user came for. Make it the largest, highest-contrast element; everything else is quieter. If two elements compete, demote one.
- **One primary action per view.** One \`Button\` with the default \`solid\` + \`primary\`; every other action is \`variant="outline"\`, \`variant="ghost"\` or \`variant="transparent"\`. Destructive actions use \`color="danger"\` and go through \`ConfirmDialog\`.
- **Restraint.** One accent color (the preset accent / \`brand\`), neutral surfaces, semantic state colors only for state. Three type sizes in a card is already a lot.
- **Content first.** Real, specific copy and realistic data. Surfaces, borders and shadows exist to group content, not to fill space.
- **Consistency over novelty.** Same spacing step, same radius, same density everywhere in a view. Variation signals meaning; if it does not mean anything, remove it.
- **Tokens, not literals.** Colors, radii, fonts, shadows and motion come from presets and \`--tucu-*\` variables so ThemeScope, presets and dark mode keep working.
- **States are part of the design.** Loading, empty, error, disabled and long-text states are designed up front, not patched later.

## 2. Layout and composition

### Choosing a layout

| Product surface | Layout | Notes |
| --- | --- | --- |
| Authenticated app, many sections | \`AdminLayout\` (\`LAYOUT_OPTIONS.ADMIN\`) | Pinnable \`ExpandableSidebar\`, header, scrolling content area. Takes \`isOpen\` / \`setIsOpen\` for the mobile drawer |
| Focused tool, few sections | clean layout (\`LAYOUT_OPTIONS.CLEAN\`) | Header only, no sidebar; content stays centered and narrow |
| Public site, landing, pricing, docs | \`MarketingLayout\` | Skip link, \`MarketingNav\` (mobile menu below 768px), \`<main>\`, \`MarketingFooter\` |
| Sign in, sign up, reset password | \`SplitAuthLayout\` | Brand column + form column; \`variant="centered"\` for a single card. The \`title\` is the page \`<h1>\` |
| Detail with several sections inside a dialog | \`SplitModal\` | Sidebar navigation + scrollable body; the sidebar becomes a tab bar below \`md\` |
| Multi-step flow in a dialog | \`SplitModalWizard\` | Steps with progress; keep each step to one decision |
| Simple confirmation or small form | \`Modal\` / \`ConfirmDialog\` | \`size\` sm to full |
| Grouped content block | \`Card\` | Default surface for any titled group |
| Translucent block over imagery or a gradient | \`GlassPanel\` | Only when something visible sits behind it (see section 7) |

Pick the layout from the table; do not rebuild a shell with \`div\`s. Inside an app shell the layout owns the scroll container; do not add a second full-height scroller.

\`\`\`tsx
import { MarketingLayout, Button } from '@e-burgos/tucu-ui';

<MarketingLayout
  nav={{
    logo: <span className="font-semibold">Acme</span>,
    links: [
      { label: 'Product', href: '/product' },
      { label: 'Pricing', href: '/pricing' },
    ],
    actions: <Button size="small">Get started</Button>,
    transparentUntilScroll: true,
  }}
  footer={{ logo: <span className="font-semibold">Acme</span>, groups: [] }}
>
  {sections}
</MarketingLayout>
\`\`\`

### Width, grid and rhythm

- **Reading width:** prose and forms stay between \`max-w-prose\` (65ch) and \`max-w-2xl\`. Never let a paragraph span a 1440px screen.
- **Page width:** dashboards use the full content area; marketing sections use \`max-w-6xl\` or \`max-w-7xl\` centered (\`MarketingNav\` and \`MarketingFooter\` accept \`maxWidth\` from \`3xl\` to \`7xl\` or \`full\` so the chrome aligns with the content).
- **Grid:** a 12-column mental model, expressed with Tailwind grids. KPI row: \`grid gap-4 sm:grid-cols-2 xl:grid-cols-4\`. Main + aside: \`grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]\`. Always add \`minmax(0, 1fr)\` or \`min-w-0\` to the flexible column so tables and long text do not overflow.
- **Section rhythm:** pick a step and stay on it. Page sections \`space-y-8\`; blocks inside a section \`space-y-4\`; label to field \`gap-1.5\`; icon to text \`gap-2\`. Marketing sections use \`py-16 md:py-24\`. Do not mix \`gap-3\`, \`gap-5\` and \`gap-7\` in one view.
- **Align to the grid:** left edges of titles, cards and tables line up. Avoid nested cards inside cards; separate with \`Divider\` or spacing instead.

\`\`\`tsx
<div className="space-y-8">
  <header className="flex flex-wrap items-end justify-between gap-4">
    <div className="space-y-1">
      <Typography tag="h1">Invoices</Typography>
      <Typography tag="p" color="muted">Everything billed this quarter.</Typography>
    </div>
    <Button>New invoice</Button>
  </header>
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{kpis}</div>
  <Card title="Recent invoices">{table}</Card>
</div>
\`\`\`

## 3. Spacing scale and density

Density is a product-level decision. The generation tools accept \`density: compact | comfortable | spacious\`; this is how each value maps to real props.

| Concern | \`compact\` | \`comfortable\` (default feel) | \`spacious\` |
| --- | --- | --- | --- |
| \`Card\` \`density\` (\`compact\` \\| \`default\` \\| \`comfortable\`) | \`compact\` (\`p-3\`) | \`default\` (\`p-4\`) | \`comfortable\` (\`p-6\`) |
| \`BasicTable\` \`density\` (\`compact\` \\| \`snug\` \\| \`default\`) | \`compact\` | \`snug\` | \`default\` |
| \`Alert\` \`density\` (\`default\` \\| \`compact\`) | \`compact\` | \`default\` | \`default\` |
| \`Button\` \`size\` | \`small\` or \`mini\` | \`medium\` | \`large\` |
| \`Input\` / \`Select\` \`size\` (\`xs\` \\| \`sm\` \\| \`md\` \\| \`lg\`) | \`xs\` or \`sm\` | \`md\` | \`lg\` |
| Stack gaps | \`gap-2\`, \`space-y-4\` | \`gap-4\`, \`space-y-6\` | \`gap-6\`, \`space-y-10\` |
| Page padding | \`p-4\` | \`p-6\` | \`p-8\` or \`p-10\` |
| \`DataTable\` on phones | \`mobileCards\` on | \`mobileCards\` on | \`mobileCards\` on |

Notes:

- \`Card\` density names do not mirror the product density: \`default\` is the middle step and \`comfortable\` is the roomiest.
- \`BasicTable\` spacing flows through tokens, so tune a table without forking it: \`--tucu-table-cell-px\`, \`--tucu-table-cell-py\`, \`--tucu-table-font-size\`, \`--tucu-table-header-font-size\` (each has a per-density \`-default\`). Hover color: \`--tucu-table-row-hover\`.
- Dense is for expert tools (ops consoles, data grids, admin lists). Spacious is for marketing, onboarding and consumer flows. Do not make a first-run experience compact.
- Tap targets stay at least 44px on touch regardless of density (section 12). Use \`compact\` controls inside toolbars on desktop, not on touch-first screens.
- Keep one density per screen. A compact table inside a spacious card reads as an error.

\`\`\`tsx
<Card title="Payments" density="compact">
  <BasicTable density="compact" columns={columns} data={rows} />
</Card>
\`\`\`

## 4. Typography

- **Hierarchy:** one \`h1\` per page, then \`h2\` for sections and \`h3\` for blocks. Use \`Typography\` with \`tag="h1"\` ... \`tag="h6"\` (classes \`tucu-text-h1\` to \`tucu-text-h6\`); do not pick a heading tag for its size, pick the size with a class and the tag for the outline.
- **Roles:** \`tag="headline"\`, \`"body"\`, \`"label-1"\`, \`"label-2"\`, \`"caption"\` and \`"legal"\` give semantic body styles. \`color\` accepts \`default\`, \`primary\`, \`secondary\`, \`muted\`, \`success\`, \`warning\`, \`error\`, \`dark\`, \`light\`.
- **Scale:** limit a view to 4 or 5 sizes: page title, section title, body, secondary/caption, and (for KPIs) one large figure. Weight does the rest: 400 body, 500 labels, 600 titles.
- **Heading font:** presets can set a heading family (\`headingFontFamily\`), exposed as \`--tucu-heading-font\` and applied to \`h1\` to \`h3\` when \`data-tucu-heading-font\` is present. The body font is \`--tucu-font\`. Pair at most two families. Serif headings (the \`classic\` and \`elegant\` presets) need generous size and tighter tracking, not extra decoration.
- **Numbers:** align figures in tables and KPIs with \`tabular-nums\` (\`font-variant-numeric\`). Format money with \`MoneyText\` (\`value\`, \`currency\`, \`locale\`, \`variant\` total \\| subtotal \\| row, \`tone\` default \\| positive \\| negative \\| auto); never concatenate \`$\` and \`toFixed\`. Right-align numeric columns.
- **Line length:** 45 to 75 characters for paragraphs (\`max-w-prose\`). Body line-height 1.5 to 1.7; headings 1.1 to 1.3.
- **Labels:** sentence case for buttons and headings ("Create invoice"), not Title Case. Truncate with \`truncate\` plus a \`title\`/\`Tooltip\` for the full value, never silently clip.
- **Copy:** buttons are verbs ("Save changes"), not "Submit" or "OK". Empty and error states say what happened and what to do.

\`\`\`tsx
<Typography tag="h2">Revenue</Typography>
<Typography tag="caption" color="muted">Last 30 days</Typography>
<MoneyText value={48200} currency="USD" variant="total" />
\`\`\`

## 5. Color

- **Semantic first.** Use the utilities that follow the theme: \`bg-page\` (canonical page background), \`bg-light-dark\` (card surface), \`text-foreground\`, \`text-muted\`, \`border-border\`, \`bg-brand\` / \`text-brand\` / \`border-brand\` (the accent). Dark mode swaps them for you.
- **State palette.** Status colors come from the \`--tucu-state-<tone>-soft|ink|line\` tokens (tones \`green\`, \`orange\`, \`red\`, \`teal\`, \`purple\`, \`neutral\`). Use \`StateBadge\`, \`FilterPill\`, \`Badge\` with \`tone\`, \`Alert\` / \`InlineNotice\` and \`StatCard\` \`tone\` instead of hand-picked greens and reds. Map meaning consistently: green paid/ok, orange pending, red failed/overdue, teal ready, purple online, neutral archived.
- **Never convey state by color alone.** Pair it with a label, an icon or a dot (\`StateBadge dot\`).
- **Presets.** Built-ins: \`glass\`, \`classic\`, \`elegant\`, \`fresh\`, \`minimal\`, \`vibrant\`. A preset sets \`--tucu-accent\`, \`--tucu-accent-contrast\`, \`--tucu-radius\`, \`--tucu-control-radius\`, fonts and the card treatment (\`glass\`, \`solid\`, \`outlined\`). Apply it to the document with \`<ThemeProvider preset="...">\` or to a subtree with \`<ThemeScope preset="..." mode="auto">\`. Register brand presets with \`defineThemePreset\` / \`registerThemePresets\`; accents must be hex.
- **Dark mode** is a class strategy (\`html.dark\`), not \`prefers-color-scheme\`. Write \`dark:\` utilities only for values that have no token. Test every screen in both modes; check that borders and elevation survive on dark surfaces.
- **Contrast.** Body text 4.5:1, large text and UI boundaries 3:1. The accent on its own surface must pass; use \`--tucu-accent-contrast\` for text on an accent fill. Muted text on glass needs a check against the actual backdrop.
- **Reserved theme names.** Do not define \`--color-page\`, \`--color-foreground\`, \`--color-dark\`, \`--color-light\`, \`--color-light-dark\`, \`--color-success\`, \`--color-warning\`, \`--color-error\`, \`--color-info\`, \`--color-brand\` or \`--color-border\` unless you intend to override the library value. Avoid \`--text-body\`.
- **Budget:** 60 percent neutral surfaces, 30 percent text and borders, 10 percent accent. If the accent fills more than one region per viewport, it stops meaning "act here".
- **Charts** use the library chart wrappers (\`TucuLineChart\`, \`TucuBarChart\`, ...) which are already theme-aware; limit a chart to 5 series and avoid red/green as the only differentiator.

\`\`\`tsx
<ThemeScope preset="classic" mode="auto" className="rounded-2xl">
  <Card title="Account"><Button>Save</Button></Card>
</ThemeScope>
\`\`\`

## 6. Surfaces and elevation

- **Layers:** page (\`bg-page\`) < surface (\`Card\`, \`bg-light-dark\`) < raised (menus, popovers) < overlay (Modal, Drawer). Each step up gets one more cue: a border, a shadow or a lighter fill. Never stack all three on the same element.
- **Card** is the default grouping surface: \`rounded-xl border border-border bg-light-dark\`, with \`title\`, \`description\`, \`icon\`, \`actions\`, \`footer\`, \`density\`, \`bodyClassName\`. Interactive cards (with \`onClick\`) get a brand hover border automatically.
- **Elevation tokens:** \`--tucu-shadow-card\`, \`--tucu-shadow-panel\`, \`--tucu-shadow-float\`. \`GlassPanel\` reads them through \`elevation\` (\`none\` \\| \`card\` \\| \`panel\` \\| \`float\`). Use \`none\` for flat lists, \`card\` for resting content, \`panel\` for sticky toolbars, \`float\` for transient layers.
- **Radius tokens:** \`--tucu-radius-control\`, \`--tucu-radius-card\`, \`--tucu-radius-panel\`; \`GlassPanel\` \`radius\` is \`control\` \\| \`card\` \\| \`panel\`. Nested radii shrink toward the inside (outer minus padding). One radius family per product.
- **When to use glass.** Only when real content or imagery is behind it (hero backgrounds, sticky headers over scrolling content, floating toolbars, modals over a dashboard). On a flat \`bg-page\`, a blurred panel is just a lower-contrast card. Choose the \`material\`:
  - \`thin\` (blur 8px): chips, small controls, badges over images.
  - \`regular\` (blur 16px): cards and stat tiles.
  - \`thick\` (blur 28px): toolbars, navigation, modals; the most legible.
  - \`sub\`: a blur-free sub-surface nested inside another panel.
- **Glass costs:** \`backdrop-filter\` is expensive. Do not nest glass in glass, do not put more than a handful of glass panels in a scrolling list, and keep \`condense\` (a one-time mount animation) for hero panels only.
- **Borders:** 1px \`border-border\`. Prefer a border over a shadow in dense UIs; prefer a shadow over a border on glass.

\`\`\`tsx
<GlassPanel material="regular" radius="card" elevation="card" className="p-6">
  <Typography tag="h3">Balance overview</Typography>
</GlassPanel>
\`\`\`

## 7. Style recipes

The generation tools take \`style: clean | glass | bold | editorial\`. Each maps to a theme preset plus surface rules. Pick one per product and apply it everywhere.

### \`clean\` (preset \`minimal\`)

- Preset \`minimal\`: black/near-black accent, \`radius: none\`, square buttons, \`solid\` cards.
- Surfaces: plain \`Card\` and \`bg-page\`; borders instead of shadows; \`elevation="none"\`.
- Typography: system sans, tight scale, no heading font; weight and spacing build hierarchy.
- Color: neutrals plus a single accent; state colors only on badges and notices.
- Motion: \`none\` or \`subtle\`. Best for admin tools, forms, finance, B2B.

\`\`\`tsx
<ThemeProvider preset="minimal" defaultMode="light">{app}</ThemeProvider>
<Card title="Orders" density="default">{table}</Card>
\`\`\`

### \`glass\` (preset \`glass\`)

- Preset \`glass\`: teal accent, \`radius: md\`, \`glass\` cards, rounded buttons, auto light/dark surface.
- Surfaces: \`GlassPanel\` (\`regular\` for tiles, \`thick\` for navigation and dialogs, \`thin\` for chips) over a gradient, image or \`default-backgrounds\` backdrop. Without a backdrop, fall back to \`clean\`.
- Typography: system sans, medium weights, strong contrast on text (translucent surfaces lower effective contrast).
- Color: soft, low-saturation backdrop; one accent; keep text on \`thick\` material when it must be read at length.
- Motion: \`subtle\`; \`condense\` on one hero panel at most. Best for dashboards with a visual identity, media, crypto and consumer apps.

\`\`\`tsx
<ThemeProvider preset="glass" defaultMode="system">
  <GlassPanel material="thick" elevation="panel" className="p-6">{toolbar}</GlassPanel>
</ThemeProvider>
\`\`\`

### \`bold\` (preset \`vibrant\`)

- Preset \`vibrant\`: violet accent, \`radius: md\`, \`outlined\` cards, rounded buttons.
- Surfaces: outlined cards on a neutral page; the accent is allowed to fill one hero region per view (a banner, a primary \`StatCard tone="brand"\`, the primary button).
- Typography: larger headlines (\`tucu-text-h1\` and above), heavier weight (600 to 700), generous whitespace around the headline.
- Color: saturated accent with high contrast pairing; neutrals stay neutral so the accent reads as energy, not noise.
- Motion: \`subtle\` to \`expressive\` on entry and hover. Best for marketing, onboarding, creative and consumer products.

\`\`\`tsx
<ThemeProvider preset="vibrant">
  <StatCard title="Active users" value="12,480" tone="brand" trend={{ value: '8%', direction: 'up' }} />
</ThemeProvider>
\`\`\`

### \`editorial\` (preset \`classic\`)

- Preset \`classic\`: deep blue accent, \`radius: sm\`, serif heading font (\`--tucu-heading-font\`), \`outlined\` cards, square buttons, light surface.
- Surfaces: flat and ruled; \`Divider\` and generous margins instead of boxes; very restrained shadows.
- Typography: serif headings at large size over sans body, \`max-w-prose\` measure, captions in \`muted\`, pull quotes with \`blockquote\`.
- Color: ink-like neutrals and one deep accent; avoid saturated state colors outside badges.
- Motion: \`none\` or \`subtle\`; no bouncing. Best for content, reports, documentation, legal and finance summaries.

\`\`\`tsx
<ThemeProvider preset="classic" defaultMode="light">
  <article className="mx-auto max-w-prose space-y-6">
    <Typography tag="h1">Quarterly report</Typography>
    <Typography tag="body">Revenue grew in every region...</Typography>
  </article>
</ThemeProvider>
\`\`\`

\`elegant\` (dark, serif, gold) and \`fresh\` (coral, pill) are valid alternatives within \`editorial\` and \`bold\` respectively when the brief asks for them.

## 8. Motion

The generation tools take \`motion: none | subtle | expressive\`.

| Level | Meaning | Use for |
| --- | --- | --- |
| \`none\` | No decorative animation. State changes are instant; only functional feedback (focus ring, spinner) | Dense tools, data entry, anything the user repeats hundreds of times |
| \`subtle\` | 120 to 200ms opacity/translate/color transitions on hover, focus, open/close; one entry fade per page | Default for most apps |
| \`expressive\` | 200 to 400ms springs, staggered list entry, shared-layout indicators; limited to 1 or 2 moments per screen | Marketing, onboarding, delight moments |

Rules:

- **Duration:** micro-interactions (hover, press) 100 to 150ms; small transitions (dropdown, tooltip, tab indicator) 150 to 220ms; large (modal, drawer, page section) 250 to 400ms. Nothing above 500ms.
- **Easing:** \`ease-out\` for things entering, \`ease-in\` for things leaving, a spring (stiffness 400 to 500, damping 35 to 45) for position changes. No linear easing except progress bars and spinners.
- **Animate only \`opacity\` and \`transform\`.** Never animate \`width\`, \`height\`, \`top\`, \`left\` or \`box-shadow\` blur on large elements. Use \`Collapse\` / \`Accordion\` for height.
- **Reduced motion is mandatory.** \`ThemeProvider\` and \`NextThemeProvider\` wrap the app in framer-motion \`MotionConfig reducedMotion="user"\` (since 3.9), which turns transform animations into instant or opacity-only changes when the OS asks for less motion. Custom CSS animations need \`@media (prefers-reduced-motion: reduce)\`; framer-motion's \`useReducedMotion()\` covers imperative cases. \`motion\` = \`none\` must still render a fully usable UI.
- **Built-ins already tuned:**
  - \`AnimatedTabs\` slides its indicator with a spring (stiffness 500, damping 40).
  - \`Lightbox\` fades in 0.22s and uses \`duration: 0\` under reduced motion.
  - \`GlassPanel\` \`condense\` plays a 320ms ease-out scale/blur-in on mount, disabled under reduced motion.
  - \`SegmentedControl\` slides its thumb; \`Modal\` closes immediately and \`SplitModal\` is built on it; do not add extra enter/exit animation around them.
- **Never animate:** text the user is reading, content that updates frequently (live prices, table rows on every poll), layout on every render, anything inside a data table body, keyboard-initiated actions repeated quickly, or an element on every scroll event.
- **Staggering:** only for the first render of a list of up to about 8 items, 30 to 50ms step. Never re-stagger on filter or sort.
- **Loading** uses \`Skeleton\` or \`Spinner\`, not decorative motion.

\`\`\`tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
>
  {content}
</motion.div>
\`\`\`

## 9. States

Every data view has five states: loading, empty, error, partial and success. Design all five.

| Situation | Component | Rule |
| --- | --- | --- |
| Loading a known layout | \`Skeleton\` (\`shape\` text \\| rounded \\| circle, \`width\`, \`height\`, \`count\`, \`animation\` shimmer \\| pulse \\| wave \\| none) | Mirror the final layout so nothing jumps. \`StatCard\` has \`loading\` |
| Short wait on a user action | \`Button isLoading\` / \`Spinner\` | Disable the trigger, keep its label width |
| Blocking an area | \`LoadingOverlay\` | Rare; prefer skeletons |
| Nothing to show yet | \`EmptyState\` (\`title\`, \`description\`, \`icon\`, \`action\`, \`size\`, \`variant\` plain \\| card) | Say why it is empty and offer the next action |
| Request failed | \`ErrorState\` (\`description\`, \`error\`, \`onRetry\`, \`retryLabel\`) | Always provide retry; keep the technical \`error\` inside the disclosure |
| Whole-page 404 / 500 / maintenance | \`SystemStatePage\` (\`code\`, \`title\`, \`description\`, \`action\`, \`tone\`) | One clear way back |
| Message tied to a form or panel | \`InlineNotice\` (\`tone\`, \`messages\`) | Next to what it describes |
| Message for the page or section | \`Alert\` (\`variant\`, \`title\`, \`appearance\` soft \\| ink \\| line, \`density\`, \`live\`) | Persistent until fixed or dismissed |
| Result of an action | \`showToast(message, { variant, title, timeout })\` | Transient, non-blocking, confirms success; never the only place an error appears |
| Irreversible or costly action | \`ConfirmDialog\` (\`tone="danger"\`, \`title\`, \`description\`, \`confirmLabel\`, \`loading\`) | State what will be lost; label the button with the verb |

Rules:

- Empty is not an error and error is not empty; never reuse one for the other.
- Do not use \`Modal\` for information that can be an \`Alert\`, \`InlineNotice\` or \`Toast\`.
- Use \`live="polite"\` on \`Alert\` for non-urgent updates; errors keep the default assertive \`role="alert"\`.
- Disabled controls need a reason when it is not obvious (\`Tooltip\` or helper text).
- Optimistic UI: update immediately, roll back with a \`Toast\` on failure.

\`\`\`tsx
if (isLoading) return <Skeleton shape="rounded" height="12rem" />;
if (error) return <ErrorState description="We could not load invoices." error={error} onRetry={refetch} />;
if (!rows.length) {
  return (
    <EmptyState
      title="No invoices yet"
      description="Create your first invoice to see it here."
      action={<Button onClick={create}>New invoice</Button>}
    />
  );
}
\`\`\`

\`\`\`tsx
<ConfirmDialog
  isOpen={open}
  tone="danger"
  title="Delete invoice?"
  description="This action cannot be undone."
  confirmLabel="Delete"
  loading={deleting}
  onConfirm={remove}
  onCancel={() => setOpen(false)}
/>
\`\`\`

## 10. Data display

- **Table or cards?** Tables for comparing many records across the same columns (3+ columns, scanning, sorting). Cards for heterogeneous items, media, or when each record needs several actions. \`BasicTable\` and \`DataTable\` collapse to stacked cards on phones (\`mobileCards\`, default on for \`BasicTable\`, breakpoint \`cardBreakpoint\` sm \\| md \\| lg).
- **BasicTable vs DataTable:** \`BasicTable\` for small, static lists (declarative \`columns\` with \`key\`, \`label\`, \`render\`). \`DataTable\` (read \`tucu://datatable\`) for sorting, filtering, server pagination, selection and persistence. Give every \`DataTable\` column an explicit \`id\`.
- **Columns:** left-align text, right-align numbers, put the identifying column first, and the row actions last. Show at most 7 columns by default and offer column visibility for more. Dates in one format.
- **KPIs:** \`StatCard\` with a \`title\`, a \`value\` (use \`MoneyText\` for money), a \`trend\` (\`direction\` up \\| down \\| flat, \`positiveIsGood={false}\` for metrics like churn), and \`tone\` for meaning. Max 4 per row on desktop; do not put charts inside the KPI row.
- **Status:** \`StateBadge\` (\`tone\`, \`dot\`, \`struck\`) for entity state in tables and lists; keep to the six tones and a consistent mapping.
- **Filtering:** \`FilterBar\` (\`search\`, \`filters\`, \`pills\`, \`toggle\`, \`onClear\`, \`collapsible\`) above the list; \`FilterPill\` (\`active\`, \`count\`, \`tone\`) for 3 to 6 quick filters. Always show the active-filter count and a clear action.
- **Switching views, three different tools:**
  - \`SegmentedControl\` (\`options\`, \`value\`, \`onChange\`, \`size\`): change *how the same data is shown* or a small mode (list/grid, day/week/month). 2 to 5 short options.
  - \`AnimatedTabs\` (\`tabs\`, \`activeTab\`, \`onChange\`, \`queryParamKey\`): switch between *sections of a page*, one visible at a time; supports URL sync.
  - \`TabGroup\` (\`TabList\`, \`TabItem\`, \`TabPanels\`, \`TabPanel\`): accessible compound tabs when you need full control of panels.
  Do not use tabs for actions or for filters.
- **Charts:** one message per chart, title states the takeaway, axes labeled, no 3D, no decorative gradients; tooltips with units.

\`\`\`tsx
<FilterBar
  search={{ value: query, onChange: setQuery, placeholder: 'Search orders' }}
  pills={
    <FilterPill active={status === 'pending'} count={4} tone="orange" onClick={() => setStatus('pending')}>
      Pending
    </FilterPill>
  }
  onClear={reset}
  collapsible
/>
<BasicTable
  density="snug"
  columns={[
    { key: 'customer', label: 'Customer' },
    { key: 'status', label: 'Status', render: () => <StateBadge tone="green">Paid</StateBadge> },
    { key: 'total', label: 'Total', render: (value) => <MoneyText value={Number(value)} currency="USD" variant="row" /> },
  ]}
  data={orders}
/>
\`\`\`

## 11. Forms

- **Labels:** every field has a visible label (\`label\` prop). Placeholder text is an example, never the label. Required fields are marked once, consistently.
- **Helper and error:** \`Input\` takes \`label\`, \`helperText\` and \`error\`; error text is linked with \`aria-describedby\` and replaces the helper while shown. Write errors as what to do ("Enter an email like name@company.com"), not what went wrong.
- **Validation timing:** validate on blur and on submit, not on every keystroke; clear an error as soon as the value becomes valid. Use \`Form\` + \`FormField\` with a \`validationSchema\` for multi-field forms (read \`tucu://forms\`).
- **Select:** \`options\` are \`{ name, value }\` (optionally \`description\`, \`icon\`, \`disabled\`, \`group\`). Use \`Select\` for 5+ options, \`RadioGroup\` for 2 to 4 visible choices, \`Checkbox\` / \`Switch\` for booleans (\`Switch\` applies immediately; \`Checkbox\` waits for submit). \`native\` renders a real \`<select>\`, best on phones.
- **Layout:** one column by default; two columns only for short, related fields (first/last name, city/postal code). Group with headings or \`Card\`, not with boxes around every field. Put actions at the end: primary on the right (or full width on mobile), secondary \`ghost\` next to it.
- **Density:** \`Input\`, \`Select\` and \`Textarea\` take \`size\` (\`sm\`, \`md\`, \`lg\`; \`Input\` and \`Select\` also \`xs\`). Keep one size per form.
- **Submit feedback:** \`Button isLoading\` while pending; on success a \`Toast\` or inline \`InlineNotice tone="success"\`; on failure an \`Alert\`/\`InlineNotice\` at the top plus field errors.
- **Autocomplete and type:** use \`type="email"\`, \`inputMode\`, \`autoComplete\` so mobile keyboards and password managers help.
- **Masks:** use the built-in \`mask\` (\`phone\`, \`currency\`, \`number\`, ...) rather than custom formatting.

\`\`\`tsx
<form className="space-y-4" onSubmit={onSubmit}>
  <Input label="Email" type="email" helperText="We send the receipt here." error={errors.email} />
  <Select label="Plan" options={[{ name: 'Monthly', value: 'monthly' }, { name: 'Yearly', value: 'yearly' }]} selectedOption={plan} onChange={setPlan} />
  <div className="flex justify-end gap-2">
    <Button variant="ghost" color="gray">Cancel</Button>
    <Button type="submit" isLoading={saving}>Save changes</Button>
  </div>
</form>
\`\`\`

## 12. Responsive and mobile

- **Mobile first.** Write the base styles for 360px, then add \`sm:\` (640), \`md:\` (768), \`lg:\` (1024), \`xl:\` (1280), \`2xl:\` (1536). Test at 360, 768 and 1280.
- **Library breakpoints:** \`MarketingNav\` shows its mobile menu below 768px (focus trap, Escape, scroll lock; put always-visible actions in \`mobileActions\`). \`SplitAuthLayout\` shows the brand column from \`breakpoint\` \`md\` \\| \`lg\`. \`SplitModal\` turns its sidebar into a tab bar below \`md\`. \`AnimatedTabs\` collapses with \`mobile="select"\` or \`"scroll"\`. \`FilterBar\` collapses secondary filters with \`collapsible\`. Tables become cards below \`cardBreakpoint\`.
- **Touch targets:** at least 44 by 44px with 8px between targets. On phones \`Button size="large"\` (h-11, 44px) and \`Input\` / \`Select\` \`size="lg"\` (h-12) meet it; \`medium\` is 40px and \`mini\`, \`tiny\`, \`xs\` are smaller, so reserve those for desktop toolbars or pad the hit area.
- **Reflow:** no horizontal page scroll at 360px. Wrap button groups (\`flex-wrap\`), stack two-column grids (\`grid-cols-1 md:grid-cols-2\`), let tables fall back to cards instead of scrolling sideways.
- **Priority:** on small screens show the primary action and the key figure first; move secondary actions into a menu (\`ListContainer\`) or a \`Drawer\`.
- **Inputs:** 16px minimum font size to prevent iOS zoom; use \`native\` selects; avoid hover-only affordances and tooltips as the only way to read information.
- **Images:** \`Image\` / \`SafeImage\` with \`aspectRatio\` and \`alt\` to avoid layout shift; give hero media a fixed aspect ratio.
- **Safe areas and viewport:** prefer \`min-h-dvh\` to \`h-screen\`; respect \`env(safe-area-inset-*)\` for fixed bars.

## 13. Accessibility checklist

- Every interactive element has an accessible name; icon-only buttons need \`aria-label\` (and optionally \`tooltip\`).
- Form fields have labels; errors are associated (\`aria-describedby\`); required state is announced.
- Heading order is logical: one \`h1\`, no skipped levels; landmarks exist (\`main\`, \`nav\`, \`footer\`; \`MarketingLayout\` provides them with a skip link).
- Color contrast: 4.5:1 text, 3:1 large text and boundaries, in light and dark and over glass.
- State is never color-only; add text, icons or dots.
- Everything works with the keyboard: visible focus ring (never \`outline-none\` without a replacement), logical tab order, Escape closes \`Modal\`, \`SplitModal\`, \`ConfirmDialog\` and \`Lightbox\`; arrow keys in tabs, \`SegmentedControl\`, \`SplitModal\` navigation.
- Dialogs trap focus, restore it on close and are labelled (\`ConfirmDialog\` is an \`alertdialog\` with title and description).
- Dynamic updates are announced: \`Alert\` is \`role="alert"\` (or \`live="polite"\`), \`EmptyState\` is \`role="status"\`, \`ErrorState\` is \`role="alert"\`, toasts are polite.
- Images have meaningful \`alt\` (empty \`alt=""\` when decorative).
- Motion respects \`prefers-reduced-motion\`; nothing flashes more than 3 times per second; auto-dismissing toasts pause on hover and focus.
- Touch targets are at least 44px; text can be zoomed to 200 percent without loss.
- Language is set (\`ThemeProvider lang\`), and built-in strings are localized instead of hard-coded.

## 14. Anti-patterns

| Anti-pattern | Do instead |
| --- | --- |
| Overriding library styles with \`!important\` or deep selectors | Use \`className\` (merged last with \`cn\`), props, presets, or the documented \`--tucu-*\` tokens and \`data-tucu\` hooks (\`tucu://styling-overrides\`) |
| Hard-coded colors (\`#3b82f6\`, \`bg-blue-500\`) for brand or state | \`bg-brand\`, \`text-brand\`, \`StateBadge\`, \`Alert variant\`, \`--tucu-state-*\` |
| Several \`solid\` primary buttons in one view | One primary; the rest \`outline\`, \`ghost\` or \`transparent\` |
| Invented variants (\`variant="primary"\`, \`size="lg"\` on Button, \`variant="destructive"\` on Alert) | Real values: Button \`variant\` solid \\| outline \\| ghost \\| transparent, \`color\` primary \\| white \\| gray \\| success \\| info \\| warning \\| danger, \`size\` large \\| medium \\| small \\| mini \\| tiny \\| xs |
| A \`Modal\` for non-blocking info or a one-line confirmation of success | \`Toast\`, \`InlineNotice\` or \`Alert\` |
| \`ConfirmDialog\` missing before delete, or a \`window.confirm\` | \`ConfirmDialog tone="danger"\` with a verb on the button |
| Cards inside cards inside cards | One surface level per group; use \`Divider\` and spacing |
| Glass over a flat background, or glass in glass | \`Card\`, or add a real backdrop |
| Animating layout (\`height\`, \`width\`, \`top\`) or every row on every render | Animate \`opacity\`/\`transform\` once; use \`Collapse\` for height |
| Using a heading tag for size (\`h3\` as a big label) | Correct outline plus \`tucu-text-*\` classes |
| Placeholder as label | \`label\` prop |
| Spinner for content with a known shape | \`Skeleton\` mirroring the layout |
| An empty list rendered as a blank area, or an error shown as an empty state | \`EmptyState\` / \`ErrorState\` with an action |
| Money formatted by hand | \`MoneyText\` |
| Tabs used as filters or actions, SegmentedControl used for page sections | \`FilterPill\`/\`FilterBar\` for filters; \`AnimatedTabs\` for sections; \`SegmentedControl\` for view modes |
| Tables that scroll sideways on phones | \`mobileCards\` (default) or a card list |
| Text smaller than 12px for content, or low-contrast gray on white | \`Typography\` \`caption\` at minimum, \`color="muted"\` only when contrast holds |
| Mixing densities, radii and gaps within one view | Pick one step and reuse it |
| Defining reserved theme names (\`--color-brand\`, \`--color-page\`, ...) by accident | Own tokens with your own prefix |
| Reaching into \`document.body\` for portals inside themed regions | Components already mount overlays in the \`ThemeScope\` portal host (\`usePortalContainer()\`) |
| Per-page ad-hoc theming | One preset at the provider, \`ThemeScope\` only for deliberate sub-brands |

## 15. Review checklist

The \`design-review\` prompt reviews code against exactly these items. Mark each as pass, fail or not applicable.

1. **Hierarchy:** one clear focal element per view; one \`h1\`; heading levels in order.
2. **Primary action:** exactly one primary button; secondary actions are \`outline\`/\`ghost\`; destructive actions use \`ConfirmDialog\`.
3. **Layout:** correct layout component for the surface; reading width capped; grid reflows at 360px; \`min-w-0\` on flexible columns.
4. **Spacing and density:** a single scale and a single density; props from section 3 used instead of ad-hoc padding.
5. **Typography:** at most 5 sizes, two font families, \`MoneyText\` and \`tabular-nums\` for figures, line length under 75 characters.
6. **Color:** tokens and semantic utilities only; state via \`StateBadge\` / \`Alert\` / \`tone\`; accent used sparingly; works in dark mode.
7. **Surfaces:** one elevation cue per layer; glass only over real backdrops; no nested cards; radius consistent.
8. **Style fidelity:** the chosen \`clean\` / \`glass\` / \`bold\` / \`editorial\` recipe is applied consistently (preset, surfaces, headings).
9. **Motion:** level matches the product; only \`opacity\`/\`transform\`; reduced motion respected; nothing animates reading content or live data.
10. **States:** loading (\`Skeleton\`), empty (\`EmptyState\`), error (\`ErrorState\` with retry), success feedback and disabled reasons exist.
11. **Data display:** table vs card choice justified; numbers right-aligned; status badges consistent; filters show count and clear.
12. **Forms:** visible labels, helper and error text, correct control per option count, one density, loading submit.
13. **Responsive:** mobile menu, \`mobileCards\` or card fallback, 44px targets, no horizontal scroll.
14. **Accessibility:** names, labels, focus, keyboard, contrast, announcements, alt text (section 13).
15. **Anti-patterns:** none of section 14 present; no invented props or variants; no \`!important\`; no hard-coded colors.
`;
}
