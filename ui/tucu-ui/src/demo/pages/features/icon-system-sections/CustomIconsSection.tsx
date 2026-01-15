import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
} from '../../../../index';
import {
  Tucu,
  HomeIcon,
  SearchIcon,
  Bitcoin,
  Ethereum,
  Bnb,
  Cardano,
  Tether,
  Usdc,
  Doge,
  Flow,
  Github,
  Twitter,
  Facebook,
  Instagram,
  Telegram,
  ClassicLayoutIcon,
  MinimalLayoutIcon,
  ModernLayoutIcon,
  RetroLayoutIcon,
  Sun,
  Moon,
  Check,
  Close,
  Plus,
  Star,
  StarFill,
  Verified,
  Warning,
  InfoCircle,
  DocumentIcon,
  BookIcon,
  PlayIcon,
  ProfileIcon,
  EyeIcon,
  EyeSlashIcon,
  LockIcon,
  Unlocked,
} from '../../../../components/icons';

const CustomIconsSection: React.FC = () => {
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const customIconCategories = [
    {
      category: 'Blockchain & Crypto',
      description: 'Cryptocurrency and blockchain-related icons',
      icon: (
        <LucideIcons.Coins className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-yellow-500 via-orange-500 to-amber-500',
      icons: [
        { name: 'Bitcoin', component: <Bitcoin className="w-6 h-6" /> },
        { name: 'Ethereum', component: <Ethereum className="w-6 h-6" /> },
        { name: 'Bnb', component: <Bnb className="w-6 h-6" /> },
        { name: 'Cardano', component: <Cardano className="w-6 h-6" /> },
        { name: 'Tether', component: <Tether className="w-6 h-6" /> },
        { name: 'Usdc', component: <Usdc className="w-6 h-6" /> },
        { name: 'Doge', component: <Doge className="w-6 h-6" /> },
        { name: 'Flow', component: <Flow className="w-6 h-6" /> },
      ],
    },
    {
      category: 'Layout Controls',
      description: 'Icons for layout switching and navigation',
      icon: (
        <LucideIcons.Layout className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-blue-500 via-indigo-500 to-purple-500',
      icons: [
        {
          name: 'ClassicLayoutIcon',
          component: <ClassicLayoutIcon className="w-6 h-6" />,
        },
        {
          name: 'MinimalLayoutIcon',
          component: <MinimalLayoutIcon className="w-6 h-6" />,
        },
        {
          name: 'ModernLayoutIcon',
          component: <ModernLayoutIcon className="w-6 h-6" />,
        },
        {
          name: 'RetroLayoutIcon',
          component: <RetroLayoutIcon className="w-6 h-6" />,
        },
      ],
    },
    {
      category: 'Social Brands',
      description: 'Social media platform icons',
      icon: (
        <LucideIcons.Share2 className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-pink-500 via-rose-500 to-red-500',
      icons: [
        { name: 'Github', component: <Github className="w-6 h-6" /> },
        { name: 'Twitter', component: <Twitter className="w-6 h-6" /> },
        { name: 'Facebook', component: <Facebook className="w-6 h-6" /> },
        { name: 'Instagram', component: <Instagram className="w-6 h-6" /> },
        { name: 'Telegram', component: <Telegram className="w-6 h-6" /> },
      ],
    },
    {
      category: 'UI Elements',
      description: 'Common UI and interface icons',
      icon: (
        <LucideIcons.Component className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-green-500 via-emerald-500 to-teal-500',
      icons: [
        { name: 'Tucu', component: <Tucu className="w-6 h-6" /> },
        { name: 'HomeIcon', component: <HomeIcon className="w-6 h-6" /> },
        { name: 'SearchIcon', component: <SearchIcon className="w-6 h-6" /> },
        { name: 'Sun', component: <Sun className="w-6 h-6" /> },
        { name: 'Moon', component: <Moon className="w-6 h-6" /> },
        { name: 'Check', component: <Check className="w-6 h-6" /> },
        { name: 'Close', component: <Close className="w-6 h-6" /> },
        { name: 'Plus', component: <Plus className="w-6 h-6" /> },
        { name: 'Star', component: <Star className="w-6 h-6" /> },
        { name: 'StarFill', component: <StarFill className="w-6 h-6" /> },
        { name: 'Verified', component: <Verified className="w-6 h-6" /> },
        { name: 'Warning', component: <Warning className="w-6 h-6" /> },
        { name: 'InfoCircle', component: <InfoCircle className="w-6 h-6" /> },
        {
          name: 'DocumentIcon',
          component: <DocumentIcon className="w-6 h-6" />,
        },
        { name: 'BookIcon', component: <BookIcon className="w-6 h-6" /> },
        { name: 'PlayIcon', component: <PlayIcon className="w-6 h-6" /> },
        { name: 'ProfileIcon', component: <ProfileIcon className="w-6 h-6" /> },
        { name: 'EyeIcon', component: <EyeIcon className="w-6 h-6" /> },
        {
          name: 'EyeSlashIcon',
          component: <EyeSlashIcon className="w-6 h-6" />,
        },
        { name: 'LockIcon', component: <LockIcon className="w-6 h-6" /> },
        { name: 'Unlocked', component: <Unlocked className="w-6 h-6" /> },
      ],
    },
  ];

  const handleCopyIcon = (iconName: string) => {
    const iconCode = `import { ${iconName} } from '@e-burgos/tucu-ui';\n\n<${iconName} className="w-6 h-6" />`;
    navigator.clipboard.writeText(iconCode);
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Custom Tucu Icons
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          98+ custom-designed icons organized by category
        </Typography>
      </div>

      <div className="space-y-8">
        {customIconCategories.map((category, index) => (
          <CardContainer key={index} className="overflow-hidden">
            <CardTitle title={category.category} className="mt-2 mb-2">
              <div className="w-full space-y-6 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg bg-linear-to-br ${category.color} shadow-lg`}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <Typography tag="h3" className="text-xl font-semibold">
                      {category.category}
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-gray-600 dark:text-gray-400"
                    >
                      {category.description}
                    </Typography>
                  </div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                  {category.icons.map((icon, iconIndex) => (
                    <div
                      key={iconIndex}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group relative"
                      onClick={() => handleCopyIcon(icon.name)}
                      title={`Click to copy: ${icon.name}`}
                    >
                      <div className="text-gray-700 dark:text-gray-300 group-hover:text-brand transition-colors">
                        {icon.component}
                      </div>
                      <Typography
                        tag="span"
                        className="text-xs text-center text-gray-500 dark:text-gray-400"
                      >
                        {icon.name}
                      </Typography>
                      {copiedIcon === icon.name && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-green-500 text-white text-xs rounded whitespace-nowrap z-10">
                          Copied!
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default CustomIconsSection;
