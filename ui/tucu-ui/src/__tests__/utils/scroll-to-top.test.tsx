import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ScrollToTop } from '../../components/utils/scroll-to-top';

describe('ScrollToTop', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <ScrollToTop />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });

  it('renders with custom props', () => {
    const { container } = render(
      <MemoryRouter>
        <ScrollToTop showAfter={200} size="large" behavior="instant" />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
