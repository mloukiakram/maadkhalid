import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { monthNames, rainfallData } from '../data/historical';

export default function RainfallChart({ selectedYears = [2025, 2024] }) {
    // Prepare chart data
    const chartData = monthNames.map((month, index) => {
        const dataPoint = { month };
        selectedYears.forEach(year => {
            const yearData = rainfallData[year];
            if (yearData && yearData.months) {
                dataPoint[year] = yearData.months[index];
            }
        });
        return dataPoint;
    });

    const COLORS = {
        2025: '#06b6d4',
        2024: '#3b82f6',
        2023: '#8b5cf6',
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: 'rgba(17, 24, 39, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                }}>
                    <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '8px' }}>{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color, fontSize: '14px', fontWeight: 500 }}>
                            {entry.name}: {entry.value} mm
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="card chart-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="card-header">
                <span className="card-title">🌧️ Rainfall Comparison</span>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Annual: {rainfallData[2025]?.annual || 0} mm
                </div>
            </div>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <defs>
                            {selectedYears.map(year => (
                                <linearGradient key={year} id={`color${year}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={COLORS[year]} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={COLORS[year]} stopOpacity={0} />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="month"
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        />
                        <YAxis
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            tickFormatter={(value) => `${value}mm`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        {selectedYears.map(year => (
                            <Area
                                key={year}
                                type="monotone"
                                dataKey={year}
                                name={year.toString()}
                                stroke={COLORS[year]}
                                strokeWidth={2}
                                fill={`url(#color${year})`}
                            />
                        ))}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
