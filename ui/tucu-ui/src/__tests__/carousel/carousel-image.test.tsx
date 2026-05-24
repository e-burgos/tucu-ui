import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

vi.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: unknown }) => children,
  SwiperSlide: ({ children }: { children: unknown }) => children,
}));
vi.mock('swiper/modules', () => {
  const mod = {};
  return {
    Navigation: mod,
    Pagination: mod,
    Scrollbar: mod,
    A11y: mod,
    Autoplay: mod,
    EffectFade: mod,
    EffectCoverflow: mod,
    Mousewheel: mod,
    EffectCube: mod,
    EffectFlip: mod,
    EffectCards: mod,
    EffectCreative: mod,
  };
});
vi.mock('swiper/css', () => ({}));
vi.mock('swiper/css/navigation', () => ({}));
vi.mock('swiper/css/pagination', () => ({}));
vi.mock('swiper/css/scrollbar', () => ({}));
vi.mock('swiper/css/effect-fade', () => ({}));
vi.mock('swiper/css/effect-coverflow', () => ({}));

import { CarouselImage } from '../../components/carousel/carousel-image';

describe('CarouselImage', () => {
  it('renders without crashing', () => {
    const images = [
      { src: 'https://example.com/img1.jpg', alt: 'Image 1' },
      { src: 'https://example.com/img2.jpg', alt: 'Image 2' },
    ];
    const { container } = render(<CarouselImage images={images} />);
    expect(container).toBeInTheDocument();
  });
});
