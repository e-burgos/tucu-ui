'use client';

import React from 'react';
import { cn } from '../../libs/cn';
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
      data-tucu="color-card"
      data-color={color}
      className={cn(
        'p-4 sm:p-6 border rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
        onClick && 'cursor-pointer',
        !color && colorClassName,
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
