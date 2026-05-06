import { useMemo } from 'react';
import {
  RadarChart as RechartsRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { RadarDataPoint } from '../types';
import { useChartTheme } from '../hooks/use-chart-theme';
import { ChartContainer } from '../components/chart-container';
import { ChartTooltip } from '../components/chart-tooltip';
import { ChartEmptyState } from '../components/chart-empty-state';

export interface RadarChartProps {
  data: RadarDataPoint[];
  series: { dataKey: string; name?: string; color?: string }[];
  height?: number;
  className?: string;
  showTooltip?: boolean;
  showLegend?: boolean;
  fillOpacity?: number;
  animate?: boolean;
  emptyMessage?: string;
}

export function RadarChart({
  data,
  series,
  height = 300,
  className,
  showTooltip = true,
  showLegend = true,
  fillOpacity = 0.3,
  animate = true,
  emptyMessage,
}: RadarChartProps) {
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

  return (
    <ChartContainer
      height={height}
      className={className}
      ariaLabel="Radar chart"
    >
      <RechartsRadarChart
        cx="50%"
        cy="50%"
        outerRadius="70%"
        data={data}
        accessibilityLayer={false}
        tabIndex={-1}
        style={{ outline: 'none' }}
      >
        <PolarGrid stroke={theme.grid} />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: theme.text, fontSize: 11 }}
        />
        <PolarRadiusAxis
          tick={{ fill: theme.text, fontSize: 10 }}
          axisLine={false}
        />
        {series.map((s, i) => {
          const color = s.color || theme.colors[i % theme.colors.length];
          return (
            <Radar
              key={s.dataKey}
              name={s.name || s.dataKey}
              dataKey={s.dataKey}
              stroke={color}
              fill={color}
              fillOpacity={fillOpacity}
              strokeWidth={2}
              isAnimationActive={animate && !prefersReducedMotion}
              animationDuration={800}
            />
          );
        })}
        {showTooltip && <Tooltip content={<ChartTooltip />} cursor={false} />}
        {showLegend && (
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingTop: 16, fontSize: 12, color: theme.text }}
          />
        )}
      </RechartsRadarChart>
    </ChartContainer>
  );
}
