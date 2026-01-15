import React from 'react';
import cn from 'classnames';

export interface ListItemProps
  extends Omit<
    React.HTMLAttributes<HTMLLIElement | HTMLButtonElement>,
    'onClick' | 'id' | 'content'
  > {
  id: string | number;
  label?: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  active?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  id,
  label,
  content,
  icon,
  onClick,
  disabled,
  className,
  active,
  ...restProps
}) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <li key={id} {...restProps}>
      {content ? (
        <div
          className={cn(
            'px-[12px] py-[8px] rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-700/50',
            active && 'bg-gray-100 dark:bg-gray-700',
            className
          )}
          onClick={handleClick}
        >
          {content}
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          disabled={disabled}
          className={cn(
            'flex w-full items-center gap-[4px] rounded-lg px-[12px] py-[8px] text-sm font-medium uppercase text-gray-600 transition hover:bg-gray-200 hover:text-gray-900 dark:text-white dark:hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed',
            active &&
              'bg-gray-100 dark:bg-gray-700 !text-gray-900 dark:!text-white',
            className
          )}
          role="menuitem"
          aria-disabled={disabled}
        >
          {icon && (
            <span className="w-[16px] h-[16px] flex items-center justify-center">
              {icon}
            </span>
          )}
          {label && <span className="text-[14px]">{label}</span>}
        </button>
      )}
    </li>
  );
};

export default ListItem;
