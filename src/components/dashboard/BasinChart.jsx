import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { Map } from 'lucide-react';

const basinData = [
    { name: 'Bouregreg', value: 96.2, color: '#10b981' },
    { name: 'Tensift', value: 79.9, color: '#10b981' },
    { name: 'Loukkos', value: 71.3, color: '#10b981' },
    { name: 'Sebou', value: 68.7, color: '#0ea5e9' },
    { name: 'Guir-Ziz', value: 57.8, color: '#0ea5e9' },
    { name: 'Souss-Massa', value: 53.5, color: '#f59e0b' },
    { name: 'Moulouya', value: 44.2, color: '#f59e0b' },
    { name: 'Draa', value: 31.1, color: '#ef4444' },
    { name: 'Oum Er-Rbia', value: 30.5, color: '#ef4444' },
];

export default function BasinChart() {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="chart-card"
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Map className="w-5 h-5 text-primary-500" />
                    {t('charts.basinTitle')}
                </h3>
            </div>

            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={basinData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                        <XAxis
                            type="number"
                            domain={[0, 100]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <YAxis
                            type="category"
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            width={100}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '12px 16px',
                            }}
                            labelStyle={{ color: 'white', fontWeight: 'bold', marginBottom: '4px' }}
                            formatter={(value) => [`${value}%`, 'Fill Rate']}
                        />
                        <Bar
                            dataKey="value"
                            radius={[0, 4, 4, 0]}
                            barSize={20}
                        >
                            {basinData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
