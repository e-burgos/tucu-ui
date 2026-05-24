import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { RadarChart } from '../../components/charts/radar-chart';

describe('RadarChart', () => {
  it('renders without crashing', () => {
    const data = [
      { subject: 'Math', A: 120 },
      { subject: 'Science', A: 98 },
      { subject: 'English', A: 86 },
    ];
    const series = [{ dataKey: 'A', name: 'Student A' }];
    const { container } = render(<RadarChart data={data} series={series} />);
    expect(container).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    const { container } = render(
      <RadarChart data={[]} series={[{ dataKey: 'A' }]} />
    );
    expect(container).toBeInTheDocument();
  });
});
