import React from 'react';
import useTableColors from '../../hooks/useTableColors';

interface ArrowIndicatorProps {
  size?: number;
  color?: string;
  direction: 'up' | 'down' | 'left' | 'right';
}

const ArrowIndicator: React.FC<ArrowIndicatorProps> = ({
  size,
  color,
  direction,
}) => {
  const { colors } = useTableColors();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="ArrowIndicator"
      width={size || 24}
      height={size || 24}
      fill={color || colors.secondaryText}
      transform={
        direction === 'up'
          ? 'rotate(180)'
          : direction === 'left'
            ? 'rotate(90)'
            : direction === 'right'
              ? 'rotate(270)'
              : undefined
      }
    >
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
    </svg>
  );
};

export default ArrowIndicator;
