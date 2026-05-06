import { useMemo } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
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

export interface LineChartProps extends ChartBaseProps {
  series: ChartSeries[];
  xAxisKey?: string;
  curved?: boolean;
  showDots?: boolean;
  strokeWidth?: number;
}

export function LineChart({
  data,
  series,
  height = 300,
  className,
  xAxisKey = 'name',
  curved = true,
  showDots,
  strokeWidth = 2,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  animate = true,
  emptyMessage,
}: LineChartProps) {
  const theme = useChartTheme();

  const resolvedShowDots = useMemo(
    () => (showDots !== undefined ? showDots : data.length <= 10),
    [showDots, data.length]
  );

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  if (!data.length) {
    return <ChartEmptyState message={emptyMessage} height={height} />;
  }

  return (
    <ChartContainer
      height={height}
      className={className}
      ariaLabel="Line chart"
    >
      <RechartsLineChart
        data={data}
        margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
        accessibilityLayer={false}
        tabIndex={-1}
        style={{ outline: 'none' }}
      >
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
            cursor={{ stroke: theme.cursorFill }}
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
          <Line
            key={s.dataKey}
            type={curved ? 'monotone' : 'linear'}
            dataKey={s.dataKey}
            name={s.name || s.dataKey}
            stroke={s.color || theme.colors[i % theme.colors.length]}
            strokeWidth={strokeWidth}
            strokeDasharray={s.strokeDasharray}
            dot={resolvedShowDots}
            activeDot={{ r: 5, strokeWidth: 0 }}
            isAnimationActive={animate && !prefersReducedMotion}
            animationDuration={800}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
}
