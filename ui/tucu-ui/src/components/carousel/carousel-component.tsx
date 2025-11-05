import React, { forwardRef, useRef, useImperativeHandle, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
  EffectCoverflow,
  Mousewheel,
  EffectCube,
  EffectFlip,
  EffectCards,
  EffectCreative,
} from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import cn from 'classnames';
import Button from '../buttons';
import { PaginationOptions, SwiperModule } from 'swiper/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import './carousel-styles.css';

export type CarouselDirection = 'horizontal' | 'vertical';
export type CarouselEffect =
  | 'slide'
  | 'fade'
  | 'coverflow'
  | 'cube'
  | 'flip'
  | 'creative'
  | 'cards';
export type CarouselPaginationType =
  | 'bullets'
  | 'fraction'
  | 'progressbar'
  | 'custom';

export interface CarouselProps {
  children: React.ReactNode[];
  // Basic settings
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  direction?: CarouselDirection;
  effect?: CarouselEffect;
  mousewheel?: boolean;

  // Navigation
  showNavigation?: boolean;

  // Pagination
  showPagination?: boolean;
  paginationType?: CarouselPaginationType;

  // Autoplay
  autoplay?: boolean | { delay: number; disableOnInteraction?: boolean };

  // Responsive breakpoints
  breakpoints?: Record<
    number,
    { slidesPerView: number; spaceBetween?: number }
  >;

  // Advanced features
  loop?: boolean;
  centeredSlides?: boolean;
  grabCursor?: boolean;
  freeMode?: boolean;

  // Custom styling
  className?: string;
  slideClassName?: string;

  // Callbacks
  onSlideChange?: (swiper: SwiperType) => void;
  onSwiper?: (swiper: SwiperType) => void;

  // Accessibility
  'aria-label'?: string;
}

export interface CarouselRef {
  swiper: SwiperType | null;
  slideNext: () => void;
  slidePrev: () => void;
  slideTo: (index: number) => void;
}

export const Carousel = forwardRef<CarouselRef, CarouselProps>(
  (
    {
      children,
      slidesPerView = 1,
      spaceBetween = 0,
      direction = 'horizontal',
      effect = 'slide',
      showNavigation = false,
      showPagination = false,
      mousewheel = true,
      paginationType = 'bullets',
      autoplay = false,
      breakpoints,
      loop = false,
      centeredSlides = false,
      grabCursor = true,
      freeMode = false,
      className,
      slideClassName,
      onSlideChange,
      onSwiper,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const swiperInstance = useRef<SwiperType | null>(null);

    const handleSwiper = (swiper: SwiperType) => {
      swiperInstance.current = swiper;
      onSwiper?.(swiper);
    };

    useImperativeHandle(ref, () => ({
      swiper: swiperInstance.current,
      slideNext: () => swiperInstance.current?.slideNext(),
      slidePrev: () => swiperInstance.current?.slidePrev(),
      slideTo: (index: number) => swiperInstance.current?.slideTo(index),
    }));

    const modules: SwiperModule[] = [Scrollbar, A11y];
    if (effect === 'cards') modules.push(EffectCards);
    if (effect === 'cube') modules.push(EffectCube);
    if (effect === 'flip') modules.push(EffectFlip);
    if (effect === 'fade') modules.push(EffectFade);
    if (effect === 'coverflow') modules.push(EffectCoverflow);
    if (effect === 'creative') modules.push(EffectCreative);
    if (mousewheel) modules.push(Mousewheel);
    if (showNavigation) modules.push(Navigation);
    if (showPagination) modules.push(Pagination);
    if (autoplay) modules.push(Autoplay);

    const autoplayConfig = autoplay === true ? { delay: 3000 } : autoplay;

    const paginationConfig: PaginationOptions | false = useMemo(() => {
      if (!showPagination) return false;

      switch (paginationType) {
        case 'bullets':
          return {
            type: 'bullets',
            clickable: true,
            dynamicBullets: true,
          };
        case 'fraction':
          return {
            type: 'fraction',
            clickable: true,
          };
        case 'progressbar':
          return {
            type: 'progressbar',
            clickable: true,
          };
        case 'custom':
          return {
            clickable: true,
            renderBullet: function (index, className) {
              return `<span style="width: 20px; height: 20px; background-color: transparent; font-size: 12px; font-weight: 500; border: 1px solid var(--color-neutral-200);" class="${className}">${
                index + 1
              }</span>`;
            },
          };
        default:
          return false;
      }
    }, [showPagination, paginationType]);

    const navigationConfig = showNavigation
      ? {
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }
      : false;

    return (
      <div
        className={cn(
          'relative flex items-center justify-center z-0',
          direction === 'vertical' && ' h-full',
          direction === 'horizontal' && 'h-auto',
          className
        )}
        aria-label={ariaLabel}
        role="group"
        aria-roledescription="carousel"
      >
        {showNavigation && (
          <Button
            variant="transparent"
            size="mini"
            shape="circle"
            className={cn('swiper-button-prev-custom mr-1')}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        )}
        <Swiper
          modules={modules}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          direction={direction}
          cubeEffect={
            effect === 'cube'
              ? {
                  slideShadows: true,
                  shadow: true,
                  shadowOffset: 20,
                  shadowScale: 0.94,
                }
              : undefined
          }
          flipEffect={
            effect === 'flip'
              ? {
                  slideShadows: true,
                }
              : undefined
          }
          creativeEffect={
            effect === 'creative'
              ? {
                  prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                  },
                  next: {
                    translate: ['100%', 0, 0],
                  },
                }
              : undefined
          }
          effect={effect}
          loop={loop}
          centeredSlides={centeredSlides}
          grabCursor={grabCursor}
          freeMode={freeMode}
          mousewheel={mousewheel}
          autoplay={autoplayConfig}
          pagination={paginationConfig}
          navigation={navigationConfig}
          breakpoints={breakpoints}
          onSlideChange={onSlideChange}
          onSwiper={handleSwiper}
          style={
            effect === 'cube'
              ? { maxHeight: '400px', height: '-webkit-fill-available' }
              : undefined
          }
          className={cn(
            'flex items-center justify-center',
            direction === 'vertical' && 'flex-col',
            direction === 'horizontal' && 'flex-row'
          )}
          {...props}
        >
          {children.map((child, index) => (
            <SwiperSlide
              key={index}
              className={cn(
                '!flex !items-center !justify-center z-10',
                effect === 'fade' &&
                  'opacity-0 transition-opacity duration-300',
                effect !== 'fade' && 'transition-opacity duration-300',

                slideClassName
              )}
            >
              {child}
            </SwiperSlide>
          ))}
        </Swiper>
        {showNavigation && (
          <Button
            variant="transparent"
            size="mini"
            shape="circle"
            className={cn('swiper-button-next-custom ml-1')}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        )}
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';

export default Carousel;
