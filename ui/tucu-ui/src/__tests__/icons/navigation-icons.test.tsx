import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import {
  ArrowLinkIcon,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  ChevronForward,
  ChevronLeft,
  ChevronRight,
  LongArrowLeft,
  LongArrowRight,
  LongArrowUp,
  HomeIcon,
  SearchIcon,
  ExternalLink,
  Close,
} from '../../components/icons';

describe('Navigation Icons', () => {
  const icons = [
    { name: 'ArrowLinkIcon', Component: ArrowLinkIcon },
    { name: 'ArrowRight', Component: ArrowRight },
    { name: 'ArrowUp', Component: ArrowUp },
    { name: 'ChevronDown', Component: ChevronDown },
    { name: 'ChevronForward', Component: ChevronForward },
    { name: 'ChevronLeft', Component: ChevronLeft },
    { name: 'ChevronRight', Component: ChevronRight },
    { name: 'LongArrowLeft', Component: LongArrowLeft },
    { name: 'LongArrowRight', Component: LongArrowRight },
    { name: 'LongArrowUp', Component: LongArrowUp },
    { name: 'HomeIcon', Component: HomeIcon },
    { name: 'SearchIcon', Component: SearchIcon },
    { name: 'ExternalLink', Component: ExternalLink },
    { name: 'Close', Component: Close },
  ];

  icons.forEach(({ name, Component }) => {
    it(`${name} renders without crashing`, () => {
      const { container } = render(<Component />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
