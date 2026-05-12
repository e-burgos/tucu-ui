import { useChartTheme } from '../hooks/use-chart-theme';

interface ChartEmptyStateProps {
  message?: string;
  height?: number;
}

export function ChartEmptyState({
  message = 'No data available',
  height = 300,
}: ChartEmptyStateProps) {
  const theme = useChartTheme();

  return (
    <div
      data-tucu="chart-empty"
      className="flex items-center justify-center rounded-lg border border-dashed"
      style={{
        height,
        borderColor: theme.border,
        color: theme.text,
      }}
    >
      <p className="text-sm">{message}</p>
    </div>
  );
}
