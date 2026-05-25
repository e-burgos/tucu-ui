import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { Scrollbar } from '../../components/common/scrollbar';

describe('Scrollbar', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Scrollbar>
        <p>Scrollable content</p>
      </Scrollbar>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
