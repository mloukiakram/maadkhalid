import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const regions = [
    { key: 'north', letter: 'N', color: 'bg-green-100 text-green-600' },
    { key: 'center', letter: 'C', color: 'bg-blue-100 text-blue-600' },
    { key: 'south', letter: 'S', color: 'bg-amber-100 text-amber-600' },
];

export default function RegionalCards() {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-2xl border border-slate-100"
        >
            <h3 className="font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100">
                {t('regional.title')}
            </h3>

            <div className="space-y-5">
                {regions.map((region, index) => (
                    <motion.div
                        key={region.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="flex gap-4"
                    >
                        <div className="flex-shrink-0 mt-1">
                            <div className={`w-10 h-10 rounded-full ${region.color} flex items-center justify-center text-sm font-bold`}>
                                {region.letter}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-800">
                                {t(`regional.${region.key}`)}
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed mt-1">
                                {t(`regional.${region.key}Desc`)}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
