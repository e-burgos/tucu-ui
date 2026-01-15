export function AdminRightArea({
  rightButton,
}: {
  rightButton?: React.ReactNode;
}) {
  return (
    <div className="relative order-last flex shrink-0 items-center gap-[16px] sm:gap-[24px] lg:gap-[32px]">
      {rightButton && rightButton}
    </div>
  );
}
