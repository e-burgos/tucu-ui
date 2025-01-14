import React from 'react';
import useTableColors from '../../hooks/useTableColors';

interface MoreIndicatorProps {
  size?: number;
  color?: string;
  direction: 'vertical' | 'horizontal';
}

const MoreIndicator: React.FC<MoreIndicatorProps> = ({
  size,
  color,
  direction,
}) => {
  const { colors } = useTableColors();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      data-testid="MoreIndicator"
      width={size || 24}
      height={size || 24}
      fill="none"
      transform={direction === 'horizontal' ? 'rotate(90)' : ''}
    >
      <mask maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill={color || colors.secondaryText} />
      </mask>
      <g>
        <path
          d="M12 19.275C11.5833 19.275 11.2293 19.129 10.938 18.837C10.646 18.5456 10.5 18.1916 10.5 17.775C10.5 17.3583 10.646 17.004 10.938 16.712C11.2293 16.4206 11.5833 16.275 12 16.275C12.4167 16.275 12.7707 16.4206 13.062 16.712C13.354 17.004 13.5 17.3583 13.5 17.775C13.5 18.1916 13.354 18.5456 13.062 18.837C12.7707 19.129 12.4167 19.275 12 19.275ZM12 13.5C11.5833 13.5 11.2293 13.354 10.938 13.062C10.646 12.7706 10.5 12.4166 10.5 12C10.5 11.5833 10.646 11.2293 10.938 10.938C11.2293 10.646 11.5833 10.5 12 10.5C12.4167 10.5 12.7707 10.646 13.062 10.938C13.354 11.2293 13.5 11.5833 13.5 12C13.5 12.4166 13.354 12.7706 13.062 13.062C12.7707 13.354 12.4167 13.5 12 13.5ZM12 7.72498C11.5833 7.72498 11.2293 7.57898 10.938 7.28698C10.646 6.99564 10.5 6.64164 10.5 6.22498C10.5 5.80831 10.646 5.45398 10.938 5.16198C11.2293 4.87064 11.5833 4.72498 12 4.72498C12.4167 4.72498 12.7707 4.87064 13.062 5.16198C13.354 5.45398 13.5 5.80831 13.5 6.22498C13.5 6.64164 13.354 6.99564 13.062 7.28698C12.7707 7.57898 12.4167 7.72498 12 7.72498Z"
          fill={color || colors.secondaryText}
        />
      </g>
    </svg>
  );
};

export default MoreIndicator;
