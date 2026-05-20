import React from 'react';
import cn from 'classnames';
export interface CardContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export const CardContainer: React.FC<CardContainerProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div
      data-tucu="card"
      {...rest}
      className={cn(
        'flex flex-col flex-wrap justify-start align-middle w-full h-full min-w-0 rounded-lg border border-gray-200/50 dark:border-gray-700/50 shadow-card bg-light-dark p-[16px] sm:p-[24px] 2xl:p-[32px]',
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardContainer;
