import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import FileInput from '../../components/inputs/file-input';

describe('FileInput', () => {
  it('renders without crashing', () => {
    const { container } = render(<FileInput />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<FileInput label="Upload file" />);
    expect(screen.getByText('Upload file')).toBeInTheDocument();
  });
});
