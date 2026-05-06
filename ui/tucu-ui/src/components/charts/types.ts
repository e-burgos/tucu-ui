export interface ChartDataPoint {
  name: string;
  [key: string]: string | number | null | undefined;
}

export interface ChartSeries {
  dataKey: string;
  name?: string;
  color?: string;
  type?: 'line' | 'bar' | 'area';
  strokeDasharray?: string;
  fillOpacity?: number;
  stackId?: string;
}

export interface ChartBaseProps {
  data: ChartDataPoint[];
  height?: number;
  className?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  animate?: boolean;
  emptyMessage?: string;
}

export interface PieDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface RadarDataPoint {
  subject: string;
  [key: string]: string | number;
}
