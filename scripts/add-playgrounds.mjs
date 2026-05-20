/**
 * add-playgrounds.mjs
 * 
 * Adds PropPlayground to section files that are missing it.
 * Based on ButtonLoaderSection pattern.
 */

import fs from 'fs';
import path from 'path';

const SECTIONS_DIR = 'ui/tucu-ui/src/demo/pages/components/ui-components-sections';

// Map: filename → { componentName, defaultValues, excludeProps, renderFn }
const playgroundConfigs = {
  'BasicTableSection.tsx': {
    componentName: 'BasicTable',
    defaultValues: {
      border: false,
      hoverable: true,
      rounded: true,
      striped: false,
      showHeader: true,
      resizable: false,
    },
    excludeProps: ['columns', 'data', 'className', 'containerClassName', 'headerClassName', 'tableClassName', 'rowClassName', 'maxRows'],
    renderFn: `{(props) => (
          <BasicTable
            {...props}
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'status', label: 'Status' },
            ]}
            data={[
              { name: 'Alice', role: 'Developer', status: 'Active' },
              { name: 'Bob', role: 'Designer', status: 'Inactive' },
              { name: 'Carol', role: 'Manager', status: 'Active' },
            ]}
          />
        )}`,
  },
  'CardSection.tsx': {
    componentName: 'Card',
    defaultValues: {
      title: 'Card Title',
      description: 'This is a card description with relevant content.',
    },
    excludeProps: ['onClick', 'icon', 'header', 'footer', 'actions', 'className'],
    renderFn: `{(props) => <Card {...props} />}`,
  },
  'CarouselSection.tsx': {
    componentName: 'Carousel',
    defaultValues: {
      direction: 'horizontal',
      effect: 'slide',
      loop: true,
      showNavigation: true,
      showPagination: true,
      paginationType: 'bullets',
      grabCursor: true,
      centeredSlides: false,
      freeMode: false,
      mousewheel: false,
      slidesPerView: 1,
      spaceBetween: 16,
    },
    excludeProps: ['onSlideChange', 'onSwiper', 'breakpoints', 'autoplay', 'className', 'slideClassName', 'aria-label'],
    renderFn: `{(props) => (
          <Carousel {...props}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-40 rounded-lg bg-brand/20 flex items-center justify-center">
                <Typography tag="h4">Slide {i}</Typography>
              </div>
            ))}
          </Carousel>
        )}`,
  },
  'CarouselCardsSection.tsx': {
    componentName: 'CarouselCards',
    defaultValues: {
      variant: 'default',
      cardSize: 'md',
      showCardTitles: true,
      showNavigation: true,
      showPagination: true,
      loop: true,
      grabCursor: true,
      direction: 'horizontal',
    },
    excludeProps: ['cards', 'onSlideChange', 'onSwiper', 'breakpoints', 'autoplay', 'className', 'slideClassName', 'cardClassName', 'aria-label', 'effect', 'paginationType', 'centeredSlides', 'freeMode', 'mousewheel', 'slidesPerView', 'spaceBetween'],
    renderFn: `{(props) => (
          <CarouselCards
            {...props}
            cards={[
              { title: 'Card 1', description: 'Description 1', image: '' },
              { title: 'Card 2', description: 'Description 2', image: '' },
              { title: 'Card 3', description: 'Description 3', image: '' },
            ]}
          />
        )}`,
  },
  'CarouselImageSection.tsx': {
    componentName: 'CarouselImage',
    defaultValues: {
      showNavigation: true,
      showPagination: true,
      showTitles: true,
      loop: true,
      grabCursor: true,
      lazy: false,
      imageFit: 'cover',
      direction: 'horizontal',
    },
    excludeProps: ['images', 'onSlideChange', 'onSwiper', 'breakpoints', 'autoplay', 'className', 'slideClassName', 'imageClassName', 'aria-label', 'aspectRatio', 'effect', 'paginationType', 'centeredSlides', 'freeMode', 'mousewheel', 'slidesPerView', 'spaceBetween'],
    renderFn: `{(props) => (
          <CarouselImage
            {...props}
            images={[
              { src: 'https://picsum.photos/seed/1/800/400', alt: 'Image 1', title: 'Image 1' },
              { src: 'https://picsum.photos/seed/2/800/400', alt: 'Image 2', title: 'Image 2' },
              { src: 'https://picsum.photos/seed/3/800/400', alt: 'Image 3', title: 'Image 3' },
            ]}
          />
        )}`,
  },
  'InfoCardSection.tsx': {
    componentName: 'InfoCard',
    defaultValues: {
      title: 'Info Card Title',
      subtitle: 'Subtitle text here',
      gridCols: 2,
    },
    excludeProps: ['columns', 'children', 'footer', 'footerLabel', 'footerTags', 'headerRight', 'icon', 'className'],
    renderFn: `{(props) => (
          <InfoCard
            {...props}
            columns={[
              { label: 'Status', value: 'Active' },
              { label: 'Type', value: 'Premium' },
              { label: 'Created', value: '2024-01-01' },
              { label: 'Updated', value: '2024-06-15' },
            ]}
          />
        )}`,
  },
  'KeyValueRowSection.tsx': {
    componentName: 'KeyValueRow',
    defaultValues: {
      label: 'Status',
      value: 'Active',
      accent: false,
      mono: false,
    },
    excludeProps: ['className'],
    renderFn: `{(props) => <KeyValueRow {...props} />}`,
  },
  'ListContainerSection.tsx': {
    componentName: 'ListContainer',
    defaultValues: {
      label: 'Select an option',
      position: 'bottom',
      align: 'start',
      trigger: 'click',
      isOpen: true,
      keepOpen: false,
    },
    excludeProps: ['items', 'onOpenChange', 'triggerIcon', 'className', 'dropdownClassName'],
    renderFn: `{(props) => (
          <ListContainer
            {...props}
            items={[
              { label: 'Option 1', onClick: () => {} },
              { label: 'Option 2', onClick: () => {} },
              { label: 'Option 3', onClick: () => {} },
            ]}
          />
        )}`,
  },
  'PaginationSection.tsx': {
    componentName: 'Pagination',
    defaultValues: {
      currentPage: 1,
      totalPages: 10,
      windowSize: 5,
    },
    excludeProps: ['onPageChange', 'className'],
    renderFn: `{(props) => <Pagination {...props} onPageChange={() => {}} />}`,
  },
  'ParamTabSection.tsx': {
    componentName: 'ParamTab',
    defaultValues: {
      variant: 'solid',
      size: 'medium',
      showMobileSelect: false,
    },
    excludeProps: ['tabMenu', 'tabListClassName'],
    renderFn: `{(props) => (
          <ParamTab
            {...props}
            tabMenu={[
              { title: 'Tab 1', path: '#tab1' },
              { title: 'Tab 2', path: '#tab2' },
              { title: 'Tab 3', path: '#tab3' },
            ]}
          />
        )}`,
  },
  'SidebarMenuSection.tsx': {
    componentName: 'SidebarMenu',
    defaultValues: {
      title: 'Navigation',
      position: 'left',
    },
    excludeProps: ['menuItems', 'onClose', 'actionContent', 'logo', 'className'],
    renderFn: `{(props) => (
          <SidebarMenu
            {...props}
            menuItems={[
              { name: 'Home', href: '#' },
              { name: 'Settings', href: '#' },
              { name: 'Profile', href: '#' },
            ]}
            onClose={() => {}}
          />
        )}`,
  },
  'SidebarSection.tsx': {
    componentName: 'Sidebar',
    defaultValues: {
      title: 'Sidebar',
      position: 'left',
    },
    excludeProps: ['onClose', 'actionContent', 'logo', 'className'],
    renderFn: `{(props) => (
          <Sidebar {...props} onClose={() => {}}>
            <Typography tag="p">Sidebar content goes here</Typography>
          </Sidebar>
        )}`,
  },
  'StepperSection.tsx': {
    componentName: 'Stepper',
    defaultValues: {
      currentStep: 1,
    },
    excludeProps: ['steps', 'onStepChange', 'className'],
    renderFn: `{(props) => (
          <Stepper
            {...props}
            steps={[
              { label: 'Step 1' },
              { label: 'Step 2' },
              { label: 'Step 3' },
            ]}
          />
        )}`,
  },
  'TabModalSection.tsx': {
    componentName: 'TabModal',
    defaultValues: {
      title: 'Modal Title',
      subtitle: 'Modal subtitle',
      footerLabel: 'Footer text',
      closeLabel: 'Cancel',
    },
    excludeProps: ['onClose', 'tabs', 'content', 'icon', 'className', 'closeButton', 'successButton', 'badgeHeader', 'badgeHeaderClassName'],
    renderFn: `{(props) => (
          <TabModal
            {...props}
            onClose={() => {}}
            tabs={[
              { title: 'Tab 1', content: <Typography tag="p">Content 1</Typography> },
              { title: 'Tab 2', content: <Typography tag="p">Content 2</Typography> },
            ]}
          />
        )}`,
  },
  'TabSection.tsx': {
    componentName: 'TabGroup',
    title: 'Tab Playground',
    defaultValues: {
      variant: 'solid',
      defaultIndex: 0,
    },
    excludeProps: ['onChange', 'selectedIndex', 'className'],
    renderFn: `{(props) => (
          <TabGroup {...props}>
            <TabList>
              <TabItem>Tab 1</TabItem>
              <TabItem>Tab 2</TabItem>
              <TabItem>Tab 3</TabItem>
            </TabList>
            <TabPanels>
              <TabPanel>Content 1</TabPanel>
              <TabPanel>Content 2</TabPanel>
              <TabPanel>Content 3</TabPanel>
            </TabPanels>
          </TabGroup>
        )}`,
  },
  'TabSelectSection.tsx': {
    componentName: 'TabSelect',
    title: 'TabSelect Playground',
    defaultValues: {
      selectedTabIndex: 0,
    },
    excludeProps: ['onChange', 'tabMenu'],
    renderFn: `{(props) => (
          <TabSelect
            {...props}
            onChange={() => {}}
            tabMenu={[
              { title: 'Option A' },
              { title: 'Option B' },
              { title: 'Option C' },
            ]}
          />
        )}`,
  },
  'DefiAppLogoSection.tsx': {
    componentName: 'TucuUiLogo',
    title: 'Logo Playground',
    defaultValues: {
      size: 48,
    },
    excludeProps: ['props', 'className'],
    renderFn: `{(props) => <TucuUiLogo {...props} />}`,
  },
  'ToastSection.tsx': {
    componentName: 'NotificationCard',
    title: 'Notification Playground',
    defaultValues: {
      title: 'Notification',
      message: 'This is a notification message',
      type: 'info',
      closable: true,
    },
    excludeProps: ['onClose', 'className'],
    renderFn: `{(props) => <NotificationCard {...props} />}`,
  },
};

