import React from 'react';
import cn from 'classnames';
import { Carousel, CarouselProps } from './carousel-component';
import CardContainer from '../cards/card-container';

export interface CarouselCardItem {
  title?: string;
  description?: string;
  image?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}

export interface CarouselCardsProps extends Omit<CarouselProps, 'children'> {
  cards: CarouselCardItem[];
  cardClassName?: string;
  cardSize?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  showCardTitles?: boolean;
}

const cardSizes = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

const cardVariants = {
  default:
    'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  elevated:
    'bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700',
  outlined: 'bg-transparent border-2 border-gray-200 dark:border-gray-700',
  filled:
    'bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700',
};

export const CarouselCards: React.FC<CarouselCardsProps> = ({
  cards,
  cardClassName,
  cardSize = 'md',
  variant = 'default',
  showCardTitles = true,
  className,
  ...carouselProps
}) => {
  return (
    <Carousel
      className={cn('w-full', className)}
      slidesPerView={1}
      spaceBetween={16}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
      {...carouselProps}
    >
      {cards.map((card, index) => (
        <CardContainer
          key={index}
          className={cn(
            'flex flex-col h-full transition-transform duration-300 hover:scale-98',
            cardSizes[cardSize],
            cardVariants[variant],
            cardClassName
          )}
        >
          {/* Image/Icon */}
          {(card.image || card.icon) && (
            <div className="shrink-0 mb-4">
              {card.image ? (
                <img
                  src={card.image}
                  alt={card.title || `Card ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ) : (
                card.icon && (
                  <div className="flex items-center justify-center w-12 h-12 bg-brand/10 rounded-lg">
                    {card.icon}
                  </div>
                )
              )}
            </div>
          )}

          {/* Title */}
          {showCardTitles && card.title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {card.title}
            </h3>
          )}

          {/* Description */}
          {card.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow mb-4">
              {card.description}
            </p>
          )}

          {/* Custom Content */}
          {card.content && <div className="flex-grow mb-4">{card.content}</div>}

          {/* Footer */}
          {card.footer && (
            <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
              {card.footer}
            </div>
          )}
        </CardContainer>
      ))}
    </Carousel>
  );
};

export default CarouselCards;
