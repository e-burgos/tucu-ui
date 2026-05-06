import { useMemo } from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { ChartBaseProps, ChartSeries } from '../types';
import { useChartTheme } from '../hooks/use-chart-theme';
import { ChartContainer } from '../components/chart-container';
import { ChartTooltip } from '../components/chart-tooltip';
import { ChartEmptyState } from '../components/chart-empty-state';

export interface AreaChartProps extends ChartBaseProps {
  series: ChartSeries[];
  xAxisKey?: string;
  curved?: boolean;
  gradient?: boolean;
  stacked?: boolean;
}

export function AreaChart({
  data,
  series,
  height = 300,
  className,
  xAxisKey = 'name',
  curved = true,
  gradient = true,
  stacked = false,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  animate = true,
  emptyMessage,
}: AreaChartProps) {
  const theme = useChartTheme();

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const gradientDefs = useMemo(
    () =>
      series.map((s, i) => {
        const color = s.color || theme.colors[i % theme.colors.length];
        return { id: `area-gradient-${s.dataKey}`, color };
      }),
    [series, theme.colors]
  );

  if (!data.length) {
    return <ChartEmptyState message={emptyMessage} height={height} />;
  }

  return (
    <ChartContainer
      height={height}
      className={className}
      ariaLabel="Area chart"
    >
      <RechartsAreaChart
        data={data}
        margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
        accessibilityLayer={false}
        tabIndex={-1}
        style={{ outline: 'none' }}
      >
        {gradient && (
          <defs>
            {gradientDefs.map(({ id, color }) => (
              <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            ))}
          </defs>
        )}
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={theme.grid}
          />
        )}
        <XAxis
          dataKey={xAxisKey}
          axisLine={false}
          tickLine={false}
          tick={{ fill: theme.text, fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: theme.text, fontSize: 12 }}
          width={45}
        />
        {showTooltip && (
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ fill: theme.cursorFill }}
          />
        )}
        {showLegend && (
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingTop: 16, fontSize: 12, color: theme.text }}
          />
        )}
        {series.map((s, i) => {
          const color = s.color || theme.colors[i % theme.colors.length];
          const gradientId = `area-gradient-${s.dataKey}`;
          return (
            <Area
              key={s.dataKey}
              type={curved ? 'monotone' : 'linear'}
              dataKey={s.dataKey}
              name={s.name || s.dataKey}
              stroke={color}
              strokeWidth={2}
              fill={gradient ? `url(#${gradientId})` : color}
              fillOpacity={gradient ? 1 : s.fillOpacity ?? 0.2}
              stackId={stacked ? 'stack' : s.stackId}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              isAnimationActive={animate && !prefersReducedMotion}
              animationDuration={800}
            />
          );
        })}
      </RechartsAreaChart>
    </ChartContainer>
  );
}
