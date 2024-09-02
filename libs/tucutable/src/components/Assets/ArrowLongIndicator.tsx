import React from 'react';
import useTableColors from '../../hooks/useTableColors';

interface ArrowLongIndicatorProps {
  size?: number;
  color?: string;
  direction: 'up' | 'down' | 'left' | 'right';
}

const ArrowLongIndicator: React.FC<ArrowLongIndicatorProps> = ({
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
      viewBox="0 0 25 24"
      data-testid="ArrowLongIndicator"
      width={(size && size + 1) || 25}
      height={size || 24}
      fill={'none'}
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
      <mask maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
        <rect
          x="0.441895"
          width="24"
          height="24"
          fill={color || colors.secondaryText}
        />
      </mask>
      <g mask="url(#mask0_12_2693)">
        <path
          d="M12.4417 19.25C12.325 19.25 12.2127 19.2293 12.1047 19.188C11.996 19.146 11.9 19.075 11.8167 18.975L5.3417 12.525C5.1917 12.375 5.1167 12.2 5.1167 12C5.1167 11.8 5.1917 11.6167 5.3417 11.45C5.50837 11.3 5.6877 11.225 5.8797 11.225C6.07103 11.225 6.25003 11.3 6.4167 11.45L11.6917 16.75V5.125C11.6917 4.90833 11.7627 4.729 11.9047 4.587C12.046 4.44567 12.225 4.375 12.4417 4.375C12.6584 4.375 12.8377 4.45 12.9797 4.6C13.121 4.75 13.1917 4.925 13.1917 5.125V16.75L18.4667 11.45C18.6334 11.3 18.8124 11.225 19.0037 11.225C19.1957 11.225 19.375 11.3 19.5417 11.45C19.6917 11.6167 19.7667 11.8 19.7667 12C19.7667 12.2 19.6917 12.375 19.5417 12.525L13.0667 18.975C12.9834 19.075 12.8877 19.146 12.7797 19.188C12.671 19.2293 12.5584 19.25 12.4417 19.25Z"
          fill={color || colors.secondaryText}
        />
      </g>
    </svg>
  );
};

export default ArrowLongIndicator;
