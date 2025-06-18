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
        'flex flex-wrap justify-start align-middle w-full rounded-lg bg-white p-4 shadow-card dark:bg-light-dark sm:p-6 h-full 2xl:px-8',
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardContainer;
