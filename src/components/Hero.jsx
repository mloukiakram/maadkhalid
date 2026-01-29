import { useLanguage } from '../context/LanguageContext';

export default function Hero({ stats }) {
    const { t, language } = useLanguage();

    const formatVolume = (value) => {
        if (value >= 1000) {
            return (value / 1000).toFixed(1);
        }
        return value;
    };

    return (
        <section className="hero">
            <div className="hero-background">
                <img
                    src="/images/hero_water_morocco_1766426687187.png"
                    alt="Moroccan Dam Reservoir"
                />
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-content">
                <h1 className="hero-title animate-fade-in-up">
                    {t('heroTitle')}
                </h1>
                <p className="hero-subtitle animate-fade-in-up stagger-1">
                    {t('heroSubtitle')}
                </p>

                <div className="hero-stats animate-fade-in-up stagger-2">
                    <div className="hero-stat">
                        <div className="hero-stat-value">{stats?.fillRate || 33.6}%</div>
                        <div className="hero-stat-label">{t('fillRate')}</div>
                    </div>

                    <div className="hero-stat">
                        <div className="hero-stat-value">{formatVolume(stats?.totalVolume || 5637)}</div>
                        <div className="hero-stat-label">{t('millionCubic')}</div>
                    </div>

                    <div className="hero-stat">
                        <div className="hero-stat-value">{stats?.damCount || 19}</div>
                        <div className="hero-stat-label">{t('largeDams')}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
