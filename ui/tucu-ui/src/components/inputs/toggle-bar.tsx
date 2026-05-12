import { Switch } from './switch';
import { type ControlColor } from './helpers/control-colors';

export interface ToggleBarProps {
  title: string;
  subTitle?: string;
  icon?: React.ReactNode;
  color?: ControlColor;
  checked: boolean;
  onChange: () => void;
}

export function ToggleBar({
  title,
  subTitle,
  icon,
  color,
  checked,
  onChange,
  children,
}: React.PropsWithChildren<ToggleBarProps>) {
  return (
    <div
      data-tucu="toggle-bar"
      className="rounded-lg bg-white shadow-card dark:bg-light-dark"
    >
      <div className="relative flex items-center justify-between gap-4 p-4">
        <div className="flex items-center ltr:mr-6 rtl:ml-6">
          {icon && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-900 ltr:mr-2 rtl:ml-2 dark:bg-gray-600 dark:text-gray-400">
              {icon}
            </div>
          )}
          <div>
            <span className="block text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-sm">
              {title}
            </span>
            {subTitle && (
              <span className="mt-1 hidden text-sm tracking-tighter text-gray-600 dark:text-gray-400 sm:block">
                {subTitle}
              </span>
            )}
          </div>
        </div>

        <div className="shrink-0">
          <Switch
            checked={checked}
            onChange={() => onChange()}
            variant="solid"
            color={color}
          />
        </div>
      </div>

      {children && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

export default ToggleBar;
