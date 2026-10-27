import { generateImportStatement } from './code-generator.js';
import { mapStyle, type DesignParams } from './design-params.js';
import { indentBlock } from './design-params.js';

export type SpecialLayout = 'marketing' | 'auth';

export interface LayoutReference {
  component: string;
  example: string;
}

export const SPECIAL_LAYOUTS: Record<SpecialLayout, LayoutReference> = {
  marketing: {
    component: 'MarketingLayout',
    example: `import { MarketingLayout } from '@e-burgos/tucu-ui';

<MarketingLayout nav={{ logo, links, actions }} footer={{ groups, legal }}>
  {children}
</MarketingLayout>`,
  },
  auth: {
    component: 'SplitAuthLayout',
    example: `import { SignInForm, SplitAuthLayout } from '@e-burgos/tucu-ui';

<SplitAuthLayout brand={{ name, headline, highlights }} title="Sign in">
  <SignInForm forgetPasswordPath="/forgot-password" />
</SplitAuthLayout>`,
  },
};

export function isSpecialLayout(layout: string): layout is SpecialLayout {
  return layout === 'marketing' || layout === 'auth';
}

export interface SpecialLayoutPage {
  root: string;
  importNames: string[];
  warnings: string[];
}

export function buildMarketingRoot(
  sectionCode: string[],
  extraImports: string[]
): SpecialLayoutPage {
  const sections = indentBlock(sectionCode.join('\n\n'));
  const root = `<MarketingLayout
  nav={{
    logo: <span className="text-lg font-semibold">Brand</span>,
    links: [
      { label: 'Product', href: '/product' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Docs', href: '/docs' },
    ],
    actions: <Button variant="solid" size="small">Get started</Button>,
  }}
  footer={{
    logo: <span className="text-lg font-semibold">Brand</span>,
    description: 'Short product description.',
    groups: [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '/features' },
          { label: 'Pricing', href: '/pricing' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    legal: '© Your Company',
  }}
>
  <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12">
${sections}
  </div>
</MarketingLayout>`;
  return {
    root,
    importNames: ['MarketingLayout', 'Button', ...extraImports],
    warnings: [],
  };
}

export function buildAuthRoot(
  hadSections: boolean,
  design: DesignParams
): SpecialLayoutPage {
  const surface = design.style
    ? `\n  surface="${mapStyle(design.style).surface}"`
    : '';
  const root = `<SplitAuthLayout
  brand={{
    name: 'Brand',
    headline: 'A headline that explains the product',
    lead: 'One supporting sentence about the value.',
    highlights: [
      { text: 'First selling point' },
      { text: 'Second selling point' },
      { text: 'Third selling point' },
    ],
    footer: '© Your Company',
  }}
  title="Sign in"
  subtitle="Welcome back"${surface}
>
  <SignInForm
    forgetPasswordPath="/forgot-password"
    onSubmit={(data) => console.log(data)}
  />
</SplitAuthLayout>`;
  return {
    root,
    importNames: ['SignInForm', 'SplitAuthLayout'],
    warnings: hadSections
      ? ['The auth layout ignores "sections"; it renders SplitAuthLayout with SignInForm only.']
      : [],
  };
}

export function buildPageModule(
  pageName: string,
  root: string,
  importNames: string[],
  moduleImports: string[]
): { code: string; importLine: string } {
  const importLine = generateImportStatement(
    [...new Set(importNames)],
    '@e-burgos/tucu-ui'
  );
  const header = [importLine, ...moduleImports].join('\n');
  const code = `${header}

export function ${pageName}() {
  return (
${indentBlock(root, 4)}
  );
}`;
  return { code, importLine };
}
