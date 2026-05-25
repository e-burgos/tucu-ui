import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MacOSSonomaLayoutContent } from '../../../components/macos/sonoma/layout/layout-content-sonoma';

describe('MacOSSonomaLayoutContent', () => {
  it('renders children', () => {
    render(<MacOSSonomaLayoutContent>Page Content</MacOSSonomaLayoutContent>);
    expect(screen.getByText('Page Content')).toBeInTheDocument();
  });

  it('renders toolbar center slot', () => {
    render(
      <MacOSSonomaLayoutContent toolbarCenter={<span>Title</span>}>
        Content
      </MacOSSonomaLayoutContent>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders toolbar leading slot', () => {
    render(
      <MacOSSonomaLayoutContent toolbarLeading={<span>Logo</span>}>
        Content
      </MacOSSonomaLayoutContent>
    );
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('renders toolbar trailing slot', () => {
    render(
      <MacOSSonomaLayoutContent toolbarTrailing={<button>Menu</button>}>
        Content
      </MacOSSonomaLayoutContent>
    );
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('has data-tucu attributes', () => {
    const { container } = render(
      <MacOSSonomaLayoutContent>Content</MacOSSonomaLayoutContent>
    );
    expect(
      container.querySelector('[data-tucu="macos-sonoma-content-shell"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-tucu="macos-sonoma-main"]')
    ).toBeInTheDocument();
  });
});
