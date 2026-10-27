import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SafeImage, Image } from '../../components/utils/image';

describe('SafeImage', () => {
  it('renders the image when src is present', () => {
    render(<SafeImage src="a.png" alt="pic" />);
    expect(screen.getByAltText('pic')).toHaveAttribute('src', 'a.png');
  });

  it('shows the striped placeholder when src is missing', () => {
    const { container } = render(
      <SafeImage alt="pic" fallbackIcon={<i data-testid="ic" />} />
    );
    const placeholder = container.querySelector('[data-tucu="image-fallback"]');
    expect(placeholder).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('ic')).toBeInTheDocument();
  });

  it('renders the fallback node after an error and chains onError', () => {
    const onError = vi.fn();
    render(
      <SafeImage
        src="bad.png"
        alt="pic"
        fallback={<span>nope</span>}
        onError={onError}
      />
    );
    fireEvent.error(screen.getByAltText('pic'));
    expect(screen.getByText('nope')).toBeInTheDocument();
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('applies fallbackClassName to the placeholder', () => {
    const { container } = render(
      <SafeImage alt="x" fallbackClassName="h-8 w-8 mine" />
    );
    expect(container.querySelector('[data-tucu="image-fallback"]')).toHaveClass(
      'mine'
    );
  });

  it('falls back to fallbackSrc first when given', () => {
    render(<SafeImage src="bad.png" alt="pic" fallbackSrc="ok.png" />);
    fireEvent.error(screen.getByAltText('pic'));
    expect(screen.getByAltText('pic')).toHaveAttribute('src', 'ok.png');
  });

  it('keeps the legacy Image behaviour when no new prop is used', () => {
    render(<Image src="bad.png" alt="pic" />);
    fireEvent.error(screen.getByAltText('pic'));
    expect(screen.getByAltText('pic').getAttribute('src')).toContain(
      'placeholder'
    );
  });
});
