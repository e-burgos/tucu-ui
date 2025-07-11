import React from 'react';
import { Scrollbar } from './scrollbar';

export interface ScrollbarNativeProps {
  style?: React.CSSProperties;
  className?: string;
  autoHide?: 'never' | 'scroll' | 'leave' | 'move';
  children: React.ReactNode;
  // Legacy prop compatibility
  options?: Record<string, any>;
  defer?: boolean;
}

/**
 * Drop-in replacement for the original Scrollbar component that used overlayscrollbars-react.
 * This component maintains the same API but uses a custom implementation without external dependencies.
 */
export function ScrollbarNative({
  options,
  style,
  className,
  autoHide = 'scroll',
  children,
  defer, // Ignored for compatibility
  ...props
}: ScrollbarNativeProps) {
  // Extract autoHide from legacy options if provided
  const finalAutoHide = options?.scrollbars?.autoHide || autoHide;

  return (
    <Scrollbar
      style={style}
      className={className}
      autoHide={finalAutoHide}
      direction="vertical"
      {...props}
    >
      {children}
    </Scrollbar>
  );
}

export default ScrollbarNative;
