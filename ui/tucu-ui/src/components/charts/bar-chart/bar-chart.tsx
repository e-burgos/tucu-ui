import { useMemo } from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
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

export interface BarChartProps extends ChartBaseProps {
  series: ChartSeries[];
  xAxisKey?: string;
  layout?: 'horizontal' | 'vertical';
  stacked?: boolean;
  barRadius?: number;
  barGap?: number;
}

export function BarChart({
  data,
  series,
  height = 300,
  className,
  xAxisKey = 'name',
  layout = 'horizontal',
  stacked = false,
  barRadius = 4,
  barGap = 4,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  animate = true,
  emptyMessage,
}: BarChartProps) {
  const theme = useChartTheme();

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  if (!data.length) {
    return <ChartEmptyState message={emptyMessage} height={height} />;
  }

  const isVertical = layout === 'vertical';

  return (
    <ChartContainer height={height} className={className} ariaLabel="Bar chart">
      <RechartsBarChart
        data={data}
        layout={isVertical ? 'vertical' : 'horizontal'}
        margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
        barGap={barGap}
        barCategoryGap="20%"
        accessibilityLayer={false}
        tabIndex={-1}
        style={{ outline: 'none' }}
      >
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={isVertical}
            horizontal={!isVertical}
            stroke={theme.grid}
          />
        )}
        {isVertical ? (
          <>
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: theme.text, fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fill: theme.text, fontSize: 12 }}
              width={80}
            />
          </>
        ) : (
          <>
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
          </>
        )}
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
        {series.map((s, i) => (
          <Bar
            key={s.dataKey}
            dataKey={s.dataKey}
            name={s.name || s.dataKey}
            fill={s.color || theme.colors[i % theme.colors.length]}
            radius={
              isVertical
                ? [0, barRadius, barRadius, 0]
                : [barRadius, barRadius, 0, 0]
            }
            stackId={stacked ? 'stack' : s.stackId}
            isAnimationActive={animate && !prefersReducedMotion}
            animationDuration={800}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
}
