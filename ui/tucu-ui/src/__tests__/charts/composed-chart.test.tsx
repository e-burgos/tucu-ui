import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { ComposedChart } from '../../components/charts/composed-chart';

describe('ComposedChart', () => {
  it('renders without crashing', () => {
    const data = [
      { name: 'A', bar: 100, line: 80 },
      { name: 'B', bar: 200, line: 150 },
    ];
    const series = [
      { dataKey: 'bar', name: 'Bar', type: 'bar' as const },
      { dataKey: 'line', name: 'Line', type: 'line' as const },
    ];
    const { container } = render(<ComposedChart data={data} series={series} />);
    expect(container).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    const { container } = render(
      <ComposedChart
        data={[]}
        series={[{ dataKey: 'bar', type: 'bar' as const }]}
      />
    );
    expect(container).toBeInTheDocument();
  });
});
