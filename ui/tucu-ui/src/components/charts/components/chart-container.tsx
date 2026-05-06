import { ResponsiveContainer } from 'recharts';
import cn from 'classnames';

interface ChartContainerProps {
  children: React.ReactNode;
  height?: number;
  className?: string;
  ariaLabel?: string;
}

export function ChartContainer({
  children,
  height = 300,
  className,
  ariaLabel,
}: ChartContainerProps) {
  return (
    <div
      className={cn(
        'w-full outline-none ring-0 [&_*]:outline-none [&_*]:ring-0',
        className
      )}
      role="img"
      aria-label={ariaLabel}
    >
      <ResponsiveContainer width="100%" height={height}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}
