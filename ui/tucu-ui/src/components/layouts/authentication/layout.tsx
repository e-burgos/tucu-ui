import cn from 'classnames';

export function AuthLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex h-100vh flex-col', className)}>{children}</div>
  );
}

export default AuthLayout;
