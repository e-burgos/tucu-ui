import React from 'react';
import cn from 'classnames';
import { CardContainer } from './card-container';
import { Typography } from '../typography';
import { Badge } from '../common/badge';

export interface FeatureCardProps {
  /** Icon element (e.g. LucideIcon) */
  icon: React.ReactNode;
  /** Card title */
  title: string;
  /** Badge text (e.g. "25+", "Built-in") */
  badge?: string;
  /** Description text */
  description: React.ReactNode;
  /** Gradient class for icon background (e.g. "from-pink-500 to-rose-500") */
  iconBgClassName?: string;
  /** Extra classes for the card container */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Layout direction: vertical (centered, default), horizontal (icon left), or showcase (icon + stacked title/badge + tags) */
  layout?: 'vertical' | 'horizontal' | 'showcase';
  /** Tags displayed at the bottom (only for showcase layout) */
  tags?: string[];
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  badge,
  description,
  iconBgClassName = 'from-blue-500 to-cyan-500',
  className,
  onClick,
  layout = 'vertical',
  tags,
}) => {
  if (layout === 'showcase') {
    return (
      <CardContainer
        className={cn(
          'group hover:shadow-large transition-all duration-300 hover:-translate-y-1',
          onClick && 'cursor-pointer',
          className
        )}
        onClick={onClick}
      >
        <div className="w-full space-y-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'p-3 rounded-xl bg-linear-to-br shadow-lg group-hover:scale-110 transition-all duration-300',
                iconBgClassName
              )}
            >
              <span className="text-white">{icon}</span>
            </div>
            <div>
              <Typography tag="h4">{title}</Typography>
              {badge && (
                <Badge variant="outline" size="small">
                  {badge}
                </Badge>
              )}
            </div>
          </div>
          <Typography
            tag="caption"
            className="text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            {description}
          </Typography>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="soft" size="small">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContainer>
    );
  }

  if (layout === 'horizontal') {
    return (
      <CardContainer
        className={cn(
          'group hover:shadow-large transition-all duration-300 hover:-translate-y-1',
          onClick && 'cursor-pointer',
          className
        )}
        onClick={onClick}
      >
        <div className="w-full space-y-4">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                'p-3 rounded-xl bg-linear-to-br shadow-lg group-hover:scale-110 transition-all duration-300 hover:shadow-xl',
                iconBgClassName
              )}
            >
              <span className="text-white">{icon}</span>
            </div>
            <div className="flex items-center gap-2">
              <Typography
                tag="h5"
                className="group-hover:text-primary transition-colors duration-300"
              >
                {title}
              </Typography>
              {badge && (
                <Badge variant="outline" size="small">
                  {badge}
                </Badge>
              )}
            </div>
          </div>
          <Typography
            tag="caption"
            className="text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            {description}
          </Typography>
        </div>
      </CardContainer>
    );
  }

  return (
    <CardContainer
      className={cn(
        'group hover:shadow-large transition-all duration-300 hover:-translate-y-1',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="w-full space-y-4 text-center">
        <div
          className={cn(
            'w-16 h-16 mx-auto rounded-xl flex items-center justify-center',
            'bg-linear-to-br shadow-lg group-hover:scale-110 transition-transform duration-200',
            iconBgClassName
          )}
        >
          <span className="text-white">{icon}</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Typography tag="h4">{title}</Typography>
            {badge && (
              <Badge variant="outline" size="small">
                {badge}
              </Badge>
            )}
          </div>
          <Typography
            tag="caption"
            className="text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            {description}
          </Typography>
        </div>
      </div>
    </CardContainer>
  );
};

export default FeatureCard;
