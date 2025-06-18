import React from 'react';

export interface ImageProps {
  src: string;
  height?: number | string;
  width?: number | string;
  alt?: string;
  blurDataURL?: string;
  blurWidth?: number | string;
  blurHeight?: number | string;
  priority?: boolean;
  className?: string;
  placeholder?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export const Image: React.FC<ImageProps> = ({
  src,
  height,
  width,
  alt,
  className,
  objectFit = 'cover',
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{
        objectFit: objectFit,
        minWidth: width,
        minHeight: height,
        maxWidth: width,
        maxHeight: height,
      }}
    />
  );
};

export default Image;
