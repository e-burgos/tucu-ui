import React from 'react';
import cn from 'classnames';
import { Typography } from '../typography';

export type ColorCardColor =
  | 'blue'
  | 'indigo'
  | 'cyan'
  | 'purple'
  | 'emerald'
  | 'orange'
  | 'green'
  | 'red'
  | 'pink'
  | 'amber'
  | 'teal'
  | 'violet'
  | 'rose'
  | 'sky';

const colorPresets: Record<ColorCardColor, string> = {
  blue: 'bg-linear-to-br from-blue-500/10 to-cyan-500/10 text-blue-700 border-blue-200 dark:from-blue-400/20 dark:to-cyan-400/20 dark:text-blue-300 dark:border-blue-700',
  indigo:
    'bg-linear-to-br from-indigo-500/10 to-blue-500/10 text-indigo-700 border-indigo-200 dark:from-indigo-400/20 dark:to-blue-400/20 dark:text-indigo-300 dark:border-indigo-700',
  cyan: 'bg-linear-to-br from-cyan-500/10 to-teal-500/10 text-cyan-700 border-cyan-200 dark:from-cyan-400/20 dark:to-teal-400/20 dark:text-cyan-300 dark:border-cyan-700',
  purple:
    'bg-linear-to-br from-purple-500/10 to-pink-500/10 text-purple-700 border-purple-200 dark:from-purple-400/20 dark:to-pink-400/20 dark:text-purple-300 dark:border-purple-700',
  emerald:
    'bg-linear-to-br from-emerald-500/10 to-green-500/10 text-emerald-700 border-emerald-200 dark:from-emerald-400/20 dark:to-green-400/20 dark:text-emerald-300 dark:border-emerald-700',
  orange:
    'bg-linear-to-br from-orange-500/10 to-red-500/10 text-orange-700 border-orange-200 dark:from-orange-400/20 dark:to-red-400/20 dark:text-orange-300 dark:border-orange-700',
  green:
    'bg-linear-to-br from-green-500/10 to-emerald-500/10 text-green-700 border-green-200 dark:from-green-400/20 dark:to-emerald-400/20 dark:text-green-300 dark:border-green-700',
  red: 'bg-linear-to-br from-red-500/10 to-rose-500/10 text-red-700 border-red-200 dark:from-red-400/20 dark:to-rose-400/20 dark:text-red-300 dark:border-red-700',
  pink: 'bg-linear-to-br from-pink-500/10 to-purple-500/10 text-pink-700 border-pink-200 dark:from-pink-400/20 dark:to-purple-400/20 dark:text-pink-300 dark:border-pink-700',
  amber:
    'bg-linear-to-br from-amber-500/10 to-orange-500/10 text-amber-700 border-amber-200 dark:from-amber-400/20 dark:to-orange-400/20 dark:text-amber-300 dark:border-amber-700',
  teal: 'bg-linear-to-br from-teal-500/10 to-cyan-500/10 text-teal-700 border-teal-200 dark:from-teal-400/20 dark:to-cyan-400/20 dark:text-teal-300 dark:border-teal-700',
  violet:
    'bg-linear-to-br from-violet-500/10 to-indigo-500/10 text-violet-700 border-violet-200 dark:from-violet-400/20 dark:to-indigo-400/20 dark:text-violet-300 dark:border-violet-700',
  rose: 'bg-linear-to-br from-rose-500/10 to-pink-500/10 text-rose-700 border-rose-200 dark:from-rose-400/20 dark:to-pink-400/20 dark:text-rose-300 dark:border-rose-700',
  sky: 'bg-linear-to-br from-sky-500/10 to-blue-500/10 text-sky-700 border-sky-200 dark:from-sky-400/20 dark:to-blue-400/20 dark:text-sky-300 dark:border-sky-700',
};

export interface ColorCardProps {
  /** Icon element (e.g. LucideIcon) */
  icon: React.ReactNode;
  /** Card title */
  title: string;
  /** Description text */
  description: string;
  /** Predefined color preset (takes precedence over colorClassName) */
  color?: ColorCardColor;
  /** Color classes for background gradient, text color, and border (fallback for custom colors not in presets) */
  colorClassName?: string;
  /** Extra classes for the container */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

export const ColorCard: React.FC<ColorCardProps> = ({
  icon,
  title,
  description,
  color,
  colorClassName,
  className,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'p-4 sm:p-6 border rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
        onClick && 'cursor-pointer',
        color ? colorPresets[color] : colorClassName,
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <Typography tag="h5">{title}</Typography>
      </div>
      <Typography tag="caption" className="opacity-80">
        {description}
      </Typography>
    </div>
  );
};

export default ColorCard;
