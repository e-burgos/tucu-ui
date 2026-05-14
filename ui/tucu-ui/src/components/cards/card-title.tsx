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
    <fieldset
      data-tucu="card-title"
      className={cn(
        'w-full min-w-0 relative rounded-lg flex flex-col justify-start',
        border
          ? 'border border-gray-200 dark:border-gray-700 sm:px-6 px-2 sm:pb-6 pb-2'
          : 'sm:p-6 p-2 sm:pt-[32px] pt-[24px]',
        className
      )}
    >
      {title && (
        <legend
          data-tucu="card-title-label"
          className={cn(
            'font-bold sm:text-2xl text-lg dark:text-white text-current px-2',
            border ? 'ml-4' : 'absolute -top-4 left-4 m-0'
          )}
        >
          {title}
        </legend>
      )}
      {children}
    </fieldset>
  );
};

export default CardTitle;
