import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Droplets, Box, CloudRain, Snowflake, TrendingUp } from 'lucide-react';
import AnimatedCounter from '../ui/AnimatedCounter';

const stats = [
  {
    key: 'fillRate',
    value: 55.2,
    suffix: '%',
    change: '+100%',
    changePositive: true,
    subtext: 'vsLastYear',
    subtextValue: '27.6%',
    icon: Droplets,
    color: 'primary',
  },
  {
    key: 'totalReserve',
    value: 9.20,
    suffix: ' Bm³',
    subtext: 'capacity',
    subtextValue: '16.7',
    badge: '+3.3 Bm³ since Sept',
    icon: Box,
    color: 'blue',
  },
  {
    key: 'rainfall',
    value: 108,
    suffix: ' mm',
    subtext: 'nationalAverage',
    badge: '+95% vs last year',
    icon: CloudRain,
    color: 'indigo',
  },
  {
    key: 'snowCover',
    value: 55,
    suffix: 'k km²',
    subtext: 'peakRecorded',
    subtextSmall: 'feedingBasins',
    icon: Snowflake,
    color: 'cyan',
  },
];

const colorClasses = {
  primary: {
    bg: 'bg-primary-50',
    text: 'text-primary-600',
    progress: 'bg-primary-500',
  },
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    progress: 'bg-blue-500',
  },
  indigo: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    progress: 'bg-indigo-500',
  },
  cyan: {
    bg: 'bg-cyan-50',
    text: 'text-cyan-600',
    progress: 'bg-cyan-500',
  },
};

export default function StatCards() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        const colors = colorClasses[stat.color];

        return (
          <motion.div
            key={stat.key}
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="stat-card group"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {t(`stats.${stat.key}`)}
                </p>
                <h3 className="text-3xl lg:text-4xl font-bold text-slate-800">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </h3>
              </div>
              {stat.change && (
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                  stat.changePositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              )}
              {!stat.change && (
                <div className={`p-3 rounded-xl ${colors.bg}`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
              )}
            </div>

            {stat.subtext && (
              <p className="text-xs text-slate-500">
                {t(`stats.${stat.subtext}`, { value: stat.subtextValue })}
              </p>
            )}

            {stat.key === 'fillRate' && (
              <div className="mt-4">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '55.2%' } : { width: 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                    className={`h-full rounded-full ${colors.progress}`}
                  />
                </div>
              </div>
            )}

            {stat.badge && (
              <div className="mt-4">
                <span className={`inline-block text-[10px] font-medium px-2 py-1 rounded ${colors.bg} ${colors.text}`}>
                  {stat.badge}
                </span>
              </div>
            )}

            {stat.subtextSmall && (
              <p className="text-[10px] mt-4 text-slate-400">
                {t(`stats.${stat.subtextSmall}`)}
              </p>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
