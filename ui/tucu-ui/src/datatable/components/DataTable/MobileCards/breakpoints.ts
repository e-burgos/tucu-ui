import type { IMobileCardsOptions } from '../../../common/types';

export type MobileCardsBreakpoint = NonNullable<
  IMobileCardsOptions['breakpoint']
>;

export interface ResolvedMobileCards {
  breakpoint: MobileCardsBreakpoint;
  titleColumnId?: string;
  subtitleColumnId?: string;
  hiddenColumnIds: string[];
  className?: string;
}

export interface MobileCardsVisibilityClasses {
  tableOnly: string;
  cardsOnly: string;
  fullPagination: string;
  compactPagination: string;
}

export const MOBILE_CARDS_CLASSES: Record<
  MobileCardsBreakpoint,
  MobileCardsVisibilityClasses
> = {
  sm: {
    tableOnly: 'hidden sm:flex',
    cardsOnly: 'sm:hidden',
    fullPagination: 'hidden sm:block',
    compactPagination: 'sm:hidden',
  },
  md: {
    tableOnly: 'hidden md:flex',
    cardsOnly: 'md:hidden',
    fullPagination: 'hidden md:block',
    compactPagination: 'md:hidden',
  },
  lg: {
    tableOnly: 'hidden lg:flex',
    cardsOnly: 'lg:hidden',
    fullPagination: 'hidden lg:block',
    compactPagination: 'lg:hidden',
  },
};

export function resolveMobileCards(
  value: boolean | IMobileCardsOptions | undefined
): ResolvedMobileCards | null {
  if (!value) return null;
  const options = value === true ? {} : value;
  return {
    breakpoint: options.breakpoint ?? 'md',
    titleColumnId: options.titleColumnId,
    subtitleColumnId: options.subtitleColumnId,
    hiddenColumnIds: options.hiddenColumnIds ?? [],
    className: options.className,
  };
}
