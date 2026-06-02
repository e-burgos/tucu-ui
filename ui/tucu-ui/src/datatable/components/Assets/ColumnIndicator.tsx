import React from 'react';

/**
 * ColumnIndicatorProps
 * @category libs/datatable
 * @subcategory Components
 *
 * @param size - The size
 * @param color - The color
 */
interface ColumnIndicatorProps {
  size?: number;
  color?: string;
}

export const ColumnIndicator: React.FC<ColumnIndicatorProps> = ({
  size,
  color,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      data-testid="ColumnIndicator"
      width={size || 24}
      height={size || 24}
      fill="none"
    >
      <mask
        id="mask0_802_737"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill={color || 'var(--color-table-primary)'} />
      </mask>
      <g>
        <path
          d="M3.58979 15H6.94717V4.99998H3.58979C3.515 4.99998 3.45356 5.02402 3.40548 5.0721C3.3574 5.12019 3.33335 5.18163 3.33335 5.25642V14.7435C3.33335 14.8183 3.3574 14.8798 3.40548 14.9279C3.45356 14.9759 3.515 15 3.58979 15ZM8.19712 15H11.8029V4.99998H8.19712V15ZM13.0529 15H16.4102C16.485 15 16.5465 14.9759 16.5946 14.9279C16.6426 14.8798 16.6667 14.8183 16.6667 14.7435V5.25642C16.6667 5.18163 16.6426 5.12019 16.5946 5.0721C16.5465 5.02402 16.485 4.99998 16.4102 4.99998H13.0529V15ZM3.58979 16.25C3.16885 16.25 2.81254 16.1041 2.52087 15.8125C2.22921 15.5208 2.08337 15.1645 2.08337 14.7435V5.25642C2.08337 4.83547 2.22921 4.47917 2.52087 4.1875C2.81254 3.89583 3.16885 3.75 3.58979 3.75H16.4102C16.8312 3.75 17.1875 3.89583 17.4792 4.1875C17.7708 4.47917 17.9167 4.83547 17.9167 5.25642V14.7435C17.9167 15.1645 17.7708 15.5208 17.4792 15.8125C17.1875 16.1041 16.8312 16.25 16.4102 16.25H3.58979Z"
          fill={color || 'var(--color-table-primary)'}
        />
      </g>
    </svg>
  );
};

export default ColumnIndicator;
