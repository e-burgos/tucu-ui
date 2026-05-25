import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Image } from '../../components/utils/image';

describe('Image', () => {
  it('renders with src and alt', () => {
    render(<Image src="https://example.com/photo.jpg" alt="Test photo" />);
    const img = screen.getByAltText('Test photo');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  it('renders with custom width and height', () => {
    render(
      <Image
        src="https://example.com/img.png"
        alt="Sized image"
        width={200}
        height={100}
      />
    );
    const img = screen.getByAltText('Sized image');
    expect(img).toBeInTheDocument();
  });
});
