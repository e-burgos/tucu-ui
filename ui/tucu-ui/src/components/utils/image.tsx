'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../libs/cn';

type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
type Loading = 'lazy' | 'eager';
type Priority = 'high' | 'low' | 'auto';

const DEFAULT_FALLBACK_SRC =
  'https://via.placeholder.com/400x300?text=Image+Not+Found';

const PLACEHOLDER_STRIPES =
  'repeating-linear-gradient(45deg, color-mix(in srgb, currentColor 10%, transparent) 0 8px, transparent 8px 16px)';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  objectFit?: ObjectFit;
  loading?: Loading;
  priority?: Priority;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
  /** Node rendered in place of the image when `src` is missing or fails to load. Opts out of the default `fallbackSrc` image. */
  fallback?: React.ReactNode;
  /** Icon centred in the striped placeholder shown when there is no `fallback` node. Opts out of the default `fallbackSrc` image. */
  fallbackIcon?: React.ReactNode;
  /** Class names for the striped placeholder; defaults to the image `className`. Opts out of the default `fallbackSrc` image. */
  fallbackClassName?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  fill?: boolean;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  loading = 'lazy',
  priority = 'auto',
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  fallbackSrc,
  fallback,
  fallbackIcon,
  fallbackClassName,
  className,
  containerClassName,
  aspectRatio,
  fill = false,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const hasCustomFallback =
    fallback !== undefined ||
    fallbackIcon !== undefined ||
    fallbackClassName !== undefined;
  const resolvedFallbackSrc =
    fallbackSrc ?? (hasCustomFallback ? undefined : DEFAULT_FALLBACK_SRC);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoading(true);

    // Check if the image is already cached/complete after state reset
    requestAnimationFrame(() => {
      if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
        setIsLoading(false);
        onLoad?.();
      }
    });
  }, [src]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    if (!resolvedFallbackSrc || currentSrc === resolvedFallbackSrc) {
      // Avoid infinite loop if fallback also fails
      setHasError(true);
      setIsLoading(false);
      onError?.();
      return;
    }
    setHasError(true);
    setIsLoading(false);
    setCurrentSrc(resolvedFallbackSrc);
    onError?.();
  };

  // Normalize dimension values: numeric strings → number (React auto-appends "px")
  const normalizeDimension = (
    val: string | number | undefined
  ): string | number | undefined => {
    if (val === undefined || val === '') return undefined;
    if (typeof val === 'number') return val;
    // Pure numeric string → convert to number so React adds "px"
    const num = Number(val);
    if (!isNaN(num)) return num;
    // Already has units (e.g. "100%", "50vh", "auto") → keep as-is
    return val;
  };

  const normalizedWidth = normalizeDimension(width);
  const normalizedHeight = normalizeDimension(height);

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    width: fill ? '100%' : normalizedWidth,
    height: aspectRatio ? undefined : fill ? '100%' : normalizedHeight,
    aspectRatio: aspectRatio,
    overflow: 'hidden',
  };

  const imageStyles: React.CSSProperties = {
    objectFit,
    width: fill ? '100%' : '100%',
    height: fill ? '100%' : '100%',
    display: 'block',
    transition: 'opacity 0.3s ease-in-out, filter 0.3s ease-in-out',
    opacity: isLoading ? 0 : 1,
    filter: isLoading ? 'blur(10px)' : 'none',
  };

  const placeholderStyles: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit,
    filter: 'blur(10px)',
    transform: 'scale(1.1)',
    transition: 'opacity 0.3s ease-in-out',
    opacity: isLoading && placeholder === 'blur' ? 1 : 0,
  };

  const showCustomFallback =
    hasCustomFallback && (!currentSrc || (hasError && !resolvedFallbackSrc));

  if (showCustomFallback) {
    if (fallback !== undefined && fallback !== null) return <>{fallback}</>;
    return (
      <div
        aria-hidden="true"
        data-tucu="image-fallback"
        className={cn(
          'inline-flex shrink-0 items-center justify-center text-muted',
          fallbackClassName ?? [containerClassName, className]
        )}
        style={{
          width: fill ? '100%' : normalizeDimension(width),
          height: aspectRatio ? undefined : fill ? '100%' : normalizeDimension(height),
          aspectRatio,
          backgroundImage: PLACEHOLDER_STRIPES,
        }}
      >
        {fallbackIcon}
      </div>
    );
  }

  return (
    <div
      data-tucu="image"
      className={cn(
        'relative inline-block overflow-hidden',
        { 'bg-gray-200 dark:bg-gray-800': isLoading || hasError },
        containerClassName
      )}
      style={containerStyles}
    >
      {placeholder === 'blur' && blurDataURL && isLoading && (
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          style={placeholderStyles}
          className="pointer-events-none"
        />
      )}

      {isLoading && placeholder === 'blur' && !blurDataURL && (
        <div
          className="absolute inset-0 animate-pulse bg-light-dark"
          aria-hidden="true"
        />
      )}

      <img
        ref={imgRef}
        src={currentSrc || undefined}
        alt={alt}
        loading={loading}
        fetchPriority={priority}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-all duration-300',
          {
            'absolute inset-0': fill,
            'opacity-0': isLoading,
            'opacity-100': !isLoading,
            invisible: hasError,
          },
          className
        )}
        style={imageStyles}
        {...props}
      />

      {isLoading && placeholder === 'empty' && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-light-dark"
          aria-label="Loading image"
        >
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand" />
        </div>
      )}

      {hasError && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-light-dark text-light-dark"
          role="alert"
        >
          <svg
            className="w-8 h-8 mb-2 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export type SafeImageProps = ImageProps;

export const SafeImage: React.FC<SafeImageProps> = ({
  fallbackIcon = null,
  ...props
}) => <Image fallbackIcon={fallbackIcon} {...props} />;

export default Image;
