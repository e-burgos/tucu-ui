# Carousel Component

A powerful and flexible carousel/slider component built with Swiper.js, designed to match the tucu-ui design system.

## Features

- 🎠 **Multiple Effects**: Slide, fade, coverflow, cube, flip, creative, and cards transitions
- 🎯 **Navigation Controls**: Custom navigation arrows and pagination dots
- 🔄 **Autoplay**: Configurable automatic sliding
- 📱 **Responsive**: Breakpoint-based responsive behavior
- ♿ **Accessible**: Full keyboard navigation and ARIA support
- 🎨 **Theming**: Follows tucu-ui design system
- ⚡ **Performance**: Lazy loading and optimized rendering
- 🖱️ **Mousewheel**: Support for mousewheel navigation

## Basic Usage

```tsx
import { Carousel } from 'tucu-ui';

function BasicCarousel() {
  return (
    <Carousel showNavigation showPagination slidesPerView={1} spaceBetween={20}>
      <div className="bg-blue-500 text-white p-8 rounded-lg">
        <h3>Slide 1</h3>
        <p>Content for slide 1</p>
      </div>
      <div className="bg-green-500 text-white p-8 rounded-lg">
        <h3>Slide 2</h3>
        <p>Content for slide 2</p>
      </div>
      <div className="bg-purple-500 text-white p-8 rounded-lg">
        <h3>Slide 3</h3>
        <p>Content for slide 3</p>
      </div>
    </Carousel>
  );
}
```

## Image Carousel

```tsx
import { CarouselImage } from 'tucu-ui';

function ImageCarousel() {
  const images = [
    {
      src: '/images/slide1.jpg',
      alt: 'Beautiful landscape',
      title: 'Mountain View',
      description: 'A stunning view of the mountains',
    },
    {
      src: '/images/slide2.jpg',
      alt: 'Ocean sunset',
      title: 'Sunset Beach',
      description: 'Peaceful sunset over the ocean',
    },
  ];

  return <CarouselImage images={images} showTitles autoplay={{ delay: 3000 }} showNavigation showPagination />;
}
```

### CarouselImageItem Structure

Each image in the `images` array can have the following properties:

- `src: string` - Image source URL (required)
- `alt?: string` - Image alt text for accessibility
- `title?: string` - Image title (shown when `showTitles` is true)
- `description?: string` - Image description (shown when `showTitles` is true)

## Cards Carousel

```tsx
import { CarouselCards } from 'tucu-ui';

function CardsCarousel() {
  const cards = [
    {
      title: 'Feature 1',
      description: 'Description of feature 1',
      icon: <SomeIcon />,
      footer: <Button size="sm">Learn More</Button>,
    },
    {
      title: 'Feature 2',
      description: 'Description of feature 2',
      image: '/path/to/image.jpg',
      content: <CustomContent />,
      footer: <Button size="sm">Get Started</Button>,
    },
  ];

  return <CarouselCards cards={cards} showNavigation autoplay />;
}
```

### CarouselCardItem Structure

Each card in the `cards` array can have the following properties:

- `title?: string` - Card title
- `description?: string` - Card description text
- `image?: string` - Path to card image (mutually exclusive with icon)
- `icon?: React.ReactNode` - Icon component (mutually exclusive with image)
- `content?: React.ReactNode` - Custom content component
- `footer?: React.ReactNode` - Footer component (e.g., buttons)

## Advanced Usage with Ref

```tsx
import { useRef } from 'react';
import { Carousel, CarouselRef } from 'tucu-ui';

function ControlledCarousel() {
  const carouselRef = useRef<CarouselRef>(null);

  const goToNext = () => {
    carouselRef.current?.slideNext();
  };

  const goToPrev = () => {
    carouselRef.current?.slidePrev();
  };

  const goToSlide = (index: number) => {
    carouselRef.current?.slideTo(index);
  };

  return (
    <div>
      <div className="mb-4 space-x-2">
        <Button onClick={goToPrev}>Previous</Button>
        <Button onClick={goToNext}>Next</Button>
        <Button onClick={() => goToSlide(2)}>Go to Slide 3</Button>
      </div>

      <Carousel ref={carouselRef} showPagination autoplay={{ delay: 5000, disableOnInteraction: false }}>
        {/* slides */}
      </Carousel>
    </div>
  );
}
```

## Props API

### Carousel (Main Component)

