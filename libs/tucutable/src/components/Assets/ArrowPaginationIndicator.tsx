import React from 'react';
import useTableColors from '../../hooks/useTableColors';

interface ArrowPaginationIndicatorProps {
  size?: number;
  color?: string;
  direction: 'first' | 'last';
}

const ArrowPaginationIndicator: React.FC<ArrowPaginationIndicatorProps> = ({
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
      viewBox="0 0 25 25"
      data-testid="ArrowPaginationIndicator"
      width={size || 24}
      height={size || 24}
      fill="none"
      transform={direction === 'first' ? 'rotate(180)' : 'rotate(360)'}
    >
      <mask maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
        <rect
          x="0.960449"
          y="0.0491943"
          width="24"
          height="24"
          fill={color || colors.secondaryText}
        />
      </mask>
      <g>
        <path
          d="M11.5066 12.0492L7.43357 7.97607C7.29511 7.83762 7.22427 7.66359 7.22107 7.45397C7.21786 7.24437 7.28869 7.06714 7.43357 6.92227C7.57844 6.77739 7.75407 6.70495 7.96047 6.70495C8.16687 6.70495 8.34251 6.77739 8.48737 6.92227L12.9816 11.4165C13.0752 11.5101 13.1412 11.6092 13.1797 11.7139C13.2181 11.8186 13.2374 11.9308 13.2374 12.0504C13.2374 12.1701 13.2181 12.2819 13.1797 12.3857C13.1412 12.4895 13.0752 12.5883 12.9816 12.6818L8.48737 17.1761C8.34892 17.3145 8.17489 17.3854 7.96527 17.3886C7.75567 17.3918 7.57844 17.321 7.43357 17.1761C7.28869 17.0312 7.21625 16.8556 7.21625 16.6492C7.21625 16.4428 7.28869 16.2671 7.43357 16.1223L11.5066 12.0492ZM17.9608 6.29919C18.1734 6.29919 18.3515 6.37106 18.4951 6.51479C18.6387 6.65854 18.7104 6.83667 18.7104 7.04917V17.0492C18.7104 17.2617 18.6385 17.4398 18.4947 17.5835C18.3509 17.7273 18.1727 17.7991 17.9601 17.7991C17.7475 17.7991 17.5695 17.7273 17.4259 17.5835C17.2823 17.4398 17.2105 17.2617 17.2105 17.0492V7.04917C17.2105 6.83667 17.2824 6.65854 17.4262 6.51479C17.57 6.37106 17.7482 6.29919 17.9608 6.29919Z"
          fill={color || colors.secondaryText}
        />
      </g>
    </svg>
  );
};

export default ArrowPaginationIndicator;
