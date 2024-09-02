import React from 'react';
import useTableColors from '../../hooks/useTableColors';

interface RowIndicatorProps {
  size?: number;
  color?: string;
}

const RowIndicator: React.FC<RowIndicatorProps> = ({ size, color }) => {
  const { colors } = useTableColors();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      data-testid="RowIndicator"
      width={size || 24}
      height={size || 24}
      fill="none"
    >
      <mask maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill={color || colors.secondaryText} />
      </mask>
      <g>
        <path
          d="M19 18.7V15.675H5V18.7C5 18.7833 5.02933 18.8543 5.088 18.913C5.146 18.971 5.21667 19 5.3 19H18.7C18.7833 19 18.8543 18.971 18.913 18.913C18.971 18.8543 19 18.7833 19 18.7ZM19 14.175V9.825H5V14.175H19ZM19 8.325V5.3C19 5.21667 18.971 5.146 18.913 5.088C18.8543 5.02933 18.7833 5 18.7 5H5.3C5.21667 5 5.146 5.02933 5.088 5.088C5.02933 5.146 5 5.21667 5 5.3V8.325H19ZM5.3 20.5C4.8 20.5 4.375 20.325 4.025 19.975C3.675 19.625 3.5 19.2 3.5 18.7V5.3C3.5 4.8 3.675 4.375 4.025 4.025C4.375 3.675 4.8 3.5 5.3 3.5H18.7C19.2 3.5 19.625 3.675 19.975 4.025C20.325 4.375 20.5 4.8 20.5 5.3V18.7C20.5 19.2 20.325 19.625 19.975 19.975C19.625 20.325 19.2 20.5 18.7 20.5H5.3Z"
          fill={color || colors.secondaryText}
        />
      </g>
    </svg>
  );
};

export default RowIndicator;
