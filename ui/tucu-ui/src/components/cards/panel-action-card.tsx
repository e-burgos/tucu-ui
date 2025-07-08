import React from 'react';
import { SimpleBar } from '../common';
import Button, { ButtonProps } from '../buttons';

interface PanelActionCardProps {
  title: string;
  actions?: {
    label: string;
    variant?: ButtonProps['variant'];
    color?: ButtonProps['color'];
    size?: ButtonProps['size'];
    onClick: () => void;
  }[];
  children: React.ReactNode;
  className?: string;
}

export const PanelActionCard: React.FC<PanelActionCardProps> = ({
  title,
  children,
  actions,
  className,
}) => {
  return (
    <div
      className={`w-full max-w-md border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden ${className}`}
    >
      <div className="p-4 bg-white dark:bg-gray-800">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <SimpleBar className="h-[250px]">
        <div className="p-4 bg-white dark:bg-gray-800">{children}</div>
      </SimpleBar>
      {actions && (
        <div className="flex gap-2 h-auto justify-end items-center flex-wrap p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          {actions?.map((action) => (
            <Button
              key={action.label}
              variant={action.variant || 'solid'}
              size={action.size || 'small'}
              color={action.color || 'primary'}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PanelActionCard;
