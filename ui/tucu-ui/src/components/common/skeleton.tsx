import React from 'react';
import { cn } from '../../libs/cn';

type ShapeNames = 'rectangle' | 'circle' | 'text' | 'rounded';
type AnimationNames = 'pulse' | 'wave' | 'shimmer' | 'none';
type SizeNames = 'tiny' | 'small' | 'medium' | 'large' | 'full';

const shapes: Record<ShapeNames, string> = {
  rectangle: 'rounded-none',
  circle: 'rounded-full',
  text: 'rounded-sm h-4',
  rounded: 'rounded-md',
};

const sizes: Record<SizeNames, string> = {
  tiny: 'h-4',
  small: 'h-8',
  medium: 'h-16',
  large: 'h-32',
  full: 'h-full',
};

const animations: Record<AnimationNames, string> = {
  pulse: 'animate-pulse',
  wave: 'skeleton-wave',
  shimmer: 'skeleton-shimmer',
  none: '',
};

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Animation type for the skeleton
   * @default 'shimmer'
   */
  animation?: AnimationNames;
  /**
   * Shape of the skeleton
   * @default 'rounded'
   */
  shape?: ShapeNames;
  /**
   * Predefined size of the skeleton
   * @default 'medium'
   */
  size?: SizeNames;
  /**
   * Width of the skeleton (overrides size)
   */
  width?: string;
  /**
   * Height of the skeleton (overrides size)
   */
  height?: string;
  /**
   * Number of skeleton lines to render (useful for text skeletons)
   */
  count?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function Skeleton({
  animation = 'shimmer',
  shape = 'rounded',
  size = 'medium',
  width,
  height,
  count = 1,
  className,
  style: styleProp,
  ...props
}: SkeletonProps) {
  const skeletonClasses = cn(
    'bg-[color:var(--tucu-skeleton-bg,var(--tucu-skeleton-bg-default))] w-full relative overflow-hidden',
    shapes[shape],
    !height && sizes[size],
    animations[animation],
    className
  );

  const style: React.CSSProperties = {
    ...styleProp,
    ...(width && { width }),
    ...(height && { height }),
  };

  // Render shimmer overlay only for shimmer animation
  const renderShimmer = animation === 'shimmer' && (
    <div
      className="absolute inset-0 -translate-x-full"
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, var(--tucu-skeleton-shine,var(--tucu-skeleton-shine-default)) 50%, transparent 100%)',
        animation: 'shimmer 2s ease-in-out infinite',
      }}
    />
  );

  // Render wave overlay only for wave animation
  const renderWave = animation === 'wave' && (
    <div
      className="absolute inset-0"
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--tucu-skeleton-shine,var(--tucu-skeleton-shine-default)) 50%, transparent) 25%, var(--tucu-skeleton-shine,var(--tucu-skeleton-shine-default)) 50%, color-mix(in srgb, var(--tucu-skeleton-shine,var(--tucu-skeleton-shine-default)) 50%, transparent) 75%, transparent 100%)',
        backgroundSize: '200% 100%',
        animation: 'wave 2s ease-in-out infinite',
      }}
    />
  );

  // Render multiple skeleton lines if count > 1
  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            data-tucu="skeleton"
            className={skeletonClasses}
            style={style}
            {...props}
          >
            {renderShimmer}
            {renderWave}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      data-tucu="skeleton"
      className={skeletonClasses}
      style={style}
      {...props}
    >
      {renderShimmer}
      {renderWave}
    </div>
  );
}

export default Skeleton;
