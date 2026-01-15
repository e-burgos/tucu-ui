import React, { useState, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryContainer } from '../../components/StoryContainer';
import { LucideIcons as LucideIconsAll } from '../../../index';
import { Button, Input } from '../../../components';

// Meta for the story
const meta: Meta = {
  title: '3. UI COMPONENTS/Icons/Lucide Icons',
  parameters: {
    docs: {
      description: {
        component:
          'Complete collection of all Lucide icons available through tucu-ui.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Type for icon component
type IconComponent = React.ForwardRefExoticComponent<
  Omit<LucideIconsAll.LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>;

// Categories for organizing icons
const iconCategories: Record<string, string[]> = {
  'Arrows & Direction': [
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDownLeft',
    'ArrowDownRight',
    'ArrowUpLeft',
    'ArrowUpRight',
    'ChevronDown',
    'ChevronLeft',
    'ChevronRight',
    'ChevronUp',
    'ChevronsDown',
    'ChevronsLeft',
    'ChevronsRight',
    'ChevronsUp',
    'CornerDownLeft',
    'CornerDownRight',
    'CornerLeftDown',
    'CornerLeftUp',
    'CornerRightDown',
    'CornerRightUp',
    'CornerUpLeft',
    'CornerUpRight',
    'MoveHorizontal',
    'MoveVertical',
    'Move',
    'Undo',
    'Redo',
    'RotateCcw',
    'RotateCw',
  ],
  'Interface & UI': [
    'AlertCircle',
    'AlertTriangle',
    'Bell',
    'BellOff',
    'Check',
    'CheckCircle',
    'CheckSquare',
    'Copy',
    'Edit',
    'Eye',
    'EyeOff',
    'FileText',
    'File',
    'Filter',
    'HelpCircle',
    'Info',
    'Menu',
    'MessageCircle',
    'MessageSquare',
    'MoreHorizontal',
    'MoreVertical',
    'Search',
    'Settings',
    'Trash',
    'Trash2',
    'X',
    'XCircle',
    'XSquare',
    'ZoomIn',
    'ZoomOut',
  ],
  'Media & Playback': [
    'FastForward',
    'Film',
    'Image',
    'Music',
    'Pause',
    'PauseCircle',
    'Play',
    'PlayCircle',
    'Rewind',
    'SkipBack',
    'SkipForward',
    'Stop',
    'StopCircle',
    'Video',
    'VideoOff',
    'Volume',
    'Volume1',
    'Volume2',
    'VolumeX',
  ],
  'Devices & Hardware': [
    'Battery',
    'BatteryCharging',
    'Bluetooth',
    'Camera',
    'CameraOff',
    'Cast',
    'Cpu',
    'HardDrive',
    'Headphones',
    'Laptop',
    'Mic',
    'MicOff',
    'Monitor',
    'Moon',
    'Printer',
    'Smartphone',
    'Speaker',
    'Sun',
    'Tablet',
    'Tv',
    'Wifi',
    'WifiOff',
  ],
  'Finance & Commerce': [
    'CreditCard',
    'DollarSign',
    'Gift',
    'PiggyBank',
    'ShoppingBag',
    'ShoppingCart',
    'Tag',
    'Wallet',
  ],
  'Weather & Nature': [
    'Cloud',
    'CloudDrizzle',
    'CloudLightning',
    'CloudOff',
    'CloudRain',
    'CloudSnow',
    'Droplet',
    'Feather',
    'Sunrise',
    'Sunset',
    'Thermometer',
    'Umbrella',
    'Wind',
  ],
  'People & Users': [
    'User',
    'UserCheck',
    'UserMinus',
    'UserPlus',
    'UserX',
    'Users',
  ],
  'Charts & Data': [
    'Activity',
    'BarChart',
    'BarChart2',
    'LineChart',
    'PieChart',
    'TrendingDown',
    'TrendingUp',
  ],
  'Shapes & Symbols': [
    'Circle',
    'Square',
    'Triangle',
    'Hexagon',
    'Octagon',
    'Pentagon',
    'Diamond',
    'Heart',
    'Star',
  ],
  Other: [], // Will contain all icons that don't match any category
};

// Helper function to render icon grid
const IconGrid = ({
  icons,
  searchTerm,
  category,
}: {
  icons: Record<string, IconComponent>;
  searchTerm: string;
  category: string;
}) => {
  const [showIcon, setShowIcon] = useState<{
    [key: string]: boolean;
  }>({});

  const filteredIcons = useMemo(
    () =>
      Object.entries(icons)?.filter(([name]) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [icons, searchTerm]
  );

  if (filteredIcons?.length === 0) {
    return (
      <div className="p-8 text-center">
        <LucideIconsAll.SearchX className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-500">No icons found matching "{searchTerm}"</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {filteredIcons?.map(([name, Icon]) => (
        <div
          key={name}
          className="flex flex-col w-full items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-brand/10 hover:border-brand transition-colors"
        >
          {category === 'All' || category === 'Other' ? (
            <div className="h-12 w-12 flex items-center justify-center text-gray-700">
              {showIcon[name] ? (
                <Icon className="h-8 w-8 dark:text-gray-300" />
              ) : (
                <Button
                  size="mini"
                  shape="circle"
                  className="cursor-pointer"
                  onClick={() => setShowIcon({ ...showIcon, [name]: true })}
                >
                  <LucideIconsAll.Eye size={16} />
                </Button>
              )}
            </div>
          ) : (
            <Icon />
          )}
          <span className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
};

// Component for displaying all icons with search functionality
const AllIconsDisplay = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract all icons from LucideIconsAll
  const allIcons = useMemo(() => {
    const icons: Record<string, IconComponent> = {};

    Object.entries(LucideIconsAll).forEach(([key, value]) => {
      icons[key] = value as IconComponent;
      //icons[key] = value as IconComponent;
    });

    return icons;
  }, []);

  const iconCount = Object.keys(allIcons).length;

  // Organize icons by category
  const categorizedIcons = useMemo(() => {
    const result: Record<string, Record<string, IconComponent>> = {
      All: allIcons,
    };

    // Create empty categories
    Object.keys(iconCategories).forEach((category) => {
      result[category] = {};
    });

    // Categorize icons
    Object.entries(allIcons).forEach(([name, Icon]) => {
      let assigned = false;

      // Check if icon belongs to a specific category
      for (const [category, iconNames] of Object.entries(iconCategories)) {
        if (iconNames.includes(name)) {
          result[category][name] = Icon;
          assigned = true;
          break;
        }
      }

      // If not assigned to any category, put in "Other"
      if (!assigned && name !== 'default') {
        result['Other'][name] = Icon;
      }
    });

    return result;
  }, [allIcons]);

  // Icons to display based on selected category and search term
  const displayIcons = useMemo(() => {
    return selectedCategory === 'All'
      ? allIcons
      : categorizedIcons[selectedCategory] || {};
  }, [selectedCategory, categorizedIcons, allIcons]);

  // Count icons in each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.keys(categorizedIcons).forEach((category) => {
      counts[category] = Object.keys(categorizedIcons[category]).length;
    });
    return counts;
  }, [categorizedIcons]);

  if (
    Object.keys(allIcons).length === 0 ||
    Object.keys(categorizedIcons).length === 0
  ) {
    return <div>No icons found</div>;
  }

  return (
    <StoryContainer className="flex justify-start">
      <div className="p-4 mx-auto w-full">
        <h1 className="text-2xl font-bold mb-2">Lucide Icon Library</h1>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Complete collection of all {iconCount} Lucide icons available through
          tucu-ui. These icons can be imported directly from the{' '}
          <code>LucideIcons</code> namespace.
        </p>

        <div className="mb-6">
          <Input
            type="text"
            icon={<LucideIconsAll.Search size={18} />}
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchTerm('')}
            >
              <LucideIconsAll.X size={18} />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {Object.keys(categorizedIcons)?.length &&
              Object.keys(categorizedIcons)?.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-t-lg whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-brand text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category} ({categoryCounts[category] || 0})
                </button>
              ))}
          </div>
        </div>

        {/* Display filtered icons */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4">
            {selectedCategory === 'All'
              ? searchTerm
                ? `Search results for "${searchTerm}"`
                : 'All Icons'
              : selectedCategory}
          </h2>
          <IconGrid
            icons={displayIcons}
            searchTerm={searchTerm}
            category={selectedCategory}
          />
        </div>
      </div>
    </StoryContainer>
  );
};

