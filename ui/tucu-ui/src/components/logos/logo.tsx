import AnchorLink from '../links/anchor-link';
import { useIsMounted } from '../../hooks/use-is-mounted';
import cn from 'classnames';
import { useTheme } from '../../themes/use-theme';
import { PRESET_COLORS } from '../../themes/config';
import { PRESET_LABEL_COLORS } from '../../themes/config';

export interface LogoPropTypes {
  name: string;
  secondName?: string;
  path?: string;
  preset?: PRESET_LABEL_COLORS;
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  isoType?: boolean;
}

export function Logo({
  name,
  secondName,
  path,
  preset,
  className,
  size = 'medium',
  isoType = false,
}: LogoPropTypes) {
  const { mode } = useTheme();
  const isMounted = useIsMounted();
  const isDarkMode = mode === 'dark';

  const color = preset
    ? PRESET_COLORS[preset?.toLocaleUpperCase() as keyof typeof PRESET_COLORS]
    : 'text-brand';

  const textSize =
    size === 'small'
      ? 'text-xl'
      : size === 'medium'
      ? 'text-2xl'
      : size === 'large'
      ? 'text-3xl'
      : 'text-4xl';

  const handleName = (name: string) => {
    if (isoType) return name?.[0]?.toUpperCase();
    return name;
  };

  return (
    isMounted && (
      <AnchorLink to={path || '/'}>
        <span className={cn('relative flex w-full', className)}>
          {isDarkMode && (
            <div className="flex items-end text-base font-medium text-gray-900 dark:text-white sm:text-xl flex-nowrap">
              <span className={cn('font-semibold', textSize)}>
                {handleName(name) || 'Site Name'}
              </span>
              {secondName && (
                <span
                  style={{ color: color }}
                  className={cn('font-semibold', textSize, !preset && color)}
                >
                  {handleName(secondName)}
                </span>
              )}
            </div>
          )}
          {!isDarkMode && (
            <div className="flex items-end text-base font-medium text-gray-900 dark:text-white sm:text-xl lg:flex-wrap 2xl:flex-nowrap">
              <span className={cn('font-semibold', textSize)}>
                {handleName(name) || 'Site Name'}
              </span>
              {secondName && (
                <span
                  style={{ color: color }}
                  className={cn('font-semibold', textSize, !preset && color)}
                >
                  {handleName(secondName)}
                </span>
              )}
            </div>
          )}
        </span>
      </AnchorLink>
    )
  );
}

export default Logo;
