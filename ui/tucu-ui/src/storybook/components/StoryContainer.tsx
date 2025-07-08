import React from 'react';

export const StoryContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center border border-gray-200 dark:border-gray-700 rounded-lg w-[90%] h-[90%] p-8 overflow-y-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default StoryContainer;
