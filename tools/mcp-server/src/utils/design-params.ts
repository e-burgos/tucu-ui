import { z } from 'zod';

export type StyleName = 'clean' | 'glass' | 'bold' | 'editorial';
export type MotionName = 'none' | 'subtle' | 'expressive';
export type DensityName = 'compact' | 'comfortable' | 'spacious';

export const styleSchema = z
  .enum(['clean', 'glass', 'bold', 'editorial'])
  .optional()
  .describe(
    'Visual style. clean = "minimal" preset with solid surfaces; glass = "glass" preset with GlassPanel surfaces; bold = "vibrant" preset; editorial = "classic" preset (serif headings). Wraps the output in <ThemeScope preset="...">. Omit to keep the default output.'
  );

export const motionSchema = z
  .enum(['none', 'subtle', 'expressive'])
  .optional()
  .describe(
    'Motion level. none = <MotionConfig reducedMotion="always">; subtle = library default (follows prefers-reduced-motion); expressive = <MotionConfig> with a spring default transition. Omit to keep the default output.'
  );

export const densitySchema = z
  .enum(['compact', 'comfortable', 'spacious'])
  .optional()
  .describe(
    'Density. Sets Card/BasicTable/Alert "density" and Button/Input/Select "size" on supported components without overriding props you pass. Omit to keep the default output.'
  );

export interface DesignParams {
  style?: StyleName;
  motion?: MotionName;
  density?: DensityName;
}

export interface DesignReport extends DesignParams {
  applied: string[];
}

export type StyleSurface = 'plain' | 'glass' | 'solid';

export interface StyleMapping {
  preset: 'minimal' | 'glass' | 'vibrant' | 'classic';
  surface: StyleSurface;
  notes: string[];
}

const STYLE_MAPPINGS: Record<StyleName, StyleMapping> = {
  clean: {
    preset: 'minimal',
    surface: 'solid',
    notes: ['Square corners, solid cards, near-black accent.'],
  },
  glass: {
    preset: 'glass',
    surface: 'glass',
    notes: [
      'Cards render as glass through the preset; hero areas use GlassPanel.',
    ],
  },
  bold: {
    preset: 'vibrant',
    surface: 'solid',
    notes: ['Saturated violet accent with outlined cards.'],
  },
  editorial: {
    preset: 'classic',
    surface: 'plain',
    notes: ['Serif heading font, outlined cards, square buttons.'],
  },
};

export function mapStyle(style: StyleName): StyleMapping {
  return STYLE_MAPPINGS[style];
}

type ComponentProps = Record<string, string>;

const DENSITY_PROPS: Record<DensityName, Record<string, ComponentProps>> = {
  compact: {
    Card: { density: 'compact' },
    BasicTable: { density: 'compact' },
    Alert: { density: 'compact' },
    Button: { size: 'small' },
    Input: { size: 'sm' },
    Select: { size: 'sm' },
  },
  comfortable: {
    Card: { density: 'default' },
    BasicTable: { density: 'default' },
    Alert: { density: 'default' },
    Button: { size: 'medium' },
    Input: { size: 'md' },
    Select: { size: 'md' },
  },
  spacious: {
    Card: { density: 'comfortable' },
    BasicTable: { density: 'default' },
    Alert: { density: 'default' },
    Button: { size: 'large' },
    Input: { size: 'lg' },
    Select: { size: 'lg' },
  },
};

export function mapDensity(
  density: DensityName,
  component: string
): ComponentProps {
  return DENSITY_PROPS[density][component] ?? {};
}

export interface DensityApplication {
  props: ComponentProps;
  applied: string[];
}

export function applyDensityToProps(
  component: string,
  explicit: ComponentProps | undefined,
  density: DensityName | undefined
): DensityApplication {
  const props = { ...explicit };
  const applied: string[] = [];
  if (!density) return { props, applied };
  for (const [key, value] of Object.entries(mapDensity(density, component))) {
    if (key in props) continue;
    props[key] = value;
    applied.push(`density:${density} -> ${component} ${key}="${value}"`);
  }
  return { props, applied };
}

export interface MotionMapping {
  configProps: string | null;
  description: string;
}

