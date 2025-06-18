import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryContainer } from '../../components/StoryContainer';
import * as Icons from '../../../components/icons';
import Logo from '../../../components/icons/menu-icon';
import UploadIcon from '../../../components/icons/upload';
import HorizontalThreeDots from '../../../components/icons/horizontal-three-dots';
import VerticalThreeDots from '../../../components/icons/vertical-three-dots';

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
          className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
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
  title: 'UI COMPONENTS/Icons',
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
    <StoryContainer className="max-h-[50%] overflow-y-auto">
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
    <StoryContainer>
      <div className="p-4 max-w-6xl mx-auto">
        <IconGrid icons={navigationIcons} category="Navigation Icons" />
      </div>
    </StoryContainer>
  ),
};

export const Brands: Story = {
  render: () => (
    <StoryContainer>
      <div className="p-4 max-w-6xl mx-auto">
        <IconGrid icons={brandIcons} category="Brand Icons" />
      </div>
    </StoryContainer>
  ),
};

export const Cryptocurrency: Story = {
  render: () => (
    <StoryContainer>
      <div className="p-4 max-w-6xl mx-auto">
        <IconGrid icons={cryptocurrencyIcons} category="Cryptocurrency Icons" />
      </div>
    </StoryContainer>
  ),
};

export const Interface: Story = {
  render: () => (
    <StoryContainer>
      <div className="p-4 max-w-6xl mx-auto">
        <IconGrid icons={interfaceIcons} category="Interface Icons" />
      </div>
    </StoryContainer>
  ),
};

export const Layout: Story = {
  render: () => (
    <StoryContainer>
      <div className="p-4 max-w-6xl mx-auto">
        <IconGrid icons={layoutIcons} category="Layout Icons" />
      </div>
    </StoryContainer>
  ),
};

export const Theme: Story = {
  render: () => (
    <StoryContainer>
      <div className="p-4 max-w-6xl mx-auto">
        <IconGrid icons={themeIcons} category="Theme Icons" />
      </div>
    </StoryContainer>
  ),
};
