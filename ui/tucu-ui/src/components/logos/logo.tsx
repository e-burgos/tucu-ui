import AnchorLink from '../links/anchor-link';
import cn from 'classnames';
import { PRESET_LABEL_COLORS } from '../../themes/config';
import TucuUiLogo from './tucu-ui-logo';
import Typography from '../typography';

export interface LogoPropTypes {
  name?: string;
  secondName?: string;
  path?: string;
  preset?: PRESET_LABEL_COLORS;
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  logo?: React.ReactNode | null;
  isoType?: boolean;
}

export function Logo({
  name,
  secondName,
  path,
  className,
  size = 'medium',
  logo = null,
  isoType = false,
}: LogoPropTypes) {
  const textSize =
    size === 'small'
      ? 'text-xl'
      : size === 'medium'
      ? 'text-2xl'
      : size === 'large'
      ? 'text-3xl'
      : 'text-4xl';
  const logoSize =
    size === 'small'
      ? 60
      : size === 'medium'
      ? 80
      : size === 'large'
      ? 100
      : size === 'xlarge'
      ? 120
      : size === 'xxlarge'
      ? 200
      : 80;

  const handleName = (name: string) => {
    if (isoType) return name?.[0]?.toUpperCase();
    return name;
  };

  return (
    <AnchorLink to={path || '/'}>
      <span className={cn('relative flex w-full', className)}>
        <div
          className={cn(
            logo && 'gap-1',
            'flex items-center flex-nowrap overflow-hidden truncate'
          )}
        >
          {logo ? (
            logo
          ) : name || secondName ? (
            <TucuUiLogo
              size={logoSize}
              className={`w-[${logoSize}px] h-[${logoSize}px]`}
            />
          ) : (
            <TucuUiLogo
              size={logoSize}
              className={`w-[${logoSize}px] h-[${logoSize}px]`}
            />
          )}
          <div
            className={cn(
              !logo && '-ml-2',
              'flex flex-nowrap truncate items-end text-base font-medium text-gray-900 dark:text-white sm:text-xl'
            )}
          >
            <Typography
              tag="span"
              className={cn('font-semibold truncate ', textSize)}
            >
              {handleName(name ? name : name === undefined ? 'TUCU' : '')}
            </Typography>
            <Typography
              tag="span"
              className={cn('font-semibold truncate text-primary', textSize)}
            >
              {handleName(
                secondName ? secondName : secondName === undefined ? 'UI' : ''
              )}
            </Typography>
          </div>
        </div>
      </span>
    </AnchorLink>
  );
}

export default Logo;
