import { useMemo } from 'react';
import {
  ComposedChart as RechartsComposedChart,
  Line,
  Bar,
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

export interface ComposedChartProps extends ChartBaseProps {
  series: (ChartSeries & { type: 'line' | 'bar' | 'area' })[];
  xAxisKey?: string;
  barRadius?: number;
}

export function ComposedChart({
  data,
  series,
  height = 300,
  className,
  xAxisKey = 'name',
  barRadius = 4,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  animate = true,
  emptyMessage,
}: ComposedChartProps) {
  const theme = useChartTheme();

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const gradientDefs = useMemo(
    () =>
      series
        .filter((s) => s.type === 'area')
        .map((s, i) => {
          const color = s.color || theme.colors[i % theme.colors.length];
          return { id: `composed-gradient-${s.dataKey}`, color };
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
      ariaLabel="Composed chart"
    >
      <RechartsComposedChart
        data={data}
        margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
        accessibilityLayer={false}
        tabIndex={-1}
        style={{ outline: 'none' }}
      >
        <defs>
          {gradientDefs.map(({ id, color }) => (
            <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
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
          const isAnimated = animate && !prefersReducedMotion;

          switch (s.type) {
            case 'bar':
              return (
                <Bar
                  key={s.dataKey}
                  dataKey={s.dataKey}
                  name={s.name || s.dataKey}
                  fill={color}
                  radius={[barRadius, barRadius, 0, 0]}
                  stackId={s.stackId}
                  isAnimationActive={isAnimated}
                  animationDuration={800}
                />
              );
            case 'area':
              return (
                <Area
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  name={s.name || s.dataKey}
                  stroke={color}
                  strokeWidth={2}
                  fill={`url(#composed-gradient-${s.dataKey})`}
                  dot={false}
                  stackId={s.stackId}
                  isAnimationActive={isAnimated}
                  animationDuration={800}
                />
              );
            case 'line':
            default:
              return (
                <Line
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  name={s.name || s.dataKey}
                  stroke={color}
                  strokeWidth={2}
                  strokeDasharray={s.strokeDasharray}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                  isAnimationActive={isAnimated}
                  animationDuration={800}
                />
              );
          }
        })}
      </RechartsComposedChart>
    </ChartContainer>
  );
}
