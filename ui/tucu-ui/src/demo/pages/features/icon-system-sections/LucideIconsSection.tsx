import React, { useState } from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
} from '../../../../index';

const LucideIconsSection: React.FC = () => {
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const lucideIconShowcase = [
    {
      category: 'Navigation & Layout',
      description: 'Essential navigation and layout icons',
      icon: (
        <LucideIcons.Navigation className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-blue-500 via-indigo-500 to-purple-500',
      icons: [
        { name: 'Home', component: <LucideIcons.Home className="w-6 h-6" /> },
        { name: 'Menu', component: <LucideIcons.Menu className="w-6 h-6" /> },
        {
          name: 'ArrowLeft',
          component: <LucideIcons.ArrowLeft className="w-6 h-6" />,
        },
        {
          name: 'ArrowRight',
          component: <LucideIcons.ArrowRight className="w-6 h-6" />,
        },
        {
          name: 'ChevronUp',
          component: <LucideIcons.ChevronUp className="w-6 h-6" />,
        },
        {
          name: 'ChevronDown',
          component: <LucideIcons.ChevronDown className="w-6 h-6" />,
        },
        {
          name: 'Grid3X3',
          component: <LucideIcons.Grid3X3 className="w-6 h-6" />,
        },
        { name: 'List', component: <LucideIcons.List className="w-6 h-6" /> },
      ],
    },
    {
      category: 'Actions & Controls',
      description: 'Common action and interactive control icons',
      icon: (
        <LucideIcons.Zap className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-purple-500 via-pink-500 to-rose-500',
      icons: [
        { name: 'Plus', component: <LucideIcons.Plus className="w-6 h-6" /> },
        { name: 'Minus', component: <LucideIcons.Minus className="w-6 h-6" /> },
        { name: 'X', component: <LucideIcons.X className="w-6 h-6" /> },
        { name: 'Check', component: <LucideIcons.Check className="w-6 h-6" /> },
        { name: 'Edit', component: <LucideIcons.Edit className="w-6 h-6" /> },
        {
          name: 'Trash2',
          component: <LucideIcons.Trash2 className="w-6 h-6" />,
        },
        {
          name: 'Download',
          component: <LucideIcons.Download className="w-6 h-6" />,
        },
        {
          name: 'Upload',
          component: <LucideIcons.Upload className="w-6 h-6" />,
        },
      ],
    },
    {
      category: 'Status & Feedback',
      description: 'Icons for status indicators and user feedback',
      icon: (
        <LucideIcons.Bell className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-green-500 via-emerald-500 to-teal-500',
      icons: [
        {
          name: 'CheckCircle',
          component: <LucideIcons.CheckCircle className="w-6 h-6" />,
        },
        {
          name: 'AlertCircle',
          component: <LucideIcons.AlertCircle className="w-6 h-6" />,
        },
        {
          name: 'AlertTriangle',
          component: <LucideIcons.AlertTriangle className="w-6 h-6" />,
        },
        { name: 'Info', component: <LucideIcons.Info className="w-6 h-6" /> },
        {
          name: 'Loader2',
          component: <LucideIcons.Loader2 className="w-6 h-6" />,
        },
        { name: 'Clock', component: <LucideIcons.Clock className="w-6 h-6" /> },
        { name: 'Eye', component: <LucideIcons.Eye className="w-6 h-6" /> },
        {
          name: 'EyeOff',
          component: <LucideIcons.EyeOff className="w-6 h-6" />,
        },
      ],
    },
  ];

  const handleCopyIcon = (iconName: string) => {
    const iconCode = `<LucideIcons.${iconName} className="w-6 h-6" />`;
    navigator.clipboard.writeText(iconCode);
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  return (
    <>
      <HeroCard
        title="Lucide React Icons"
        description="Access to 1500+ high-quality open-source icons through the LucideIcons namespace. Stroke-based, consistent, and fully compatible with Tailwind CSS."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Sparkles className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Popular Icons
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            A sample of commonly used Lucide icons — click to copy usage code
          </Typography>
        </div>

        <div className="space-y-6">
          {lucideIconShowcase.map((category, index) => (
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
                      <Typography tag="h3" className="text-base font-semibold">
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
                        className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group relative"
                        onClick={() => handleCopyIcon(icon.name)}
                        title={`Click to copy: LucideIcons.${icon.name}`}
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
      </section>
    </>
  );
};

export default LucideIconsSection;
