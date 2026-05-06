import cn from 'classnames';

export interface KeyValueRowProps {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
  accent?: boolean;
  className?: string;
}

export function KeyValueRow({
  label,
  value,
  mono,
  accent,
  className,
}: KeyValueRowProps) {
  return (
    <div className={cn('flex items-center justify-between py-1.5', className)}>
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      <span
        className={cn(
          'text-xs font-medium',
          mono && 'font-mono tabular-nums',
          accent ? 'text-brand' : 'text-gray-900 dark:text-gray-100'
        )}
      >
        {value}
      </span>
    </div>
  );
}

export default KeyValueRow;
