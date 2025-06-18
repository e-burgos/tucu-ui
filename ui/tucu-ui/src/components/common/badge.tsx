import cn from 'classnames';

type BadgeProps = {
  className?: string;
  status?: 'active' | 'inactive';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
} & React.HTMLAttributes<HTMLSpanElement>;

export const Badge = ({
  className,
  status = 'active',
  size = 'sm',
  variant = 'default',
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(
        'rounded-full bg-brand text-sm px-2 py-1 h-6 w-fit flex items-center justify-center',
        className,
        {
          'bg-green-500/10 border border-green-500': status === 'active',
          'bg-red-500/10 border border-red-500': status === 'inactive',
          'h-6 w-6': size === 'sm',
          'h-6 w-fit': size === 'md',
          'h-7 w-full': size === 'lg',
          'bg-transparent border border-gray-300': variant === 'outline',
        }
      )}
      {...props}
    />
  );
};

export default Badge;
