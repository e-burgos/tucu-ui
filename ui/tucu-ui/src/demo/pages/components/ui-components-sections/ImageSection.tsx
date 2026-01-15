import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  Image,
} from '../../../../index';

const ImageSection: React.FC = () => {
  const propsTableColumns = [
    {
      key: 'prop',
      label: 'Prop',
      render: (value: unknown) => (
        <code className="text-xs text-brand">{String(value)}</code>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: unknown) => (
        <code className="text-xs">{String(value)}</code>
      ),
    },
    {
      key: 'default',
      label: 'Default',
      render: (value: unknown) => {
        const val = String(value);
        if (val === 'required') {
          return <span className="text-xs text-red-500">required</span>;
        }
        return <code className="text-xs">{val}</code>;
      },
    },
    {
      key: 'description',
      label: 'Description',
    },
  ];

  const propsData = [
    {
      prop: 'src',
      type: 'string',
      default: 'required',
      description: 'Image source URL',
    },
    {
      prop: 'alt',
      type: 'string',
      default: 'required',
      description: 'Alt text for accessibility',
    },
    {
      prop: 'width',
      type: 'number | string',
      default: '-',
      description: 'Image width in pixels or percentage',
    },
    {
      prop: 'height',
      type: 'number | string',
      default: '-',
      description: 'Image height in pixels or percentage',
    },
    {
      prop: 'objectFit',
      type: "'cover' | 'contain' | 'fill' | 'none' | 'scale-down'",
      default: "'cover'",
      description: 'How the image should fit its container',
    },
    {
      prop: 'loading',
      type: "'lazy' | 'eager'",
      default: "'lazy'",
      description: 'Browser native lazy loading',
    },
    {
      prop: 'priority',
      type: "'high' | 'low' | 'auto'",
      default: "'auto'",
      description: 'Fetch priority hint for browser',
    },
    {
      prop: 'placeholder',
      type: "'blur' | 'empty'",
      default: "'empty'",
      description: 'Placeholder type while loading',
    },
    {
      prop: 'blurDataURL',
      type: 'string',
      default: '-',
      description: 'Base64 or URL for blur placeholder',
    },
    {
      prop: 'fallbackSrc',
      type: 'string',
      default: 'placeholder image',
      description: 'Image to show on error',
    },
    {
      prop: 'aspectRatio',
      type: 'string',
      default: '-',
      description: 'CSS aspect-ratio (e.g., "16/9", "4/3")',
    },
    {
      prop: 'fill',
      type: 'boolean',
      default: 'false',
      description: 'Fill parent container (position: absolute)',
    },
    {
      prop: 'onLoad',
      type: '() => void',
      default: '-',
      description: 'Callback when image loads',
    },
    {
      prop: 'onError',
      type: '() => void',
      default: '-',
      description: 'Callback when image fails to load',
    },
    {
      prop: 'className',
      type: 'string',
      default: '-',
      description: 'CSS classes for image element',
    },
    {
      prop: 'containerClassName',
      type: 'string',
      default: '-',
      description: 'CSS classes for wrapper container',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Image
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A powerful image component inspired by Next.js Image, featuring lazy
          loading, blur placeholders, error handling, and automatic
          optimization.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Usage" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Typography tag="h5" className="mb-3">
                  Standard Image
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                >
                  Basic usage with width and height.
                </Typography>
                <Image
                  src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop"
                  alt="Mountain landscape"
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  With Lazy Loading
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                >
                  Automatic lazy loading with smooth fade-in.
                </Typography>
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                  alt="Mountain peaks"
                  width={400}
                  height={300}
                  loading="lazy"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Object Fit Modes" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Typography tag="h5" className="mb-3">
                  Cover (Default)
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                >
                  Fills container, may crop image.
                </Typography>
                <Image
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
                  alt="Nature landscape cover"
                  width={300}
                  height={200}
                  objectFit="cover"
                  className="rounded-lg border-2 border-gray-200 dark:border-gray-700"
                />
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Contain
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                >
                  Fits entirely, may have empty space.
                </Typography>
                <Image
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
                  alt="Nature landscape contain"
                  width={300}
                  height={200}
                  objectFit="contain"
                  containerClassName="bg-gray-100 dark:bg-gray-800"
                  className="rounded-lg"
                />
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Fill
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                >
                  Stretches to fill container.
                </Typography>
                <Image
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
                  alt="Nature landscape fill"
                  width={300}
                  height={200}
                  objectFit="fill"
                  className="rounded-lg border-2 border-gray-200 dark:border-gray-700"
                />
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Aspect Ratios" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Typography tag="h5" className="mb-3">
                  16:9 (Video)
                </Typography>
                <Image
                  src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop"
                  alt="Beach sunset 16:9"
                  aspectRatio="16/9"
                  fill
                  containerClassName="w-full rounded-lg"
                />
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  4:3 (Classic)
                </Typography>
                <Image
                  src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop"
                  alt="Forest path 4:3"
                  aspectRatio="4/3"
                  fill
                  containerClassName="w-full rounded-lg"
                />
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  1:1 (Square)
                </Typography>
                <Image
                  src="https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=300&h=300&fit=crop"
                  alt="City skyline 1:1"
                  aspectRatio="1/1"
                  fill
                  containerClassName="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Placeholder Types" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Typography tag="h5" className="mb-3">
                  Blur Placeholder
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                >
                  Shows animated blur effect while loading.
                </Typography>
                <Image
                  src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop"
                  alt="Mountain with blur placeholder"
                  width={400}
                  height={300}
                  placeholder="blur"
                  className="rounded-lg"
                />
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Empty Placeholder
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                >
                  Shows spinner while loading.
                </Typography>
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                  alt="Mountains with empty placeholder"
                  width={400}
                  height={300}
                  placeholder="empty"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Error Handling" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Typography tag="h5" className="mb-3">
                  Invalid Image (Fallback)
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                >
                  Automatically shows fallback on error.
                </Typography>
                <Image
                  src="https://invalid-url-that-will-fail.com/image.jpg"
                  alt="Image with fallback"
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Custom Fallback
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                >
                  Provide your own fallback image.
                </Typography>
                <Image
                  src="https://invalid-url.com/image.jpg"
                  alt="Custom fallback"
                  width={400}
                  height={300}
                  fallbackSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Responsive Images" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-6">
              <div>
                <Typography tag="h5" className="mb-3">
                  Full Width Responsive
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                >
                  Image fills container width with maintained aspect ratio.
                </Typography>
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
                  alt="Responsive landscape"
                  aspectRatio="21/9"
                  fill
                  containerClassName="w-full rounded-lg"
                />
              </div>

              <div>
                <Typography tag="h5" className="mb-3">
                  Grid Responsive Images
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    'photo-1682687220742-aba13b6e50ba',
                    'photo-1506905925346-21bda4d32df4',
                    'photo-1501594907352-04cda38ebc29',
                    'photo-1472214103451-9374bd1c798e',
                  ].map((id, index) => (
                    <Image
                      key={id}
                      src={`https://images.unsplash.com/${id}?w=300&h=300&fit=crop`}
                      alt={`Gallery image ${index + 1}`}
                      aspectRatio="1/1"
                      fill
                      containerClassName="w-full rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Key Features" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-2">
                  <span role="img" aria-label="rocket">
                    🚀
                  </span>{' '}
                  Lazy Loading
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Native browser lazy loading for better performance and faster
                  page loads.
                </Typography>
              </CardContainer>

              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-2">
                  <span role="img" aria-label="sparkles">
                    ✨
                  </span>{' '}
                  Smooth Transitions
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Beautiful fade-in animations and blur effects for a polished
                  loading experience.
                </Typography>
              </CardContainer>

              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-2">
                  <span role="img" aria-label="shield">
                    🛡️
                  </span>{' '}
                  Error Handling
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Automatic fallback images and error states with user-friendly
                  messaging.
                </Typography>
              </CardContainer>

              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-2">
                  <span role="img" aria-label="art">
                    🎨
                  </span>{' '}
                  Aspect Ratios
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  CSS aspect-ratio support for consistent layouts without layout
                  shift.
                </Typography>
              </CardContainer>

              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-2">
                  <span role="img" aria-label="mobile">
                    📱
                  </span>{' '}
                  Responsive
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Fully responsive with flexible sizing options and fill mode
                  support.
                </Typography>
              </CardContainer>

              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-2">
                  <span role="img" aria-label="accessibility">
                    ♿
                  </span>{' '}
                  Accessible
                </Typography>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Required alt text and proper ARIA labels for screen readers.
                </Typography>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={propsData} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Image } from '@e-burgos/tucu-ui';

// Basic usage
<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={400}
  height={300}
/>

// With lazy loading and blur placeholder
<Image
  src="/landscape.jpg"
  alt="Mountain landscape"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
  className="rounded-lg"
/>

// Responsive with aspect ratio
<Image
  src="/hero.jpg"
  alt="Hero image"
  aspectRatio="16/9"
  fill
  containerClassName="w-full rounded-xl"
/>

// Different object-fit modes
<Image src={src} alt="Cover" objectFit="cover" />
<Image src={src} alt="Contain" objectFit="contain" />
<Image src={src} alt="Fill" objectFit="fill" />

// With error handling
<Image
  src="/image.jpg"
  alt="Image with fallback"
  width={400}
  height={300}
  fallbackSrc="/fallback.jpg"
  onError={() => console.log('Failed to load')}
  onLoad={() => console.log('Loaded successfully')}
/>

// Fill parent container (like Next.js)
<div className="relative w-full h-64">
  <Image
    src="/banner.jpg"
    alt="Banner"
    fill
    objectFit="cover"
  />
</div>

// With priority loading (above the fold)
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  loading="eager"
  priority="high"
  placeholder="blur"
/>

// Grid of images
<div className="grid grid-cols-3 gap-4">
  {images.map((img) => (
    <Image
      key={img.id}
      src={img.url}
      alt={img.alt}
      aspectRatio="1/1"
      fill
      containerClassName="w-full rounded-lg"
    />
  ))}
</div>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default ImageSection;
