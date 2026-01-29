import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HardHat } from 'lucide-react';

const projects = [
    { key: 'sebouBouregreg', progress: 100, statusKey: 'operational', statusColor: 'text-green-400', descKey: 'transferred' },
    { key: 'casaDesal', progress: 65, statusKey: 'phase1', statusColor: 'text-primary-300', descKey: 'casaDesc' },
    { key: 'agadirDesal', progress: 40, statusKey: 'target', statusColor: 'text-primary-300', descKey: null },
];

export default function InfrastructurePanel() {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-slate-900 text-white p-6 rounded-2xl relative overflow-hidden"
        >
            {/* Background decoration - no gradient, just a solid blur */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-slate-700 rounded-full opacity-50 blur-3xl" />

            <h3 className="font-bold mb-6 relative z-10 flex items-center gap-2">
                <HardHat className="w-5 h-5" />
                {t('infrastructure.title')}
            </h3>

            <div className="space-y-6 relative z-10">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.15 + 0.3 }}
                    >
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-slate-300">{t(`infrastructure.${project.key}`)}</span>
                            <span className={`font-bold ${project.statusColor}`}>
                                {t(`infrastructure.${project.statusKey}`)}
                            </span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={isInView ? { width: `${project.progress}%` } : { width: 0 }}
                                transition={{ duration: 1, delay: index * 0.15 + 0.5, ease: 'easeOut' }}
                                className={`h-full rounded-full ${project.progress === 100 ? 'bg-green-400' : 'bg-primary-400'}`}
                            />
                        </div>
                        {project.descKey && (
                            <p className="text-[10px] text-slate-400 mt-1">
                                {t(`infrastructure.${project.descKey}`)}
                            </p>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
