import { cn } from '../../../libs/cn';

export function CleanLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('flex h-dvh flex-col', className)}>{children}</div>;
}

export default CleanLayout;
