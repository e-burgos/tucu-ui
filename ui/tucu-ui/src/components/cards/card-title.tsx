import React from 'react';
import cn from 'classnames';

export interface CardTitleProps {
  border?: boolean;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  border = true,
  title,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'w-full relative rounded-lg flex flex-col justify-start sm:p-6 p-2 sm:pt-[32px] pt-[24px]',
        border && 'border border-gray-200 dark:border-gray-700',
        className
      )}
    >
      {title && (
        <h3
          className={`absolute -top-4 left-4 m-0 bg-light-dark  font-bold sm:text-2xl text-lg dark:text-white text-current px-2 rounded-lg`}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default CardTitle;