| Prop             | Type                                                                            | Default        | Description                       |
| ---------------- | ------------------------------------------------------------------------------- | -------------- | --------------------------------- |
| `children`       | `React.ReactNode[]`                                                             | Required       | Array of slide components         |
| `slidesPerView`  | `number \| 'auto'`                                                              | `1`            | Number of slides visible at once  |
| `spaceBetween`   | `number`                                                                        | `0`            | Space between slides in pixels    |
| `direction`      | `'horizontal' \| 'vertical'`                                                    | `'horizontal'` | Slide direction                   |
| `effect`         | `'slide' \| 'fade' \| 'coverflow' \| 'cube' \| 'flip' \| 'creative' \| 'cards'` | `'slide'`      | Transition effect                 |
| `mousewheel`     | `boolean`                                                                       | `true`         | Enable mousewheel navigation      |
| `showNavigation` | `boolean`                                                                       | `false`        | Show navigation arrows            |
| `showPagination` | `boolean`                                                                       | `false`        | Show pagination dots              |
| `paginationType` | `'bullets' \| 'fraction' \| 'progressbar' \| 'custom'`                          | `'bullets'`    | Pagination style                  |
| `autoplay`       | `boolean \| object`                                                             | `false`        | Enable autoplay with options      |
| `breakpoints`    | `object`                                                                        | -              | Responsive breakpoints            |
| `loop`           | `boolean`                                                                       | `false`        | Enable infinite loop              |
| `centeredSlides` | `boolean`                                                                       | `false`        | Center active slide               |
| `grabCursor`     | `boolean`                                                                       | `true`         | Show grab cursor                  |
| `freeMode`       | `boolean`                                                                       | `false`        | Enable free mode dragging         |
| `className`      | `string`                                                                        | -              | Additional CSS classes            |
| `slideClassName` | `string`                                                                        | -              | CSS classes for individual slides |
| `onSlideChange`  | `function`                                                                      | -              | Callback when slide changes       |
| `onSwiper`       | `function`                                                                      | -              | Callback when swiper initializes  |
| `aria-label`     | `string`                                                                        | -              | Accessibility label for carousel  |

### CarouselImage

| Prop               | Type                                                       | Default          | Description                        |
| ------------------ | ---------------------------------------------------------- | ---------------- | ---------------------------------- |
| `images`           | `CarouselImageItem[]`                                      | Required         | Array of image objects             |
| `showTitles`       | `boolean`                                                  | `false`          | Show image titles and descriptions |
| `imageFit`         | `'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'`        | CSS object-fit property            |
| `aspectRatio`      | `string`                                                   | `'aspect-video'` | Aspect ratio CSS class             |
| `lazy`             | `boolean`                                                  | `true`           | Enable lazy loading                |
| `imageClassName`   | `string`                                                   | -                | Additional CSS classes for images  |
| `...CarouselProps` | All props from Carousel component                          | -                | All Carousel props are supported   |

### CarouselCards

| Prop               | Type                                                | Default     | Description                      |
| ------------------ | --------------------------------------------------- | ----------- | -------------------------------- |
| `cards`            | `CarouselCardItem[]`                                | Required    | Array of card objects            |
| `cardClassName`    | `string`                                            | -           | Additional CSS classes for cards |
| `cardSize`         | `'sm' \| 'md' \| 'lg' \| 'xl'`                      | `'md'`      | Card size preset                 |
| `variant`          | `'default' \| 'elevated' \| 'outlined' \| 'filled'` | `'default'` | Card visual style                |
| `showCardTitles`   | `boolean`                                           | `true`      | Show card titles                 |
| `...CarouselProps` | All props from Carousel component                   | -           | All Carousel props are supported |

## Responsive Breakpoints

```tsx
<Carousel
  breakpoints={{
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 3, spaceBetween: 30 },
    1024: { slidesPerView: 4, spaceBetween: 40 },
  }}
>
  {/* slides */}
</Carousel>
```

## Autoplay Options

```tsx
<Carousel
  autoplay={{
    delay: 3000, // Delay between slides (ms)
    disableOnInteraction: false, // Continue autoplay after user interaction
  }}
>
  {/* slides */}
</Carousel>
```

## Custom Styling

```tsx
<Carousel
  className="custom-carousel"
  slideClassName="custom-slide"
  showNavigation
>
  {/* slides */}
</Carousel>

// CSS
.custom-carousel .swiper-button-next-custom,
.custom-carousel .swiper-button-prev-custom {
  /* Custom navigation styles */
}

.custom-slide {
  /* Custom slide styles */
}
```

## Effects

The Carousel component supports multiple transition effects:

- **slide**: Default sliding transition (default)
- **fade**: Fade transition between slides
- **coverflow**: 3D coverflow effect
- **cube**: 3D cube transition
- **flip**: 3D flip transition
- **creative**: Custom creative transitions
- **cards**: Card stack effect

```tsx
<Carousel effect="cube" showNavigation showPagination>
  {/* slides */}
</Carousel>
```

## Pagination Types

The component supports different pagination styles:

- **bullets**: Dot indicators (default)
- **fraction**: Shows slide numbers (e.g., "1 / 5")
- **progressbar**: Progress bar indicator
- **custom**: Custom numbered bullets

```tsx
<Carousel paginationType="fraction" showPagination>
  {/* slides */}
</Carousel>
```
