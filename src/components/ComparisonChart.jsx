import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import { useLanguage } from '../context/LanguageContext';

export default function ComparisonChart({ dams }) {
    const { t, language, isDark } = useLanguage();

    // Get top 6 dams by capacity for comparison
    const topDams = [...dams]
        .sort((a, b) => b.capacity - a.capacity)
        .slice(0, 6)
        .map(dam => ({
            name: language === 'ar'
                ? (dam.nameAr?.length > 12 ? dam.nameAr.slice(0, 12) + '...' : dam.nameAr)
                : (dam.name.length > 12 ? dam.name.slice(0, 12) + '...' : dam.name),
            fullName: language === 'ar' ? dam.nameAr : dam.name,
            fillRate: dam.currentLevel?.fillRate || 0,
            volume: dam.currentLevel?.volume || 0,
            capacity: dam.capacity,
        }));

    const getBarColor = (fillRate) => {
        if (fillRate >= 60) return '#0284c7';
        if (fillRate >= 30) return '#059669';
        return '#dc2626';
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div style={{
                    background: isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    padding: '14px 18px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                }}>
                    <p style={{ color: isDark ? '#f1f5f9' : '#0f172a', fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>
                        {data.fullName}
                    </p>
                    <p style={{ color: '#0284c7', fontSize: '14px', fontWeight: 500 }}>
                        {t('fillRate')}: {data.fillRate.toFixed(1)}%
                    </p>
                    <p style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '13px', marginTop: '4px' }}>
                        {data.volume}M / {data.capacity}M m³
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="chart-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="chart-header">
                <h3 className="chart-title">{t('majorDamsComparison')}</h3>
            </div>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={topDams}
                        layout="vertical"
                        margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} horizontal={true} vertical={false} />
                        <XAxis
                            type="number"
                            tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }}
                            axisLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}
                            tickLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}
                            domain={[0, 100]}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <YAxis
                            dataKey="name"
                            type="category"
                            tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }}
                            axisLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}
                            tickLine={false}
                            width={90}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }} />
                        <Bar dataKey="fillRate" radius={[0, 6, 6, 0]} maxBarSize={24}>
                            {topDams.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(entry.fillRate)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
