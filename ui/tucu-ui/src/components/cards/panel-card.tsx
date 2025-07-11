import React from 'react';
import { Scrollbar } from '../common';

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
      <Scrollbar
        className="h-[300px]"
        autoHide="leave"
        direction="vertical"
        scrollbarStyle={{
          track: {
            backgroundColor: 'transparent',
          },
          thumb: {
            borderRadius: '8px',
            width: '6px',
          },
        }}
      >
        <div className="p-3">{children}</div>
      </Scrollbar>
    </div>
  );
};

export default PanelCard;
