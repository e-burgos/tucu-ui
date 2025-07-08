import cn from 'classnames';

export interface TransactionInfoTypes {
  label: string;
  value?: string | number;
  className?: string;
}

export function TransactionInfo({
  label,
  value,
  className,
}: TransactionInfoTypes) {
  return (
    <div
      className={cn(
        'flex items-center justify-between w-full max-w-md dark:text-gray-300 border border-gray-100 dark:border-gray-700 dark:bg-light-dark bg-white rounded-lg py-3 px-4',
        className
      )}
    >
      <span className="font-medium">{label}</span>
      <span>{value ? value : '_ _'}</span>
    </div>
  );
}

export default TransactionInfo;
