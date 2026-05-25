import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { PieChart } from '../../components/charts/pie-chart';

describe('PieChart', () => {
  it('renders without crashing', () => {
    const data = [
      { name: 'A', value: 100 },
      { name: 'B', value: 200 },
      { name: 'C', value: 150 },
    ];
    const { container } = render(<PieChart data={data} />);
    expect(container).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    const { container } = render(<PieChart data={[]} />);
    expect(container).toBeInTheDocument();
  });
});
