import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryContainer } from '../../components/StoryContainer';
import * as Icons from '../../../components/icons';
import Logo from '../../../components/icons/menu-icon';
import UploadIcon from '../../../components/icons/upload';
import HorizontalThreeDots from '../../../components/icons/horizontal-three-dots';
import VerticalThreeDots from '../../../components/icons/vertical-three-dots';
import { VerifiedIcon } from '../../../components/icons';

// Type for icon component
type IconComponentProps = React.SVGAttributes<SVGElement>;
type IconComponent = React.FC<IconComponentProps>;

// Helper function to render icon grid
const IconGrid = ({
  icons,
  category,
}: {
  icons: Record<string, IconComponent>;
  category: string;
}) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">{category}</h2>
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Object.entries(icons).map(([name, Icon]) => (
        <div
          key={name}
          className="flex flex-col w-full items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-brand/10 hover:border-brand transition-colors"
        >
          <div className="h-12 w-12 flex items-center justify-center text-gray-700">
            <Icon className="h-8 w-8 dark:text-gray-300" />
          </div>
          <span className="mt-2 text-xs text-gray-600 dark:text-gray-300 text-center">
            {name}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// Meta for the story
const meta: Meta = {
  title: '3. UI COMPONENTS/Icons/Icons',
  parameters: {
    docs: {
      description: {
        component: 'Collection of icons used throughout the application.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Categorize icons
const navigationIcons = {
  ArrowLinkIcon: Icons.ArrowLinkIcon,
  ArrowRight: Icons.ArrowRight,
  ArrowUp: Icons.ArrowUp,
  ChevronDown: Icons.ChevronDown,
  ChevronForward: Icons.ChevronForward,
  ChevronRight: Icons.ChevronRight,
  LongArrowLeft: Icons.LongArrowLeft,
  LongArrowRight: Icons.LongArrowRight,
  LongArrowUp: Icons.LongArrowUp,
  ExternalLink: Icons.ExternalLink,
};

const brandIcons = {
  Facebook: Icons.Facebook,
  Github: Icons.Github,
  Instagram: Icons.Instagram,
  Telegram: Icons.Telegram,
  Twitter: Icons.Twitter,
};

const cryptocurrencyIcons = {
  Bitcoin: Icons.Bitcoin,
  Bnb: Icons.Bnb,
  Cardano: Icons.Cardano,
  Ethereum: Icons.Ethereum,
  EthereumDark: Icons.EthereumDark,
  Doge: Icons.Doge,
  Flow: Icons.Flow,
  Tether: Icons.Tether,
  Usdc: Icons.Usdc,
};

const interfaceIcons = {
  Check: Icons.Check,
  Checkmark: Icons.CheckmarkIcon,
  Close: Icons.Close,
  Copy: Icons.Copy,
  DiskIcon: Icons.DiskIcon,
  DocumentIcon: Icons.DocumentIcon,
  DotsIcon: Icons.DotsIcon,
  EyeIcon: Icons.EyeIcon,
  EyeSlashIcon: Icons.EyeSlashIcon,
  HorizontalThreeDots: HorizontalThreeDots,
  VerticalThreeDots: VerticalThreeDots,
  InfoCircle: Icons.InfoCircle,
  InfoIcon: Icons.InfoIcon,
  LinkIcon: Icons.LinkIcon,
  LockIcon: Icons.LockIcon,
  Logo: Logo,
  MoreIcon: Icons.MoreIcon,
  PlayIcon: Icons.PlayIcon,
  Plus: Icons.Plus,
  PlusCircle: Icons.PlusCircle,
  PowerIcon: Icons.PowerIcon,
  Refresh: Icons.Refresh,
  SearchIcon: Icons.SearchIcon,
  ShutdownIcon: Icons.ShutdownIcon,
  Star: Icons.Star,
  StarFill: Icons.StarFill,
  UploadIcon: UploadIcon,
  VerifiedIcon: Icons.VerifiedIcon,
  Verified: Icons.Verified,
  Warning: Icons.Warning,
};

const layoutIcons = {
  ClassicLayoutIcon: Icons.ClassicLayoutIcon,
  MinimalLayoutIcon: Icons.MinimalLayoutIcon,
  ModernLayoutIcon: Icons.ModernLayoutIcon,
  RetroLayoutIcon: Icons.RetroLayoutIcon,
  CompactGridIcon: Icons.CompactGridIcon,
  NormalGridIcon: Icons.NormalGridIcon,
};

const themeIcons = {
  Moon: Icons.Moon,
  Sun: Icons.Sun,
};

// Main story component
export const AllIcons: Story = {
  render: () => (
    <StoryContainer className="flex justify-start">
      <div className="p-4 max-w-6xl mx-auto ">
        <h1 className="text-2xl font-bold mb-6">Icon Library</h1>
        <IconGrid icons={navigationIcons} category="Navigation Icons" />
        <IconGrid icons={brandIcons} category="Brand Icons" />
        <IconGrid icons={cryptocurrencyIcons} category="Cryptocurrency Icons" />
        <IconGrid icons={interfaceIcons} category="Interface Icons" />
        <IconGrid icons={layoutIcons} category="Layout Icons" />
        <IconGrid icons={themeIcons} category="Theme Icons" />
      </div>
    </StoryContainer>
  ),
};

// Individual icon categories
export const Navigation: Story = {
  render: () => (
    <StoryContainer className="flex justify-start">
      <div className="p-4 max-w-6xl mx-auto">
        <IconGrid icons={navigationIcons} category="Navigation Icons" />
      </div>
    </StoryContainer>
  ),
};

export const Brands: Story = {
  render: () => (
    <StoryContainer className="flex justify-start">
      <div className="p-4 max-w-6xl mx-auto">
        <IconGrid icons={brandIcons} category="Brand Icons" />
      </div>
    </StoryContainer>
  ),
};

export const Cryptocurrency: Story = {
  render: () => (
    <StoryContainer className="flex justify-start">
      <div className="p-4 max-w-6xl mx-auto">
        <IconGrid icons={cryptocurrencyIcons} category="Cryptocurrency Icons" />
      </div>
    </StoryContainer>
  ),
};

export const Interface: Story = {
  render: () => (
    <StoryContainer className="flex justify-start">
      <div className="p-4 max-w-6xl mx-auto">
        <IconGrid icons={interfaceIcons} category="Interface Icons" />
      </div>
    </StoryContainer>
  ),
};

export const Layout: Story = {
  render: () => (
    <StoryContainer className="flex justify-start">
      <div className="p-4 max-w-6xl mx-auto">
        <IconGrid icons={layoutIcons} category="Layout Icons" />
      </div>
    </StoryContainer>
  ),
};

export const Theme: Story = {
  render: () => (
    <StoryContainer className="flex justify-start">
      <div className="p-4 max-w-6xl mx-auto">
        <IconGrid icons={themeIcons} category="Theme Icons" />
      </div>
    </StoryContainer>
  ),
};

export const UsageIcons: Story = {
  render: () => (
    <StoryContainer className="flex justify-start items-center">
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">How to Import and Use</h1>

        <div className="mb-8">
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Import from namespace</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
                <code>{`import { VerifiedIcon } from '@tucu-ui';

// Usage
<VerifiedIcon className="h-5 w-5 text-red-500" />`}</code>
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
                <VerifiedIcon className="h-8 w-8 text-red-500" />
                <span className="mt-2 text-sm">size & color</span>
              </div>

              <div className="flex flex-col items-center">
                <VerifiedIcon
                  className="h-8 w-8 text-blue-500"
                  strokeWidth={1}
                />
                <span className="mt-2 text-sm">className & strokeWidth</span>
              </div>

              <div className="flex flex-col items-center">
                <VerifiedIcon
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
