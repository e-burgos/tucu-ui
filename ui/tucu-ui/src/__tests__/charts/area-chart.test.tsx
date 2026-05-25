import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { AreaChart } from '../../components/charts/area-chart';

describe('AreaChart', () => {
  it('renders without crashing', () => {
    const data = [
      { name: 'A', value: 100 },
      { name: 'B', value: 200 },
    ];
    const series = [{ dataKey: 'value', name: 'Value' }];
    const { container } = render(<AreaChart data={data} series={series} />);
    expect(container).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    const { container } = render(
      <AreaChart data={[]} series={[{ dataKey: 'value' }]} />
    );
    expect(container).toBeInTheDocument();
  });
});
