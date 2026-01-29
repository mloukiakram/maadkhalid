import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { ChevronDown } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const heroSlides = [
    { image: '/images/hero1.png', key: 'slide1' },
    { image: '/images/hero2.png', key: 'slide2' },
    { image: '/images/hero3.png', key: 'slide3' },
];

export default function HeroSection() {
    const { t } = useTranslation();
    const scrollRef = useRef(null);

    const scrollToContent = () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <section className="hero-section">
            {/* Background Slider */}
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                className="absolute inset-0 w-full h-full"
            >
                {heroSlides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="hero-slide">
                            <img
                                src={slide.image}
                                alt={t(`hero.${slide.key}`)}
                                className="hero-image"
                            />
                            <div className="hero-overlay" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Blur Bottom Effect */}
            <div className="hero-blur-bottom" />

            {/* Hero Content */}
            <motion.div
                className="hero-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="mb-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium border border-white/20">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Live Data • Jan 2026
                    </span>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight"
                >
                    {t('hero.title')}
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-white/85 mb-10 max-w-2xl"
                >
                    {t('hero.subtitle')}
                </motion.p>

                {/* Hero Stats */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-6 mb-10"
                >
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20 min-w-[160px]">
                        <div className="text-3xl md:text-4xl font-bold text-white">55.2%</div>
                        <div className="text-sm text-white/75 mt-1">{t('stats.fillRate')}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20 min-w-[160px]">
                        <div className="text-3xl md:text-4xl font-bold text-white">9.2<span className="text-lg">Bm³</span></div>
                        <div className="text-sm text-white/75 mt-1">{t('stats.totalReserve')}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20 min-w-[160px]">
                        <div className="text-3xl md:text-4xl font-bold text-white text-green-400">+100%</div>
                        <div className="text-sm text-white/75 mt-1">vs 2025</div>
                    </div>
                </motion.div>

                {/* CTA Button */}
                <motion.button
                    variants={itemVariants}
                    onClick={scrollToContent}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-full font-semibold text-lg hover:bg-slate-100 transition-colors"
                >
                    {t('hero.cta')}
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <ChevronDown className="w-5 h-5" />
                    </motion.div>
                </motion.button>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
                >
                    <motion.div
                        animate={{ opacity: [1, 0.3, 1], y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        className="w-1 h-3 bg-white rounded-full"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
