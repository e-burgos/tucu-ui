/**
 * Script to add HeroCard to each ui-components-sections file.
 * Replaces the text-center header with a HeroCard component.
 */
import fs from 'fs';
import path from 'path';

const SECTIONS_DIR = path.resolve(
  'ui/tucu-ui/src/demo/pages/components/ui-components-sections'
);

// ─── Icon & gradient mapping per section ───────────────────────

const sectionConfig = {
  // Buttons
  ButtonDripSection: {
    icon: 'MousePointerClick',
    gradient: 'from-blue-500 to-indigo-500',
  },
  ButtonLoaderSection: {
    icon: 'Loader2',
    gradient: 'from-blue-500 to-indigo-600',
  },
  HamburgerSection: {
    icon: 'Menu',
    gradient: 'from-blue-600 to-indigo-500',
  },
  TopupButtonSection: {
    icon: 'ArrowUpCircle',
    gradient: 'from-indigo-500 to-blue-500',
  },
  // Cards
  AuthorCardSection: {
    icon: 'UserCircle',
    gradient: 'from-violet-500 to-purple-500',
  },
  CardSection: {
    icon: 'CreditCard',
    gradient: 'from-violet-500 to-purple-600',
  },
  CardContainerSection: {
    icon: 'LayoutGrid',
    gradient: 'from-purple-500 to-violet-500',
  },
  CardTitleSection: {
    icon: 'Heading',
    gradient: 'from-purple-600 to-violet-500',
  },
  InfoCardSection: {
    icon: 'Info',
    gradient: 'from-violet-600 to-purple-500',
  },
  PanelActionCardSection: {
    icon: 'PanelLeft',
    gradient: 'from-purple-500 to-fuchsia-500',
  },
  PanelCardSection: {
    icon: 'PanelTop',
    gradient: 'from-fuchsia-500 to-purple-500',
  },
  // Carousel
  CarouselSection: {
    icon: 'GalleryHorizontal',
    gradient: 'from-pink-500 to-rose-500',
  },
  CarouselCardsSection: {
    icon: 'Layers',
    gradient: 'from-rose-500 to-pink-500',
  },
  CarouselImageSection: {
    icon: 'Image',
    gradient: 'from-pink-600 to-rose-500',
  },
  // Common
  AvatarSection: {
    icon: 'CircleUser',
    gradient: 'from-emerald-500 to-teal-500',
  },
  BadgeSection: {
    icon: 'Award',
    gradient: 'from-teal-500 to-emerald-500',
  },
  CollapseSection: {
    icon: 'ChevronsUpDown',
    gradient: 'from-emerald-600 to-teal-500',
  },
  ScrollbarSection: {
    icon: 'ScrollText',
    gradient: 'from-teal-600 to-emerald-500',
  },
  SkeletonSection: {
    icon: 'Square',
    gradient: 'from-emerald-500 to-green-500',
  },
  TooltipSection: {
    icon: 'MessageSquare',
    gradient: 'from-teal-500 to-cyan-500',
  },
  KeyValueRowSection: {
    icon: 'Rows3',
    gradient: 'from-green-500 to-emerald-500',
  },
  PaginationSection: {
    icon: 'ArrowLeftRight',
    gradient: 'from-emerald-500 to-cyan-500',
  },
  StepperSection: {
    icon: 'ListOrdered',
    gradient: 'from-teal-500 to-green-500',
  },
  // Dialog
  ModalSection: {
    icon: 'Maximize2',
    gradient: 'from-amber-500 to-orange-500',
  },
  TabModalSection: {
    icon: 'SquareStack',
    gradient: 'from-orange-500 to-amber-500',
  },
  DrawerSection: {
    icon: 'PanelRightOpen',
    gradient: 'from-amber-600 to-orange-500',
  },
  SidebarSection: {
    icon: 'PanelLeftOpen',
    gradient: 'from-orange-500 to-yellow-500',
  },
  SidebarMenuSection: {
    icon: 'LayoutList',
    gradient: 'from-yellow-500 to-amber-500',
  },
  // Links
  ActiveLinkSection: {
    icon: 'Link',
    gradient: 'from-cyan-500 to-blue-500',
  },
  AnchorLinkSection: {
    icon: 'ExternalLink',
    gradient: 'from-blue-500 to-cyan-500',
  },
  // List
  ListContainerSection: {
    icon: 'List',
    gradient: 'from-green-500 to-emerald-500',
  },
  ListItemSection: {
    icon: 'ListMinus',
    gradient: 'from-emerald-500 to-green-600',
  },
  // Loaders
  LoaderSection: {
    icon: 'Loader2',
    gradient: 'from-indigo-500 to-violet-500',
  },
  ProgressbarSection: {
    icon: 'BarChart3',
    gradient: 'from-violet-500 to-indigo-500',
  },
  SpinnerSection: {
    icon: 'RefreshCw',
    gradient: 'from-indigo-600 to-violet-500',
  },
  // Logos
  LogoSection: {
    icon: 'Sparkles',
    gradient: 'from-rose-500 to-pink-500',
  },
  TucuUiLogoSection: {
    icon: 'Hexagon',
    gradient: 'from-pink-500 to-rose-500',
  },
  DefiAppLogoSection: {
    icon: 'Diamond',
    gradient: 'from-rose-600 to-pink-500',
  },
  // Notifications
  AlertSection: {
    icon: 'AlertCircle',
    gradient: 'from-red-500 to-orange-500',
  },
  NotificationCardSection: {
    icon: 'Bell',
    gradient: 'from-orange-500 to-red-500',
  },
  ToastSection: {
    icon: 'BellRing',
    gradient: 'from-red-600 to-orange-500',
  },
  // Table
  BasicTableSection: {
    icon: 'Table2',
    gradient: 'from-teal-500 to-cyan-500',
  },
  // Tabs
  TabSection: {
    icon: 'LayoutList',
    gradient: 'from-purple-500 to-indigo-500',
  },
  TabSelectSection: {
    icon: 'ChevronDown',
    gradient: 'from-indigo-500 to-purple-500',
  },
  ParamTabSection: {
    icon: 'Hash',
    gradient: 'from-purple-600 to-indigo-500',
  },
  // Typography
  TypographySection: {
    icon: 'Type',
    gradient: 'from-slate-600 to-gray-700',
  },
  // Utils
  RevealContentSection: {
    icon: 'Eye',
    gradient: 'from-sky-500 to-blue-500',
  },
  ScrollToTopSection: {
    icon: 'ArrowUp',
    gradient: 'from-blue-500 to-sky-500',
  },
  ImageSection: {
    icon: 'ImageIcon',
    gradient: 'from-sky-600 to-blue-500',
  },
};

