import cn from 'classnames';
import Image from '../utils/image';

export interface AvatarProps {
  image: string;
  alt: string;
  className?: string;
  size?: SizeNames;
  shape?: ShapeNames;
  border?: boolean;
}

type ShapeNames = 'rounded' | 'circle';
type SizeNames = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

const sizes: Record<SizeNames, string[]> = {
  xl: [
    'h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 3xl:h-40 3xl:w-40 shadow-large',
  ],
  lg: ['h-20 w-20 lg:h-24 lg:w-24'],
  md: ['h-10 w-10 drop-shadow-main'],
  sm: ['h-8 w-8 shadow-card'],
  xs: ['h-6 w-6'],
};

const borderColors: Record<SizeNames, string[]> = {
  xl: ['border-brand border-[5px] 3xl:border-8'],
  lg: ['border-brand border-4'],
  md: ['border-brand border-3'],
  sm: ['border-brand border-2'],
  xs: ['border-brand border-1'],
};

const shapes: Record<ShapeNames, string[]> = {
  rounded: ['h-16 w-16 rounded-lg bg-white/20 backdrop-blur-2xl'],
  circle: ['rounded-full'],
};

export function Avatar({
  image,
  alt,
  className,
  size = 'md',
  shape = 'circle',
  border = true,
}: AvatarProps) {
  return (
    <figure
      className={cn(
        'relative shrink-0 overflow-hidden',
        className,
        shapes[shape],
        sizes[size],
        border && borderColors[size]
      )}
    >
      {shape === 'circle' &&
        (size === 'xs' || size === 'sm' ? (
          <Image
            src={image}
            alt={alt}
            width={'100%'}
            height={'100%'}
            priority="auto"
            className="rounded-full"
          />
        ) : (
          <Image
            src={image}
            alt={alt}
            width={'100%'}
            height={'100%'}
            priority="auto"
            placeholder="blur"
            className="rounded-full"
          />
        ))}
      {shape === 'rounded' && (
        <Image
          src={image}
          alt={alt}
          className=""
          width={'100%'}
          height={'100%'}
          priority="auto"
        />
      )}
    </figure>
  );
}

export default Avatar;
