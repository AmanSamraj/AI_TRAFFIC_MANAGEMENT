import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg p-2.5 text-xs"
        style={{
          background: 'var(--color-card)',
          border: '1px solid var(--color-border-dark)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        }}
      >
        <p
          className="font-semibold pb-1 mb-1.5"
          style={{ color: 'var(--color-text)', borderBottom: '1px solid var(--color-border)' }}
        >
          {label}
        </p>
        {payload.map((entry, index) => (
          <div key={`tooltip-item-${index}`} className="flex items-center justify-between gap-4 py-0.5">
            <span className="flex items-center gap-1.5" style={{ color: 'var(--color-text-secondary)' }}>
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}:
            </span>
            <span className="font-mono font-semibold" style={{ color: 'var(--color-text)' }}>
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

/* ── Default series uses amber + charcoal ── */
export const Chart = ({
  type = 'area',
  data = [],
  series = [
    { key: 'vehicles', name: 'Vehicles Flow', color: '#F5A623' },
    { key: 'violations', name: 'Violations', color: '#DC3545' }
  ],
  xAxisKey = 'time',
  height = 260,
  showGrid = true,
  showLegend = true,
  className = ''
}) => {
  const gridColor  = 'rgba(0,0,0,0.06)';
  const axisColor  = 'rgba(0,0,0,0.12)';
  const tickColor  = '#918B80';

  return (
    <div className={`w-full overflow-hidden ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {type === 'bar' ? (
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />}
            <XAxis dataKey={xAxisKey} tickLine={false} axisLine={{ stroke: axisColor }} tick={{ fill: tickColor, fontSize: 11 }} />
            <YAxis tickLine={false} axisLine={{ stroke: axisColor }} tick={{ fill: tickColor, fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: tickColor }} />}
            {series.map((s, idx) => (
              <Bar
                key={s.key || idx}
                dataKey={s.key}
                name={s.name || s.key}
                fill={s.color || '#F5A623'}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        ) : type === 'line' ? (
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />}
            <XAxis dataKey={xAxisKey} tickLine={false} axisLine={{ stroke: axisColor }} tick={{ fill: tickColor, fontSize: 11 }} />
            <YAxis tickLine={false} axisLine={{ stroke: axisColor }} tick={{ fill: tickColor, fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: tickColor }} />}
            {series.map((s, idx) => (
              <Line
                key={s.key || idx}
                type="monotone"
                dataKey={s.key}
                name={s.name || s.key}
                stroke={s.color || '#F5A623'}
                strokeWidth={s.strokeWidth || 2}
                dot={{ r: 3, fill: s.color || '#F5A623' }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        ) : (
          /* Area Chart Default */
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {series.map((s, idx) => (
                <linearGradient key={`gradient-${s.key || idx}`} id={`color-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={s.color || '#F5A623'} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={s.color || '#F5A623'} stopOpacity={0.0} />
                </linearGradient>
              ))}
            </defs>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />}
            <XAxis dataKey={xAxisKey} tickLine={false} axisLine={{ stroke: axisColor }} tick={{ fill: tickColor, fontSize: 11 }} />
            <YAxis tickLine={false} axisLine={{ stroke: axisColor }} tick={{ fill: tickColor, fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: tickColor }} />}
            {series.map((s, idx) => (
              <Area
                key={s.key || idx}
                type="monotone"
                dataKey={s.key}
                name={s.name || s.key}
                stroke={s.color || '#F5A623'}
                strokeWidth={s.strokeWidth || 2}
                fillOpacity={1}
                fill={`url(#color-${s.key})`}
              />
            ))}
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
