# Skill: Recharts — React Charting Library

Comprehensive reference for building data visualizations with **Recharts** in React + TypeScript projects. Covers all chart types, components, patterns, performance optimization, theming, accessibility, and real-world examples.

> **Docs**: [recharts.org](https://recharts.org/) > **npm**: `recharts` > **GitHub**: [recharts/recharts](https://github.com/recharts/recharts) > **Version**: 3.x (React 18/19 compatible)

> **tucu-ui Wrappers**: The `@e-burgos/tucu-ui` library provides themed wrappers (`LineChart`, `BarChart`, `AreaChart`, `PieChart`, `RadarChart`, `ComposedChart`) that auto-integrate with the design system theme (dark/light). Prefer using these wrappers in tucu-ui projects — they handle `ResponsiveContainer`, theming, empty states, and accessibility out of the box. See `tucu-ui-catalog` skill §2.21 for their API.

---

## 1. Architecture & Philosophy

Recharts is a **declarative**, **composable** chart library built on React + D3 submodules.

### Core Principles

1. **Composition over configuration** — Charts are composed of independent React components
2. **Native SVG** — All rendered output is standard SVG, easily styleable
3. **Declarative** — Data flows top-down via props, no imperative API
4. **Lightweight** — Only imports necessary D3 submodules (no full d3 bundle)

### Mental Model

```
<ChartContainer>        → LineChart, BarChart, AreaChart, etc.
  <Axis />              → XAxis, YAxis
  <Grid />              → CartesianGrid
  <DataSeries />        → Line, Bar, Area, Scatter, Pie, Radar
  <Interactivity />     → Tooltip, Legend, Brush
  <Annotations />       → ReferenceLine, ReferenceArea, ReferenceDot
  <Labels />            → Label, LabelList
</ChartContainer>
```

---

## 2. Installation

```bash
pnpm add recharts
# TypeScript types included in package
```

**Peer Dependencies**: `react >=16.8`, `react-dom >=16.8`

> **Note**: In tucu-ui projects, Recharts is already bundled as a dependency. Do NOT install it separately — import chart components from `@e-burgos/tucu-ui`.

---

## 3. Chart Types — Complete Reference

### 3.1 Cartesian Charts

| Chart           | Use Case                            | Data Series                 |
| --------------- | ----------------------------------- | --------------------------- |
| `LineChart`     | Trends over time, continuous data   | `<Line>`                    |
| `BarChart`      | Comparisons between categories      | `<Bar>`                     |
| `AreaChart`     | Volume/accumulation over time       | `<Area>`                    |
| `ComposedChart` | Mix lines, bars, areas in one chart | `<Line>`, `<Bar>`, `<Area>` |
| `ScatterChart`  | Correlation between two variables   | `<Scatter>`                 |

### 3.2 Polar Charts

| Chart            | Use Case                     | Data Series   |
| ---------------- | ---------------------------- | ------------- |
| `PieChart`       | Part-to-whole proportions    | `<Pie>`       |
| `RadarChart`     | Multi-dimensional comparison | `<Radar>`     |
| `RadialBarChart` | Circular progress/comparison | `<RadialBar>` |

### 3.3 Specialized Charts

| Chart           | Use Case                               |
| --------------- | -------------------------------------- |
| `Treemap`       | Hierarchical data as nested rectangles |
| `SunburstChart` | Hierarchical data as concentric rings  |
| `Sankey`        | Flow/allocation between nodes          |
| `FunnelChart`   | Conversion/stage progression           |

---

## 4. Essential Components

### 4.1 Container — `ResponsiveContainer`

**ALWAYS wrap charts in `ResponsiveContainer`** for responsive sizing:

```tsx
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Line type="monotone" dataKey="value" stroke="#8884d8" />
  </LineChart>
</ResponsiveContainer>;
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string \| number` | `'100%'` | Container width |
| `height` | `string \| number` | `'100%'` | Container height |
| `aspect` | `number` | — | Width/height ratio (alternative to fixed height) |
| `minWidth` | `number` | — | Minimum width |
| `minHeight` | `number` | — | Minimum height |
| `debounce` | `number` | `0` | Resize debounce in ms |

> ⚠️ **CRITICAL**: `ResponsiveContainer` must have explicit `height` (number or CSS). It cannot infer height from `100%` parent without an explicitly sized ancestor.

### 4.2 Axes

```tsx
<XAxis
  dataKey="name"           // Key in data array
  type="category"          // 'category' | 'number'
  scale="auto"             // 'auto' | 'linear' | 'log' | 'pow' | 'sqrt' | 'time' | 'band' | 'point'
  domain={['auto', 'auto']} // [min, max] or ['dataMin', 'dataMax']
  tickFormatter={(v) => `${v}%`}
  tick={{ fill: '#666', fontSize: 12 }}
  axisLine={{ stroke: '#ccc' }}
  tickLine={false}
  angle={-45}              // Rotate tick labels
  textAnchor="end"
  height={60}              // Extra height for rotated labels
  hide={false}
/>

<YAxis
  dataKey="value"
  type="number"
  domain={[0, 'dataMax + 10']}
  tickFormatter={(v) => `$${v.toLocaleString()}`}
  width={80}               // Width for formatted labels
  orientation="left"       // 'left' | 'right'
  yAxisId="left"           // For dual Y-axis charts
/>
```

### 4.3 Grid

```tsx
<CartesianGrid
  strokeDasharray="3 3" // Dashed lines
  stroke="#e0e0e0"
  horizontal={true}
  vertical={false}
  fill="#fafafa" // Background fill
  fillOpacity={0.5}
/>
```

### 4.4 Tooltip

```tsx
// Default tooltip
<Tooltip />

// Custom styled tooltip
<Tooltip
  contentStyle={{
    backgroundColor: '#1a1a2e',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
  }}
  labelStyle={{ color: '#aaa' }}
  itemStyle={{ color: '#fff' }}
  formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
  labelFormatter={(label) => `Date: ${label}`}
  cursor={{ stroke: '#8884d8', strokeWidth: 1 }}
/>

// Fully custom tooltip component
<Tooltip content={<CustomTooltip />} />

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-gray-900 p-3 shadow-lg border border-gray-700">
      <p className="text-sm text-gray-400">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}: {entry.value?.toLocaleString()}
        </p>
      ))}
    </div>
  );
};
```

### 4.5 Legend

```tsx
<Legend
  verticalAlign="bottom" // 'top' | 'middle' | 'bottom'
  align="center" // 'left' | 'center' | 'right'
  iconType="circle" // 'line' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye'
  iconSize={10}
  wrapperStyle={{ paddingTop: 20 }}
  formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
  onClick={(e) => handleLegendClick(e)}
/>
```

### 4.6 Brush (Range Selector)

```tsx
<Brush dataKey="name" height={30} stroke="#8884d8" startIndex={0} endIndex={data.length - 1} onChange={({ startIndex, endIndex }) => console.log(startIndex, endIndex)} />
```

### 4.7 Reference Elements (Annotations)

```tsx
// Horizontal/Vertical reference line
<ReferenceLine
  y={average}
  stroke="#ff7300"
  strokeDasharray="5 5"
  label={{ value: 'Avg', position: 'right' }}
/>

// Reference area (highlight zone)
<ReferenceArea
  x1="Mar"
  x2="Jun"
  fill="#8884d8"
  fillOpacity={0.1}
  label="Q2"
/>

// Reference dot
<ReferenceDot
  x="May"
  y={1200}
  r={6}
  fill="#ff7300"
  stroke="none"
/>
```

---

## 5. Data Series — Detailed Props

### 5.1 Line

```tsx
<Line
  type="monotone" // 'basis' | 'basisClosed' | 'basisOpen' | 'linear' | 'linearClosed' | 'natural' | 'monotone' | 'monotoneX' | 'monotoneY' | 'step' | 'stepBefore' | 'stepAfter'
  dataKey="revenue"
  stroke="#8884d8"
  strokeWidth={2}
  dot={false} // boolean | object | ReactElement | Function
  activeDot={{ r: 6, fill: '#8884d8' }}
  connectNulls={true} // Connect across null data points
  animationDuration={1000}
  animationEasing="ease-in-out"
  name="Revenue" // Legend/tooltip label
  yAxisId="left" // Which Y-axis to use
  strokeDasharray="5 5" // Dashed line
/>
```

### 5.2 Bar

```tsx
<Bar
  dataKey="sales"
  fill="#82ca9d"
  radius={[4, 4, 0, 0]} // Rounded top corners
  barSize={20} // Fixed bar width
  maxBarSize={50} // Max bar width
  stackId="a" // Stack with same stackId
  name="Sales"
  activeBar={{ fill: '#66bb6a' }}
  label={{ position: 'top', fill: '#666' }}
  background={{ fill: '#f5f5f5', radius: 4 }}
/>
```

### 5.3 Area

```tsx
<Area
  type="monotone"
  dataKey="amount"
  stroke="#8884d8"
  fill="#8884d8"
  fillOpacity={0.3}
  stackId="1"             // Stacked areas
  connectNulls={true}
  dot={false}
  activeDot={{ r: 4 }}
  baseValue="dataMin"     // 'dataMin' | 'dataMax' | number
/>

{/* Gradient fill */}
<defs>
  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
  </linearGradient>
</defs>
<Area fill="url(#colorRevenue)" stroke="#8884d8" />
```

### 5.4 Pie

```tsx
<PieChart>
  <Pie
    data={data}
    cx="50%"
    cy="50%"
    innerRadius={60} // > 0 makes donut chart
    outerRadius={100}
    paddingAngle={2} // Gap between slices
    dataKey="value"
    nameKey="name"
    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
    labelLine={true}
    animationBegin={0}
    animationDuration={800}
  >
    {data.map((entry, index) => (
      <Cell key={index} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>
  <Tooltip />
  <Legend />
</PieChart>
```

### 5.5 Radar

```tsx
<RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
  <PolarGrid />
  <PolarAngleAxis dataKey="subject" />
  <PolarRadiusAxis angle={30} domain={[0, 100]} />
  <Radar name="Student A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5} />
  <Radar name="Student B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.5} />
  <Legend />
  <Tooltip />
</RadarChart>
```

### 5.6 Scatter

```tsx
<ScatterChart>
  <CartesianGrid />
  <XAxis type="number" dataKey="x" name="Height" unit="cm" />
  <YAxis type="number" dataKey="y" name="Weight" unit="kg" />
  <ZAxis type="number" dataKey="z" range={[60, 400]} name="Score" />
  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
  <Scatter
    name="Group A"
    data={dataA}
    fill="#8884d8"
    shape="circle" // 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye' | ReactElement
  />
</ScatterChart>
```

---

## 6. Common Patterns

### 6.1 Dual Y-Axis

```tsx
<ComposedChart data={data}>
  <XAxis dataKey="month" />
  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
  <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" />
  <Line yAxisId="right" dataKey="growth" stroke="#82ca9d" />
  <Tooltip />
  <Legend />
</ComposedChart>
```

### 6.2 Stacked Bar Chart

```tsx
<BarChart data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="desktop" stackId="a" fill="#8884d8" radius={[0, 0, 0, 0]} />
  <Bar dataKey="mobile" stackId="a" fill="#82ca9d" radius={[4, 4, 0, 0]} />
</BarChart>
```

### 6.3 Gradient Area Chart

```tsx
<AreaChart data={data}>
  <defs>
    <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.05} />
    </linearGradient>
  </defs>
  <CartesianGrid strokeDasharray="3 3" vertical={false} />
  <XAxis dataKey="date" />
  <YAxis />
  <Tooltip />
  <Area type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} fill="url(#gradient1)" dot={false} />
</AreaChart>
```

### 6.4 Donut Chart with Center Label

```tsx
<PieChart>
  <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={100} dataKey="value" strokeWidth={0}>
    {data.map((entry, i) => (
      <Cell key={i} fill={COLORS[i % COLORS.length]} />
    ))}
  </Pie>
  {/* Center label using custom SVG */}
  <text x="50%" y="48%" textAnchor="middle" className="text-2xl font-bold fill-current">
    {total}
  </text>
  <text x="50%" y="58%" textAnchor="middle" className="text-sm fill-gray-500">
    Total
  </text>
</PieChart>
```

### 6.5 Multi-Line with Custom Dots

```tsx
<LineChart data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="series1" stroke="#8884d8" dot={({ cx, cy, value }) => <circle cx={cx} cy={cy} r={value > 100 ? 6 : 3} fill="#8884d8" />} />
  <Line type="monotone" dataKey="series2" stroke="#82ca9d" dot={false} />
</LineChart>
```

### 6.6 Horizontal Bar Chart

```tsx
<BarChart data={data} layout="vertical">
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis type="number" />
  <YAxis type="category" dataKey="name" width={100} />
  <Tooltip />
  <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]} />
</BarChart>
```

### 6.7 Interactive Click Handlers

```tsx
<BarChart
  data={data}
  onClick={(e) => {
    if (e?.activePayload) {
      const clickedData = e.activePayload[0].payload;
      handleBarClick(clickedData);
    }
  }}
>
  <Bar dataKey="value" fill="#8884d8" cursor="pointer" />
</BarChart>;

{
  /* Pie slice click */
}
<Pie onClick={(data, index) => handleSliceClick(data, index)} />;
```

---

## 7. Dark Mode & Theming

### 7.1 CSS Variables Pattern (Recommended)

```tsx
// Define colors via CSS custom properties
const chartColors = {
  grid: 'var(--chart-grid, #e5e7eb)',
  text: 'var(--chart-text, #374151)',
  tooltip: {
    bg: 'var(--chart-tooltip-bg, #ffffff)',
    border: 'var(--chart-tooltip-border, #e5e7eb)',
    text: 'var(--chart-tooltip-text, #111827)',
  },
  series: ['var(--chart-1, #8b5cf6)', 'var(--chart-2, #06b6d4)', 'var(--chart-3, #10b981)', 'var(--chart-4, #f59e0b)', 'var(--chart-5, #ef4444)'],
};
```

```css
/* In your CSS / Tailwind theme */
:root {
  --chart-grid: #e5e7eb;
  --chart-text: #374151;
  --chart-tooltip-bg: #ffffff;
  --chart-tooltip-border: #e5e7eb;
  --chart-tooltip-text: #111827;
  --chart-1: #8b5cf6;
  --chart-2: #06b6d4;
  --chart-3: #10b981;
  --chart-4: #f59e0b;
  --chart-5: #ef4444;
}

.dark {
  --chart-grid: #374151;
  --chart-text: #d1d5db;
  --chart-tooltip-bg: #1f2937;
  --chart-tooltip-border: #374151;
  --chart-tooltip-text: #f9fafb;
  --chart-1: #a78bfa;
  --chart-2: #22d3ee;
  --chart-3: #34d399;
  --chart-4: #fbbf24;
  --chart-5: #f87171;
}
```

### 7.2 Dynamic Theme Hook

```tsx
import { useTheme } from '@e-burgos/tucu-ui'; // or your theme hook

function useChartTheme() {
  const { isDark } = useTheme();

  return {
    grid: isDark ? '#374151' : '#e5e7eb',
    text: isDark ? '#d1d5db' : '#374151',
    background: isDark ? '#1f2937' : '#ffffff',
    border: isDark ? '#374151' : '#e5e7eb',
    colors: isDark ? ['#a78bfa', '#22d3ee', '#34d399', '#fbbf24', '#f87171', '#fb923c'] : ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#f97316'],
  };
}
```

---

## 8. TypeScript Patterns

### 8.1 Data Types

```tsx
// Generic chart data
interface ChartDataPoint {
  name: string;
  [key: string]: string | number | null;
}

// Time series
interface TimeSeriesPoint {
  date: string; // ISO date or formatted
  timestamp: number; // Unix ms
  value: number;
  category?: string;
}

// Pie/Donut data
interface PieDataPoint {
  name: string;
  value: number;
  fill?: string;
}

// Scatter data
interface ScatterPoint {
  x: number;
  y: number;
  z?: number; // For bubble size (ZAxis)
  label?: string;
}
```

### 8.2 Custom Tooltip Types

```tsx
import { TooltipProps } from 'recharts';

type ChartTooltipProps = TooltipProps<number, string>;

const CustomTooltip: React.FC<ChartTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  // ...
};
```

### 8.3 Event Handler Types

```tsx
import { CategoricalChartState } from 'recharts/types/chart/types';

const handleChartClick = (state: CategoricalChartState | null) => {
  if (state?.activePayload) {
    const data = state.activePayload[0].payload;
  }
};
```

---

## 9. Performance Optimization

### 9.1 Rules

1. **Memoize data** — Use `useMemo` for computed/transformed data:

   ```tsx
   const chartData = useMemo(() => transformRawData(rawData), [rawData]);
   ```

2. **Limit data points** — For > 500 points, sample or aggregate:

   ```tsx
   const sampled = useMemo(() => sampleData(data, 200), [data]);
   ```

3. **Disable animations** on large datasets:

   ```tsx
   <Line isAnimationActive={data.length < 100} />
   ```

4. **Use `debounce` on `ResponsiveContainer`** for resize-heavy layouts:

   ```tsx
   <ResponsiveContainer debounce={100} />
   ```

5. **Avoid re-creating** tooltip/legend content functions on every render:

   ```tsx
   // ✅ Stable reference
   const formatter = useCallback((value: number) => `$${value}`, []);

   // ❌ Creates new function each render
   <Tooltip formatter={(value) => `$${value}`} />;
   ```

6. **Lazy load charts** — Split chart-heavy pages:
   ```tsx
   const ChartSection = lazy(() => import('./ChartSection'));
   ```

### 9.2 Large Dataset Patterns

```tsx
// Aggregation for time series
function aggregateByPeriod(data: TimeSeriesPoint[], period: 'day' | 'week' | 'month') {
  // Group and average/sum by period
  return grouped.map((group) => ({
    date: group.key,
    value: group.values.reduce((sum, d) => sum + d.value, 0) / group.values.length,
  }));
}

// Windowed rendering with Brush
<LineChart data={fullData}>
  <Line dataKey="value" dot={false} isAnimationActive={false} />
  <Brush dataKey="date" height={30} startIndex={fullData.length - 30} />
</LineChart>;
```

---

## 10. Accessibility

### 10.1 Required Patterns

```tsx
// Always provide accessible descriptions
<ResponsiveContainer>
  <LineChart
    data={data}
    role="img"
    aria-label="Revenue trend over the last 12 months"
  >
    {/* ... */}
  </LineChart>
</ResponsiveContainer>

// Screen-reader-only data table alternative
<div className="sr-only">
  <table>
    <caption>Revenue by month</caption>
    <thead><tr><th>Month</th><th>Revenue</th></tr></thead>
    <tbody>
      {data.map(d => (
        <tr key={d.name}><td>{d.name}</td><td>${d.value}</td></tr>
      ))}
    </tbody>
  </table>
</div>
```

### 10.2 Color Contrast

- Use distinguishable colors (avoid relying only on hue)
- Add patterns/shapes for colorblind users:
  ```tsx
  <Line strokeDasharray="5 5" />  {/* Dashed for series 2 */}
  <Line dot={{ shape: 'square' }} />
  ```

---

## 11. Responsive Patterns

### 11.1 Mobile Optimizations

```tsx
function useChartDimensions() {
  const isMobile = useMediaQuery('(max-width: 640px)');

  return {
    height: isMobile ? 200 : 350,
    margin: isMobile ? { top: 5, right: 10, left: -10, bottom: 5 } : { top: 10, right: 30, left: 10, bottom: 10 },
    fontSize: isMobile ? 10 : 12,
    showGrid: !isMobile,
    showDots: !isMobile,
    tickCount: isMobile ? 4 : 8,
  };
}

// Usage
const dims = useChartDimensions();

<ResponsiveContainer width="100%" height={dims.height}>
  <LineChart data={data} margin={dims.margin}>
    <XAxis dataKey="name" tick={{ fontSize: dims.fontSize }} interval={dims.tickCount > 4 ? 0 : 'preserveStartEnd'} />
    {dims.showGrid && <CartesianGrid strokeDasharray="3 3" />}
    <Line dot={dims.showDots} />
  </LineChart>
</ResponsiveContainer>;
```

### 11.2 Aspect Ratio Scaling

```tsx
// Maintain 16:9 ratio
<ResponsiveContainer width="100%" aspect={16 / 9}>
  <BarChart data={data}>...</BarChart>
</ResponsiveContainer>
```

---

## 12. Animation

### 12.1 Built-in Animation Props

Every data series accepts:

| Prop                | Type      | Default  | Description                                                              |
| ------------------- | --------- | -------- | ------------------------------------------------------------------------ |
| `isAnimationActive` | `boolean` | `true`   | Enable/disable animation                                                 |
| `animationBegin`    | `number`  | `0`      | Delay in ms                                                              |
| `animationDuration` | `number`  | `1500`   | Duration in ms                                                           |
| `animationEasing`   | `string`  | `'ease'` | `'ease'` \| `'ease-in'` \| `'ease-out'` \| `'ease-in-out'` \| `'linear'` |

### 12.2 Respecting User Preferences

```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<Line isAnimationActive={!prefersReducedMotion} animationDuration={prefersReducedMotion ? 0 : 1000} />;
```

---

## 13. Custom Shapes & Rendering

### 13.1 Custom Bar Shape

```tsx
const RoundedBar = (props: any) => {
  const { x, y, width, height, fill } = props;
  const radius = 6;
  return <rect x={x} y={y} width={width} height={height} rx={radius} ry={radius} fill={fill} />;
};

<Bar dataKey="value" shape={<RoundedBar />} />;
```

### 13.2 Custom Active Dot

```tsx
const PulseDot = (props: any) => {
  const { cx, cy, fill } = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r={8} fill={fill} opacity={0.2} />
      <circle cx={cx} cy={cy} r={4} fill={fill} />
    </g>
  );
};

<Line activeDot={<PulseDot />} />;
```

### 13.3 Custom Label

```tsx
const CustomLabel = (props: any) => {
  const { x, y, value } = props;
  return (
    <text x={x} y={y - 10} textAnchor="middle" fill="#666" fontSize={11}>
      {value > 1000 ? `${(value / 1000).toFixed(1)}k` : value}
    </text>
  );
};

<Bar dataKey="value" label={<CustomLabel />} />;
```

---

## 14. Real-World Chart Components

### 14.1 Dashboard Revenue Chart

```tsx
import { useMemo, useCallback } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface RevenueData {
  date: string;
  revenue: number;
  target: number;
}

interface RevenueChartProps {
  data: RevenueData[];
  height?: number;
}

export function RevenueChart({ data, height = 300 }: RevenueChartProps) {
  const formatCurrency = useCallback((value: number) => `$${(value / 1000).toFixed(0)}k`, []);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
        <XAxis dataKey="date" tick={{ fill: 'var(--chart-text)', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={formatCurrency} tick={{ fill: 'var(--chart-text)', fontSize: 12 }} axisLine={false} tickLine={false} width={50} />
        <Tooltip
          formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
          contentStyle={{
            backgroundColor: 'var(--chart-tooltip-bg)',
            border: '1px solid var(--chart-tooltip-border)',
            borderRadius: '8px',
          }}
        />
        <Area type="monotone" dataKey="target" stroke="var(--chart-2)" strokeDasharray="4 4" fill="none" strokeWidth={1.5} dot={false} name="Target" />
        <Area type="monotone" dataKey="revenue" stroke="var(--chart-1)" fill="url(#revenueGrad)" strokeWidth={2} dot={false} activeDot={{ r: 5 }} name="Revenue" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
```

### 14.2 KPI Donut

```tsx
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface KpiDonutProps {
  value: number;
  max: number;
  label: string;
  color?: string;
}

export function KpiDonut({ value, max, label, color = 'var(--chart-1)' }: KpiDonutProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const data = [{ value: percentage }, { value: 100 - percentage }];

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={65} startAngle={90} endAngle={-270} dataKey="value" strokeWidth={0}>
            <Cell fill={color} />
            <Cell fill="var(--chart-grid)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{percentage.toFixed(0)}%</span>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
    </div>
  );
}
```

### 14.3 Comparison Bar Chart

```tsx
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

interface ComparisonData {
  category: string;
  current: number;
  previous: number;
}

export function ComparisonChart({ data }: { data: ComparisonData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barGap={4} barCategoryGap="20%">
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
        <XAxis dataKey="category" tick={{ fill: 'var(--chart-text)', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--chart-text)', fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--chart-tooltip-bg)',
            border: '1px solid var(--chart-tooltip-border)',
            borderRadius: '8px',
          }}
        />
        <Legend iconType="circle" iconSize={8} />
        <Bar dataKey="previous" fill="var(--chart-grid)" radius={[4, 4, 0, 0]} name="Previous" />
        <Bar dataKey="current" fill="var(--chart-1)" radius={[4, 4, 0, 0]} name="Current" />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

---

## 15. Common Mistakes & Solutions

| Mistake                                                    | Symptom                                    | Fix                                                                 |
| ---------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| No `ResponsiveContainer`                                   | Chart doesn't render or has 0 size         | Always wrap in `ResponsiveContainer` with explicit height           |
| `ResponsiveContainer` height="100%"                        | Chart invisible                            | Parent must have explicit height, or use fixed number               |
| Using `width`/`height` on chart inside ResponsiveContainer | Double sizing, clipping                    | Remove width/height from inner chart when using ResponsiveContainer |
| Data array reference changes                               | Unnecessary re-renders, animation restarts | Memoize data with `useMemo`                                         |
| Tooltip formatter recreated each render                    | Perf degradation                           | Use `useCallback` or stable reference                               |
| Missing `dataKey` on axis                                  | Axis doesn't align with data               | Ensure `XAxis dataKey` matches a property in your data objects      |
| `type="number"` on category axis                           | Empty/misaligned axis                      | Use `type="category"` for string-based axes                         |
| Pie chart without `<Cell>`                                 | Single color for all slices                | Add `<Cell fill={color} />` for each data entry                     |
| `domain` not working                                       | Axis ignores custom domain                 | Ensure `type="number"` is set on that axis                          |
| Chart flickers on re-render                                | Animation restarts                         | Set `isAnimationActive={false}` or use stable key                   |

---

## 16. Integration with tucu-ui

When using Recharts inside `@e-burgos/tucu-ui` components:

```tsx
import { Card, CardContent, CardHeader, useTheme } from '@e-burgos/tucu-ui';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export function DashboardChart({ data }: { data: ChartDataPoint[] }) {
  const { isDark } = useTheme();

  return (
    <Card>
      <CardHeader title="Performance" subtitle="Last 30 days" />
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="date" tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : '#fff',
                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
              }}
            />
            <Line type="monotone" dataKey="value" stroke={isDark ? '#a78bfa' : '#8b5cf6'} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
```

---

## 17. Agent Guidelines

### DO:

- Always wrap charts in `ResponsiveContainer` with explicit `height`
- Use CSS variables for colors to support dark mode
- Memoize data transformations with `useMemo`
- Stabilize callback functions with `useCallback`
- Use `type="monotone"` for smooth lines, `"linear"` for angular
- Add `dot={false}` for dense datasets (>20 points)
- Set `vertical={false}` on `CartesianGrid` for cleaner look
- Use `axisLine={false}` and `tickLine={false}` for modern minimal axes
- Provide `aria-label` on the chart wrapper for accessibility
- Respect `prefers-reduced-motion` for animations
- Use `radius` prop on `<Bar>` for rounded corners (modern aesthetic)

### DON'T:

- Don't set `width`/`height` on chart component when inside `ResponsiveContainer`
- Don't use `ResponsiveContainer` with `height="100%"` unless parent has explicit height
- Don't forget `dataKey` — it's required on all data series and axes
- Don't pass unstable function references to `formatter`, `content`, `shape` props
- Don't render >500 data points without sampling or virtualization
- Don't use inline objects for `tick`, `dot`, `activeDot` styles (recreated each render)
- Don't nest `ResponsiveContainer` inside another `ResponsiveContainer`
- Don't use `PieChart` for >8 categories (consider BarChart instead)
- Don't forget `<Cell>` inside `<Pie>` when you need per-slice colors

---

## 18. Exports Reference (Complete)

### Charts

`LineChart`, `BarChart`, `AreaChart`, `ComposedChart`, `ScatterChart`, `PieChart`, `RadarChart`, `RadialBarChart`, `Treemap`, `SunburstChart`, `Sankey`, `FunnelChart`

### Cartesian Components

`XAxis`, `YAxis`, `ZAxis`, `CartesianGrid`, `CartesianAxis`, `Line`, `Area`, `Bar`, `Scatter`, `Brush`, `ReferenceLine`, `ReferenceDot`, `ReferenceArea`, `ErrorBar`

### Polar Components

`PolarGrid`, `PolarAngleAxis`, `PolarRadiusAxis`, `Pie`, `Radar`, `RadialBar`

### General Components

`ResponsiveContainer`, `Legend`, `Tooltip`, `Cell`, `Label`, `LabelList`, `Text`, `Customized`

### Shapes

`Sector`, `Curve`, `Rectangle`, `Polygon`, `Dot`, `Cross`, `Symbols`, `Trapezoid`, `Funnel`

### Utility

`Surface`, `Layer`, `Global`

---

_Last Updated: 2025-12 — Recharts 3.x_
