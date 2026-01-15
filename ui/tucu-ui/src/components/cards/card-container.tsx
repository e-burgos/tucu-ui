import React from 'react';
import cn from 'classnames';
export interface CardContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export const CardContainer: React.FC<CardContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col flex-wrap justify-start align-middle w-full h-full rounded-lg border border-gray-200/50 dark:border-gray-700/50 shadow-card bg-light-dark p-[16px] sm:p-[24px] 2xl:p-[32px]',
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardContainer;
