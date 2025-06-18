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
      className={`flex flex-col border border-gray-200 dark:border-gray-700 rounded-lg w-[80vw] h-[80vh] p-8 max-h-[50%] overflow-y-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default StoryContainer;
