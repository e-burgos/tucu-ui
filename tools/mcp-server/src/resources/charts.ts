// ─── Resource: Charts (Recharts) ────────────────────────────────────────────

export function getChartsContent(): string {
  return `# Charts — @e-burgos/tucu-ui (Recharts Wrappers)

## Important
In tucu-ui projects, Recharts is bundled as a dependency.
Do NOT install it separately — import chart components from \`@e-burgos/tucu-ui\`.

## Chart Types

### Cartesian Charts
| Chart | Use Case | Data Series |
|-------|----------|-------------|
| LineChart | Trends over time | <Line> |
| BarChart | Comparisons between categories | <Bar> |
| AreaChart | Volume/accumulation over time | <Area> |
| ComposedChart | Mix lines, bars, areas | <Line>, <Bar>, <Area> |
| ScatterChart | Correlation between variables | <Scatter> |

### Polar Charts
| Chart | Use Case | Data Series |
|-------|----------|-------------|
| PieChart | Part-to-whole proportions | <Pie> |
| RadarChart | Multi-dimensional comparison | <Radar> |
| RadialBarChart | Circular progress | <RadialBar> |

## Essential Pattern
\`\`\`tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from '@e-burgos/tucu-ui';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
];

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="value" stroke="#8884d8" />
  </LineChart>
</ResponsiveContainer>
\`\`\`

## Critical Rules
- ALWAYS wrap charts in \`ResponsiveContainer\`
- ResponsiveContainer MUST have explicit \`height\` (number or CSS)
- It cannot infer height from 100% parent without sized ancestor

## Key Components
| Component | Purpose |
|-----------|---------|
| ResponsiveContainer | Responsive sizing wrapper |
| XAxis | Horizontal axis |
| YAxis | Vertical axis |
| CartesianGrid | Grid lines |
| Tooltip | Hover tooltip |
| Legend | Chart legend |
| Line | Line series |
| Bar | Bar series |
| Area | Area series |
| Pie | Pie series |
| Radar | Radar series |
| ReferenceLine | Annotation line |
| Brush | Range selector |

## Axis Props
\`\`\`tsx
<XAxis
  dataKey="name"
  type="category"           // 'category' | 'number'
  tickFormatter={(v) => \`\${v}%\`}
  tick={{ fill: '#666', fontSize: 12 }}
  hide={false}
/>
<YAxis
  domain={[0, 'dataMax + 10']}
  tickFormatter={(v) => \`$\${v.toLocaleString()}\`}
  width={80}
  orientation="left"        // 'left' | 'right'
  yAxisId="left"            // For dual Y-axis
/>
\`\`\`

## Custom Tooltip
\`\`\`tsx
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-gray-900 p-3 shadow-lg">
      <p className="text-sm text-gray-400">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }}>
          {entry.name}: {entry.value?.toLocaleString()}
        </p>
      ))}
    </div>
  );
};
<Tooltip content={<CustomTooltip />} />
\`\`\`

## Performance Tips
- Limit data points to ~500 per series
- Use \`isAnimationActive={false}\` for large datasets
- Memoize data arrays with useMemo
- Use \`dot={false}\` on Line for >100 points
`;
}
