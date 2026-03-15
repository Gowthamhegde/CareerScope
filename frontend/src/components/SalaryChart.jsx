import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatCurrency } from '../utils/currency';

const SalaryChart = ({ 
  data, 
  chartType = 'bar', 
  xKey, 
  yKey, 
  title,
  height = 300,
  color = '#0ea5e9',
  secondaryColor = '#eab308'
}) => {
  const formatCurrencyValue = (value) => {
    return formatCurrency(value, 'INR');
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-IN').format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-800/95 backdrop-blur-sm border border-white/20 rounded-lg p-3 shadow-xl">
          <p className="text-white font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {
                entry.name.toLowerCase().includes('salary') || entry.name.toLowerCase().includes('ctc')
                  ? formatCurrencyValue(entry.value)
                  : formatNumber(entry.value)
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const chartProps = {
    data,
    margin: { top: 20, right: 30, left: 20, bottom: 5 },
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey={xKey} 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={formatCurrencyValue}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey={yKey} 
              stroke={color}
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
            />
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart {...chartProps}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey={xKey} 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={formatCurrencyValue}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey={yKey} 
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorGradient)"
            />
          </AreaChart>
        );

      case 'radar':
        return (
          <RadarChart {...chartProps}>
            <PolarGrid stroke="rgba(255,255,255,0.2)" />
            <PolarAngleAxis 
              dataKey={xKey} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              tickFormatter={formatCurrencyValue}
            />
            <Radar
              name={yKey}
              dataKey={yKey}
              stroke={color}
              fill={color}
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        );

      case 'horizontal-bar':
        return (
          <BarChart 
            {...chartProps}
            layout="horizontal"
            margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              type="number"
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={formatCurrencyValue}
            />
            <YAxis 
              type="category"
              dataKey={xKey} 
              stroke="#9CA3AF"
              fontSize={12}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey={yKey} 
              fill={color}
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        );

      case 'grouped-bar':
        return (
          <BarChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey={xKey} 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={formatCurrencyValue}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="remote" 
              fill={color}
              radius={[4, 4, 0, 0]}
              name="Remote"
            />
            <Bar 
              dataKey="onsite" 
              fill={secondaryColor}
              radius={[4, 4, 0, 0]}
              name="On-site"
            />
          </BarChart>
        );

      default: // bar chart
        return (
          <BarChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey={xKey} 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={formatCurrencyValue}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey={yKey} 
              fill={color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="glass-card p-6">
        {title && (
          <h3 className="text-lg font-heading font-semibold text-white mb-4">
            {title}
          </h3>
        )}
        <div className="flex items-center justify-center h-64 text-gray-400">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p>No data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      {title && (
        <h3 className="text-lg font-heading font-semibold text-white mb-4">
          {title}
        </h3>
      )}
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalaryChart;