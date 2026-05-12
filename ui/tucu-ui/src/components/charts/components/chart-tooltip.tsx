import { type TooltipContentProps } from 'recharts';
import { useChartTheme } from '../hooks/use-chart-theme';

type ChartTooltipPayload = {
  color?: string;
  name?: string;
  value?: number | string;
  dataKey?: string;
  payload?: Record<string, unknown>;
};

export function ChartTooltip({
  active,
  payload,
  label,
}: Partial<TooltipContentProps<number | string, string>>) {
  const theme = useChartTheme();

  if (!active || !payload?.length) return null;

  return (
    <div
      data-tucu="chart-tooltip"
      className="rounded-lg px-3 py-2 shadow-lg border text-xs"
      style={{
        backgroundColor: theme.tooltipBg,
        borderColor: theme.tooltipBorder,
        color: theme.tooltipText,
      }}
    >
      {label && (
        <p
          className="mb-1 font-medium text-[11px]"
          style={{ color: theme.text }}
        >
          {label}
        </p>
      )}
      {(payload as readonly ChartTooltipPayload[]).map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[11px]" style={{ color: theme.text }}>
            {entry.name}:
          </span>
          <span className="font-semibold" style={{ color: theme.tooltipText }}>
            {typeof entry.value === 'number'
              ? entry.value.toLocaleString()
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}
