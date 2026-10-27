'use client';

import { AreaChart } from '@e-burgos/tucu-ui';

const revenue = [
  { name: 'Jan', revenue: 4200, costs: 2400 },
  { name: 'Feb', revenue: 5100, costs: 2900 },
  { name: 'Mar', revenue: 4800, costs: 2700 },
  { name: 'Apr', revenue: 6200, costs: 3100 },
  { name: 'May', revenue: 7000, costs: 3300 },
];

const series = [
  { dataKey: 'revenue', name: 'Revenue' },
  { dataKey: 'costs', name: 'Costs' },
];

export function DashboardChart() {
  return <AreaChart data={revenue} series={series} height={320} />;
}
