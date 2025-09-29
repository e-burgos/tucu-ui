import React from 'react';
import { Scrollbar } from './scrollbar';

export interface ScrollbarNativeProps {
  style?: React.CSSProperties;
  className?: string;
  autoHide?: 'never' | 'scroll' | 'leave' | 'move';
  children: React.ReactNode;
  // Legacy prop compatibility
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Record<string, any>;
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
      scrollbarStyle={{
        track: {
          backgroundColor: 'transparent',
        },
        thumb: {
          backgroundColor: 'transparent',
        },
      }}
      {...props}
    >
      {children}
    </Scrollbar>
  );
}

export default ScrollbarNative;