// Main story component
export const AllIcons: Story = {
  render: () => <AllIconsDisplay />,
};

// Usage example
export const ImportExamples: Story = {
  render: () => (
    <StoryContainer>
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">How to Import and Use</h1>

        <div className="mb-8">
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Import from namespace</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                <code>{`import { LucideIcons } from '@tucu-ui';

// Usage
<LucideIcons.Heart className="h-5 w-5 text-red-500" />`}</code>
              </pre>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Common Props</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="p-2 text-left">Prop</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">
                  <code>size</code>
                </td>
                <td className="p-2">
                  <code>number</code>
                </td>
                <td className="p-2">
                  Size of the icon (both width and height)
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2">
                  <code>color</code>
                </td>
                <td className="p-2">
                  <code>string</code>
                </td>
                <td className="p-2">Color of the icon</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">
                  <code>strokeWidth</code>
                </td>
                <td className="p-2">
                  <code>number</code>
                </td>
                <td className="p-2">Width of the stroke (default: 2)</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">
                  <code>className</code>
                </td>
                <td className="p-2">
                  <code>string</code>
                </td>
                <td className="p-2">CSS classes to apply</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Example with Props</h2>
          <div className="p-4 border rounded-lg">
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex flex-col items-center">
                <LucideIconsAll.Activity size={32} color="red" />
                <span className="mt-2 text-sm">size & color</span>
              </div>

              <div className="flex flex-col items-center">
                <LucideIconsAll.Activity
                  className="h-8 w-8 text-blue-500"
                  strokeWidth={1}
                />
                <span className="mt-2 text-sm">className & strokeWidth</span>
              </div>

              <div className="flex flex-col items-center">
                <LucideIconsAll.Activity
                  className="h-8 w-8 text-green-500"
                  strokeWidth={3}
                />
                <span className="mt-2 text-sm">Bold stroke</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};
