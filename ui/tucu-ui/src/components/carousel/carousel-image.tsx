import React from 'react';
import cn from 'classnames';
import { Carousel, CarouselProps } from './carousel-component';

export interface CarouselImageItem {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
}

export interface CarouselImageProps extends Omit<CarouselProps, 'children'> {
  images: CarouselImageItem[];
  imageClassName?: string;
  showTitles?: boolean;
  imageFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  aspectRatio?: string;
  lazy?: boolean;
}

export const CarouselImage: React.FC<CarouselImageProps> = ({
  images,
  imageClassName,
  showTitles = false,
  imageFit = 'cover',
  aspectRatio = 'aspect-video',
  lazy = true,
  className,
  ...carouselProps
}) => {
  return (
    <Carousel className={cn('w-full', className)} {...carouselProps}>
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            'relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800',
            aspectRatio
          )}
        >
          <img
            src={image.src}
            alt={image.alt || `Slide ${index + 1}`}
            className={cn(
              'w-full h-full object-cover transition-transform duration-300 hover:scale-105',
              imageFit === 'contain' && 'object-contain',
              imageFit === 'fill' && 'object-fill',
              imageFit === 'none' && 'object-none',
              imageFit === 'scale-down' && 'object-scale-down',
              imageClassName
            )}
            loading={lazy ? 'lazy' : 'eager'}
          />

          {showTitles && (image.title || image.description) && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
              {image.title && (
                <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
              )}
              {image.description && (
                <p className="text-sm opacity-90">{image.description}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselImage;