const MOTION_MAPPINGS: Record<MotionName, MotionMapping> = {
  none: {
    configProps: 'reducedMotion="always"',
    description: 'MotionConfig reducedMotion="always"',
  },
  subtle: {
    configProps: null,
    description: 'library default (MotionConfig reducedMotion="user")',
  },
  expressive: {
    configProps: "transition={{ type: 'spring', stiffness: 260, damping: 24 }}",
    description: 'MotionConfig spring default transition',
  },
};

export function mapMotion(motion: MotionName): MotionMapping {
  return MOTION_MAPPINGS[motion];
}

export function hasDesignParams(params: DesignParams): boolean {
  return Boolean(params.style || params.motion || params.density);
}

export function indentBlock(code: string, spaces = 2): string {
  const pad = ' '.repeat(spaces);
  return code
    .split('\n')
    .map((line) => (line ? pad + line : line))
    .join('\n');
}

function wrapElement(open: string, name: string, inner: string): string {
  return `<${open}>\n${indentBlock(inner)}\n</${name}>`;
}

export interface DesignWrapping {
  jsx: string;
  namedImports: string[];
  moduleImports: string[];
  applied: string[];
}

export function wrapWithDesign(
  jsx: string,
  params: DesignParams
): DesignWrapping {
  const namedImports: string[] = [];
  const moduleImports: string[] = [];
  const applied: string[] = [];
  let wrapped = jsx;

  if (params.style) {
    const { preset } = mapStyle(params.style);
    wrapped = wrapElement(`ThemeScope preset="${preset}"`, 'ThemeScope', wrapped);
    namedImports.push('ThemeScope');
    applied.push(`style:${params.style} -> ThemeScope preset="${preset}"`);
  }

  if (params.motion) {
    const { configProps, description } = mapMotion(params.motion);
    if (configProps) {
      wrapped = wrapElement(`MotionConfig ${configProps}`, 'MotionConfig', wrapped);
      moduleImports.push("import { MotionConfig } from 'framer-motion';");
    }
    applied.push(`motion:${params.motion} -> ${description}`);
  }

  return { jsx: wrapped, namedImports, moduleImports, applied };
}

export function buildDesignReport(
  params: DesignParams,
  applied: string[]
): DesignReport {
  return {
    ...(params.style ? { style: params.style } : {}),
    ...(params.motion ? { motion: params.motion } : {}),
    ...(params.density ? { density: params.density } : {}),
    applied,
  };
}

export interface SectionDesign {
  code: string;
  applied: string[];
  extraImports: string[];
}

function replaceTracked(
  code: string,
  pattern: RegExp,
  replacement: string,
  label: string,
  applied: string[]
): string {
  const next = code.replace(pattern, replacement);
  if (next !== code) applied.push(label);
  return next;
}

export function applyDesignToSection(
  code: string,
  sectionType: string,
  params: DesignParams
): SectionDesign {
  const applied: string[] = [];
  const extraImports: string[] = [];
  let result = code;

  if (params.style && mapStyle(params.style).surface === 'glass' && sectionType === 'hero') {
    result = result
      .replace('<Card>', '<GlassPanel className="p-6">')
      .replace('</Card>', '</GlassPanel>');
    extraImports.push('GlassPanel');
    applied.push('style:glass -> hero uses GlassPanel');
  }

  if (params.density) {
    const density = params.density;
    const card = mapDensity(density, 'Card').density;
    const table = mapDensity(density, 'BasicTable').density;
    const button = mapDensity(density, 'Button').size;
    const input = mapDensity(density, 'Input').size;
    result = replaceTracked(result, /<Card(?=[\s>])/g, `<Card density="${card}"`, `density:${density} -> Card density="${card}"`, applied);
    result = replaceTracked(result, /<BasicTable\n(\s+)/g, `<BasicTable\n$1density="${table}"\n$1`, `density:${density} -> BasicTable density="${table}"`, applied);
    result = replaceTracked(result, /(<Button variant="solid" )size="medium"/g, `$1size="${button}"`, `density:${density} -> Button size="${button}"`, applied);
    result = replaceTracked(result, /<Input label="Field" variant="ghost"/g, `<Input label="Field" variant="ghost" size="${input}"`, `density:${density} -> Input size="${input}"`, applied);
  }

  return { code: result, applied, extraImports };
}
