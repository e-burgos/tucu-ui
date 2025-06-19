interface SkeletonProps {
  animation?: boolean;
  className?: string;
}

export function Skeleton({ className, animation }: SkeletonProps) {
  const classNames = `bg-gray-200 dark:bg-slate-700 w-full h-10 rounded-xs ${className} ${
    animation ? 'animate-pulse' : ''
  }`;

  return <div className={classNames}></div>;
}

export default Skeleton;