// Skip CardContainerSection — only 1 prop (className), not useful for playground

function addPlayground(filePath, config) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Already has PropPlayground? Skip.
  if (content.includes('PropPlayground')) {
    console.log(`  ⏭️  Already has PropPlayground: ${path.basename(filePath)}`);
    return false;
  }

  // Add PropPlayground import
  const importLine = "import { PropPlayground } from '../../../components/prop-playground';";
  
  // Find the last import line and add after it
  const importRegex = /^import .+from .+;$/gm;
  let lastImportMatch;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    lastImportMatch = match;
  }
  
  if (lastImportMatch) {
    const insertPos = lastImportMatch.index + lastImportMatch[0].length;
    content = content.slice(0, insertPos) + '\n' + importLine + content.slice(insertPos);
  }

  // Build the PropPlayground JSX
  const title = config.title || `${config.componentName} Playground`;
  const defaultValuesStr = JSON.stringify(config.defaultValues, null, 6).replace(/"/g, "'").replace(/\n {6}/g, '\n          ').replace(/\n {4}\}/g, '\n        }');
  const excludeStr = config.excludeProps.map(p => `'${p}'`).join(', ');

  const playgroundJSX = `
      <PropPlayground
        componentName="${config.componentName}"
        title="${title}"
        defaultValues={${defaultValuesStr}}
        excludeProps={[${excludeStr}]}
      >
        ${config.renderFn}
      </PropPlayground>
`;

  // Insert before AutoPropsTable if it exists
  if (content.includes('<AutoPropsTable')) {
    content = content.replace(
      /(\s*)(<AutoPropsTable)/,
      `${playgroundJSX}\n$1$2`
    );
  } else {
    // Insert before the last </> (closing fragment)
    const lastFragmentClose = content.lastIndexOf('</>');
    if (lastFragmentClose !== -1) {
      content = content.slice(0, lastFragmentClose) + playgroundJSX + '\n      ' + content.slice(lastFragmentClose);
    }
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  return true;
}

// Main
console.log('🎮 Adding PropPlayground to sections...\n');

let added = 0;
let skipped = 0;

for (const [filename, config] of Object.entries(playgroundConfigs)) {
  const filePath = path.join(SECTIONS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  File not found: ${filename}`);
    continue;
  }
  
  const result = addPlayground(filePath, config);
  if (result) {
    console.log(`  ✅ Added PropPlayground to: ${filename}`);
    added++;
  } else {
    skipped++;
  }
}

console.log(`\n📊 Done: ${added} added, ${skipped} skipped`);
