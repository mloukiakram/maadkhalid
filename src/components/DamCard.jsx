import { useLanguage } from '../context/LanguageContext';
import { getBasinById } from '../data/dams';

// Dam images mapping
const damImages = {
    'al-wahda': '/images/dam_al_wahda_1766426703649.png',
    'bine-el-ouidane': '/images/dam_bin_el_ouidane_1766426719883.png',
};

// Default image for dams without specific images
const defaultDamImage = '/images/hero_water_morocco_1766426687187.png';

export default function DamCard({ dam, onClick }) {
    const { t, language } = useLanguage();
    const basin = getBasinById(dam.basin);
    const fillRate = dam.currentLevel?.fillRate || 0;
    const volume = dam.currentLevel?.volume || 0;

    const getWaterLevelClass = (rate) => {
        if (rate >= 60) return 'water-level-high';
        if (rate >= 30) return 'water-level-medium';
        return 'water-level-low';
    };

    const formatVolume = (val) => {
        if (val >= 1000) return `${(val / 1000).toFixed(2)}B`;
        return `${val}M`;
    };

    const damImage = damImages[dam.id] || defaultDamImage;
    const damName = language === 'ar' ? (dam.nameAr || dam.name) : dam.name;
    const basinName = language === 'ar' ? (basin?.nameAr || basin?.name) : basin?.name;

    return (
        <div className="dam-card animate-fade-in-up" onClick={() => onClick?.(dam)}>
            <img
                src={damImage}
                alt={damName}
                className="dam-card-image"
                loading="lazy"
            />

            <div className="dam-card-content">
                <div className="dam-card-header">
                    <div>
                        <h3 className="dam-name">{damName}</h3>
                        <p className="dam-basin">{basinName || dam.basin}</p>
                    </div>
                    <div className="dam-percentage">{fillRate.toFixed(1)}%</div>
                </div>

                <div className="water-level-container">
                    <div
                        className={`water-level-bar ${getWaterLevelClass(fillRate)}`}
                        style={{ width: `${Math.min(fillRate, 100)}%` }}
                    />
                </div>

                <div className="dam-stats">
                    <div className="dam-stat">
                        <div className="dam-stat-value">{formatVolume(volume)} m³</div>
                        <div className="dam-stat-label">{t('currentVolume')}</div>
                    </div>
                    <div className="dam-stat">
                        <div className="dam-stat-value">{formatVolume(dam.capacity)} m³</div>
                        <div className="dam-stat-label">{t('capacity')}</div>
                    </div>
                    <div className="dam-stat">
                        <div className="dam-stat-value">{dam.yearBuilt}</div>
                        <div className="dam-stat-label">{t('yearBuilt')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