// ─── Transformation logic ──────────────────────────────────────

function transformFile(filePath) {
  const fileName = path.basename(filePath, '.tsx');
  const config = sectionConfig[fileName];

  if (!config) {
    console.warn(`⚠️  No config for: ${fileName}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Extract the component name and description from the header
  const headerRegex =
    /\s*<div className="text-center space-y-4">\s*<Typography tag="h2"[^>]*>\s*([\s\S]*?)\s*<\/Typography>\s*<Typography\s*tag="p"\s*className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"\s*>\s*([\s\S]*?)\s*<\/Typography>\s*<\/div>/;

  const match = content.match(headerRegex);
  if (!match) {
    console.warn(`⚠️  No header match in: ${fileName}`);
    return false;
  }

  const componentName = match[1].trim();
  const description = match[2].trim();

  // Generate HeroCard JSX
  const heroCard = `<HeroCard
        title="${componentName}"
        description="${description.replace(/"/g, '\\"')}"
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br ${config.gradient} rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.${config.icon} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />`;

  // Check imports BEFORE replacing content (since replacement adds HeroCard/LucideIcons text)
  const importSection = content.slice(0, content.indexOf('const ') > 0 ? content.indexOf('const ') : 500);
  const needsHeroCard = !importSection.includes('HeroCard');
  const needsLucideIcons = !importSection.includes('LucideIcons');

  // Replace the header block
  content = content.replace(headerRegex, '\n      ' + heroCard);

  // Ensure HeroCard and LucideIcons are imported
  if (needsHeroCard || needsLucideIcons) {
    // Check if there's an import from '../../../../index'
    const indexImportRegex =
      /import\s*\{([^}]+)\}\s*from\s*'\.\.\/\.\.\/\.\.\/\.\.\/index';/;
    const indexMatch = content.match(indexImportRegex);

    if (indexMatch) {
      let imports = indexMatch[1];
      if (needsHeroCard) {
        imports = imports.trimEnd() + ',\n  HeroCard';
      }
      if (needsLucideIcons) {
        imports = imports.trimEnd() + ',\n  LucideIcons';
      }
      content = content.replace(indexImportRegex, `import {${imports}} from '../../../../index';`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Transformed: ${fileName}`);
  return true;
}

// ─── Main ──────────────────────────────────────────────────────

const files = fs
  .readdirSync(SECTIONS_DIR)
  .filter((f) => f.endsWith('.tsx') && f !== 'index.ts');

let success = 0;
let failed = 0;

for (const file of files) {
  const filePath = path.join(SECTIONS_DIR, file);
  if (transformFile(filePath)) {
    success++;
  } else {
    failed++;
  }
}

console.log(`\n🎉 Done! ${success} transformed, ${failed} skipped.`);
