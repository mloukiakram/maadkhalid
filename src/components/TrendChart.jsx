import { useState, useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useLanguage } from '../context/LanguageContext';

const COLORS = {
    2025: '#0284c7',
    2024: '#06b6d4',
    2023: '#0ea5e9',
    2022: '#38bdf8',
    2021: '#7dd3fc',
    2020: '#bae6fd',
};

export default function TrendChart({ historicalData, currentMonth = 12 }) {
    const { t, isDark } = useLanguage();
    const [selectedYears, setSelectedYears] = useState([2025, 2024, 2023]);
    const availableYears = Object.keys(historicalData).map(Number).sort((a, b) => b - a);

    const months = t('months');

    const toggleYear = (year) => {
        setSelectedYears(prev => {
            if (prev.includes(year)) {
                return prev.filter(y => y !== year);
            }
            return [...prev, year].sort((a, b) => b - a);
        });
    };

    const chartData = useMemo(() => {
        return months.map((month, index) => {
            const dataPoint = { month };
            selectedYears.forEach(year => {
                const yearData = historicalData[year];
                if (yearData && yearData[index]) {
                    if (year === 2025 && index >= currentMonth) {
                        dataPoint[year] = null;
                    } else {
                        dataPoint[year] = yearData[index].fillRate;
                    }
                }
            });
            return dataPoint;
        });
    }, [months, selectedYears, historicalData, currentMonth]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    padding: '14px 18px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                }}>
                    <p style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '13px', marginBottom: '10px', fontWeight: 500 }}>{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color, fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>
                            {entry.name}: {entry.value?.toFixed(1)}%
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="chart-card animate-fade-in-up">
            <div className="chart-header">
                <h3 className="chart-title">{t('fillRateTrends')}</h3>
                <div className="year-pills">
                    {availableYears.map(year => (
                        <button
                            key={year}
                            className={`year-pill ${selectedYears.includes(year) ? 'active' : ''}`}
                            onClick={() => toggleYear(year)}
                            style={selectedYears.includes(year) ? { backgroundColor: COLORS[year], borderColor: COLORS[year] } : {}}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                        <XAxis
                            dataKey="month"
                            tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
                            axisLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}
                            tickLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}
                        />
                        <YAxis
                            tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
                            axisLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}
                            tickLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}
                            domain={[0, 60]}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            wrapperStyle={{ paddingTop: '15px' }}
                            formatter={(value) => <span style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '13px' }}>{value}</span>}
                        />
                        {selectedYears.map(year => (
                            <Line
                                key={year}
                                type="monotone"
                                dataKey={year}
                                name={year.toString()}
                                stroke={COLORS[year]}
                                strokeWidth={year === 2025 ? 3 : 2}
                                dot={false}
                                activeDot={{ r: 7, fill: COLORS[year], stroke: '#fff', strokeWidth: 2 }}
                                connectNulls={false}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
