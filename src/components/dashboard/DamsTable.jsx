import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Minus } from 'lucide-react';

const damsData = [
    { name: 'Al Wahda', basin: 'Sebou', capacity: 3522, fill: 74.1, change: '+17%', status: 'good' },
    { name: 'Al Massira', basin: 'Oum Er Rbia', capacity: 2657, fill: 13.2, change: '+11%', status: 'recovering' },
    { name: 'Bin El Ouidane', basin: 'Oum Er Rbia', capacity: 1215, fill: 36.5, change: '+20%', status: 'lowMid' },
    { name: 'Idriss I', basin: 'Sebou', capacity: 1129, fill: 82.4, change: '+40%', status: 'high' },
    { name: 'Sidi Moh. Ben Abdellah', basin: 'Bouregreg', capacity: 974, fill: 98.1, change: '+65%', status: 'full' },
    { name: 'Oued El Makhazine', basin: 'Loukkos', capacity: 672, fill: 100, change: 'stable', status: 'full' },
    { name: 'Mansour Eddahbi', basin: 'Draa', capacity: 445, fill: 31.1, change: '+15%', status: 'lowMid' },
    { name: 'Hassan II', basin: 'Moulouya', capacity: 392, fill: 55.8, change: '+30%', status: 'average' },
];

const statusStyles = {
    good: 'bg-primary-100 text-primary-800',
    high: 'bg-green-100 text-green-800',
    full: 'bg-green-100 text-green-800',
    average: 'bg-primary-100 text-primary-800',
    lowMid: 'bg-yellow-100 text-yellow-800',
    recovering: 'bg-red-100 text-red-800',
};

const getFillColor = (value) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 50) return 'text-primary-600';
    if (value >= 30) return 'text-warning-600';
    return 'text-red-600';
};

export default function DamsTable() {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
        },
    };

    const rowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
        >
            <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-slate-50/50">
                <h3 className="font-bold text-slate-800">{t('dams.title')}</h3>
                <span className="text-xs text-slate-500 italic">{t('dams.sortedBy')}</span>
            </div>

            <div className="overflow-x-auto">
                <table className="dam-table">
                    <thead>
                        <tr>
                            <th>{t('dams.name')}</th>
                            <th>{t('dams.basin')}</th>
                            <th>{t('dams.capacity')}</th>
                            <th>{t('dams.fillRate')}</th>
                            <th>{t('dams.vsLastYear')}</th>
                            <th>{t('dams.status')}</th>
                        </tr>
                    </thead>
                    <motion.tbody
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                    >
                        {damsData.map((dam, index) => (
                            <motion.tr
                                key={dam.name}
                                variants={rowVariants}
                                className="group"
                            >
                                <td className="font-medium text-slate-900">{dam.name}</td>
                                <td className="text-slate-500">{dam.basin}</td>
                                <td className="text-slate-500">{dam.capacity.toLocaleString()}</td>
                                <td className={`font-bold ${getFillColor(dam.fill)}`}>{dam.fill}%</td>
                                <td>
                                    {dam.change === 'stable' ? (
                                        <span className="flex items-center gap-1 text-slate-400">
                                            <Minus className="w-4 h-4" />
                                            {t('status.stable')}
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-green-600">
                                            <TrendingUp className="w-4 h-4" />
                                            {dam.change}
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[dam.status]}`}>
                                        {t(`status.${dam.status}`)}
                                    </span>
                                </td>
                            </motion.tr>
                        ))}
                    </motion.tbody>
                </table>
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-xs text-slate-500 flex flex-col sm:flex-row justify-between gap-2">
                <span>{t('dams.showing')}</span>
                <span>{t('dams.dataSource')}</span>
            </div>
        </motion.div>
    );
}
