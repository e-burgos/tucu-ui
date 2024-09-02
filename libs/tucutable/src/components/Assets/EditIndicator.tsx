import React from 'react';
import useTableColors from '../../hooks/useTableColors';

interface EditIndicatorProps {
  size?: number;
  color?: string;
}

const EditIndicator: React.FC<EditIndicatorProps> = ({ size, color }) => {
  const { colors } = useTableColors();
  return (
    <svg
      viewBox="0 0 24 24"
      data-testid="EditIndicator"
      width={size || 24}
      height={size || 24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill={color || colors.secondaryText} />
      </mask>
      <g>
        <path
          d="M4.59802 20.4614C4.28019 20.5319 4.00652 20.4524 3.77702 20.2229C3.54752 19.9934 3.46802 19.7197 3.53852 19.4019L4.37502 15.3864L8.61352 19.6249L4.59802 20.4614ZM8.61352 19.6249L4.37502 15.3864L15.5943 4.16715C15.9391 3.82232 16.366 3.6499 16.875 3.6499C17.384 3.6499 17.8109 3.82232 18.1558 4.16715L19.8328 5.84415C20.1776 6.18899 20.35 6.6159 20.35 7.1249C20.35 7.6339 20.1776 8.06082 19.8328 8.40565L8.61352 19.6249ZM16.6635 5.22115L6.43852 15.4364L8.56352 17.5614L18.7788 7.3364C18.8364 7.27874 18.8653 7.20665 18.8653 7.12015C18.8653 7.03349 18.8364 6.96132 18.7788 6.90365L17.0963 5.22115C17.0386 5.16349 16.9664 5.13465 16.8798 5.13465C16.7933 5.13465 16.7212 5.16349 16.6635 5.22115Z"
          fill={color || colors.secondaryText}
        />
      </g>
    </svg>
  );
};

export default EditIndicator;
