import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Line, ComposedChart,
} from 'recharts';
import { BarChart3 } from 'lucide-react';

const historyData = [
    { year: 'Jan 2022', value: 34.2, status: 'crisis' },
    { year: 'Jan 2023', value: 31.6, status: 'crisis' },
    { year: 'Jan 2024', value: 23.2, status: 'critical' },
    { year: 'Jan 2025', value: 27.6, status: 'crisis' },
    { year: 'Jan 2026', value: 55.2, status: 'recovery' },
];

const getBarColor = (value) => {
    if (value < 30) return '#ef4444'; // red
    if (value < 50) return '#f59e0b'; // amber
    return '#10b981'; // green
};

export default function HistoryChart() {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="chart-card"
        >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary-500" />
                    {t('charts.historyTitle')}
                </h3>
                <div className="flex gap-4">
                    <span className="flex items-center text-xs text-slate-500">
                        <div className="w-3 h-3 bg-red-400 rounded-full mr-2" />
                        {t('charts.crisis')}
                    </span>
                    <span className="flex items-center text-xs text-slate-500">
                        <div className="w-3 h-3 bg-primary-500 rounded-full mr-2" />
                        {t('charts.recovery')}
                    </span>
                </div>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={historyData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis
                            dataKey="year"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                        />
                        <YAxis
                            domain={[0, 70]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '12px 16px',
                            }}
                            labelStyle={{ color: 'white', fontWeight: 'bold', marginBottom: '4px' }}
                            itemStyle={{ color: 'rgba(255,255,255,0.85)' }}
                            formatter={(value) => [`${value}%`, 'Fill Rate']}
                        />
                        <Bar
                            dataKey="value"
                            radius={[6, 6, 0, 0]}
                            barSize={40}
                        >
                            {historyData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
                            ))}
                        </Bar>
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#0ea5e9"
                            strokeWidth={3}
                            dot={{ fill: 'white', stroke: '#0ea5e9', strokeWidth: 2, r: 5 }}
                            activeDot={{ r: 7 }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-xl text-sm text-slate-600 leading-relaxed">
                <strong>{t('charts.analysis').split('.')[0]}.</strong> {t('charts.analysis').split('.').slice(1).join('.')}
            </div>
        </motion.div>
    );
}
