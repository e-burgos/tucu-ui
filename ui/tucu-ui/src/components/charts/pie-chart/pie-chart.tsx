import { useMemo } from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { PieDataPoint } from '../types';
import { useChartTheme } from '../hooks/use-chart-theme';
import { ChartContainer } from '../components/chart-container';
import { ChartTooltip } from '../components/chart-tooltip';
import { ChartEmptyState } from '../components/chart-empty-state';

export interface PieChartProps {
  data: PieDataPoint[];
  height?: number;
  className?: string;
  donut?: boolean;
  showLabels?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  animate?: boolean;
  innerContent?: React.ReactNode;
  emptyMessage?: string;
}

export function PieChart({
  data,
  height = 300,
  className,
  donut = false,
  showLabels = true,
  showTooltip = true,
  showLegend = true,
  animate = true,
  innerContent,
  emptyMessage,
}: PieChartProps) {
  const theme = useChartTheme();

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const colors = useMemo(
    () => data.map((d, i) => d.color || theme.colors[i % theme.colors.length]),
    [data, theme.colors]
  );

  if (!data.length) {
    return <ChartEmptyState message={emptyMessage} height={height} />;
  }

  const outerRadius = height * 0.35;
  const innerRadius = donut ? outerRadius * 0.6 : 0;

  return (
    <ChartContainer height={height} className={className} ariaLabel="Pie chart">
      <RechartsPieChart
        accessibilityLayer={false}
        tabIndex={-1}
        style={{ outline: 'none' }}
      >
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={donut ? 3 : 1}
          dataKey="value"
          nameKey="name"
          strokeWidth={0}
          label={
            showLabels && !donut
              ? ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`
              : undefined
          }
          labelLine={showLabels && !donut}
          isAnimationActive={animate && !prefersReducedMotion}
          animationDuration={800}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i]} />
          ))}
        </Pie>
        {showTooltip && <Tooltip content={<ChartTooltip />} cursor={false} />}
        {showLegend && (
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingTop: 16, fontSize: 12, color: theme.text }}
          />
        )}
        {donut && innerContent && (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-lg font-bold"
            fill={theme.tooltipText}
          >
            {innerContent}
          </text>
        )}
      </RechartsPieChart>
    </ChartContainer>
  );
}
