import React from 'react';
import { cn } from '../../libs/cn';

export type GlassPanelMaterial = 'thin' | 'regular' | 'thick' | 'sub';
export type GlassPanelRadius = 'control' | 'card' | 'panel';
export type GlassPanelElevation = 'none' | 'card' | 'panel' | 'float';

export interface GlassPanelProps extends React.HTMLAttributes<HTMLElement> {
  /** Surface material: thin for chips and controls, regular for cards, thick for toolbars and modals, sub for a blur-free sub-surface. */
  material?: GlassPanelMaterial;
  /** Corner radius role; falls back to the preset `--tucu-radius` when no role token is set. */
  radius?: GlassPanelRadius;
  /** Shadow elevation read from `--tucu-shadow-card|panel|float`. */
  elevation?: GlassPanelElevation;
  /** Plays a short condense-in animation on mount. */
  condense?: boolean;
  /** Element or component rendered as the root. */
  as?: React.ElementType;
  children?: React.ReactNode;
}

export function GlassPanel({
  material = 'regular',
  radius = 'card',
  elevation = 'card',
  condense = false,
  as: Tag = 'div',
  className,
  children,
  ...props
}: GlassPanelProps) {
  return (
    <Tag
      {...props}
      data-tucu="glass-panel"
      data-material={material}
      data-radius={radius}
      data-elevation={elevation}
      data-condense={condense ? 'true' : undefined}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}

export default GlassPanel;
