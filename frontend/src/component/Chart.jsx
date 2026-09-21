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

const CustomDarkTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border border-slate-700/80 backdrop-blur-md rounded-xl p-2.5 shadow-xl text-xs">
        <p className="font-semibold text-slate-300 border-b border-slate-800 pb-1 mb-1.5">
          {label}
        </p>
        {payload.map((entry, index) => (
          <div key={`tooltip-item-${index}`} className="flex items-center justify-between gap-3 py-0.5">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}:
            </span>
            <span className="font-mono font-semibold text-white">
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const Chart = ({
  type = 'area',
  data = [],
  series = [
    { key: 'vehicles', name: 'Vehicles Flow', color: '#00d2ff' },
    { key: 'violations', name: 'Violations', color: '#ef4444' }
  ],
  xAxisKey = 'time',
  height = 260,
  showGrid = true,
  showLegend = true,
  className = ''
}) => {
  return (
    <div className={`w-full overflow-hidden ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {type === 'bar' ? (
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />}
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <Tooltip content={<CustomDarkTooltip />} />
            {showLegend && <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />}
            {series.map((s, idx) => (
              <Bar
                key={s.key || idx}
                dataKey={s.key}
                name={s.name || s.key}
                fill={s.color || '#00d2ff'}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        ) : type === 'line' ? (
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />}
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <Tooltip content={<CustomDarkTooltip />} />
            {showLegend && <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />}
            {series.map((s, idx) => (
              <Line
                key={s.key || idx}
                type="monotone"
                dataKey={s.key}
                name={s.name || s.key}
                stroke={s.color || '#00d2ff'}
                strokeWidth={s.strokeWidth || 2}
                dot={{ r: 3, fill: s.color || '#00d2ff' }}
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
                  <stop offset="5%" stopColor={s.color || '#00d2ff'} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={s.color || '#00d2ff'} stopOpacity={0.0} />
                </linearGradient>
              ))}
            </defs>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />}
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <Tooltip content={<CustomDarkTooltip />} />
            {showLegend && <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />}
            {series.map((s, idx) => (
              <Area
                key={s.key || idx}
                type="monotone"
                dataKey={s.key}
                name={s.name || s.key}
                stroke={s.color || '#00d2ff'}
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
