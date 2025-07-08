import React from 'react';
import { SimpleBar } from '../common';

interface PanelCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const PanelCard: React.FC<PanelCardProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div
      className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${className}`}
    >
      <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-medium">{title}</h3>
      </div>
      <SimpleBar className="h-[300px]">
        <div className="p-3">{children}</div>
      </SimpleBar>
    </div>
  );
};

export default PanelCard;
