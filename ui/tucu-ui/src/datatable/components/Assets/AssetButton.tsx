import React from 'react';

/**
 * AssetButtonProps
 * @category libs/datatable
 * @subcategory Components
 *
 * @param children - The children
 * @param disabled - The disabled
 * @param active - The active
 * @param sx - The sx
 * @param className - The className
 * @param onHover - The onHover
 * @param onClick - The onClick
 */

export interface AssetButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  /**
   * @deprecated unused
   */
  active?: boolean;
  sx?: React.CSSProperties;
  className?: string;
  /**
   * @deprecated unused
   */
  bgColor?: 'row' | 'header' | 'actionHover' | 'paper' | 'actionBg';
  onHover?: React.MouseEventHandler<HTMLButtonElement>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const AssetButton: React.FC<AssetButtonProps> = ({
  children,
  disabled,
  sx,
  className,
  onClick,
  onHover,
}) => {
  return (
    <button
      {...{
        onMouseEnter: onHover,
        disabled: disabled,
        onClick: onClick,
        className,
        style: {
          cursor: disabled ? 'not-allowed' : 'pointer',
          borderRadius: '50%',
          border: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 'fit-content',
          height: 'fit-content',
          padding: '4px',
          ...sx,
        },
      }}
    >
      {children}
    </button>
  );
};

export default AssetButton;
