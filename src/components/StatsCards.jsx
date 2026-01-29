import { Droplets, Gauge, Building2, CloudRain, TrendingUp, TrendingDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function StatsCards({ stats }) {
    const { t } = useLanguage();

    const formatVolume = (value) => {
        if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}B`;
        }
        return `${value}M`;
    };

    const cards = [
        {
            title: t('fillRate'),
            value: `${stats?.fillRate || 33.6}%`,
            change: stats?.fillRateChange || 3.4,
            changeLabel: t('vsLastMonth'),
            icon: Gauge,
            color: '#0284c7',
        },
        {
            title: t('waterAvailable'),
            value: `${formatVolume(stats?.totalVolume || 5637)}`,
            subtitle: t('millionCubic'),
            icon: Droplets,
            color: '#06b6d4',
        },
        {
            title: t('damsMonitored'),
            value: stats?.damCount || 19,
            subtitle: t('largeDams'),
            icon: Building2,
            color: '#0369a1',
        },
        {
            title: t('annualRainfall'),
            value: `${stats?.annualRainfall || 312}`,
            subtitle: t('mm'),
            change: stats?.rainfallChange || 12.2,
            changeLabel: t('vsLastYear'),
            icon: CloudRain,
            color: '#0ea5e9',
        },
    ];

    return (
        <div className="stats-grid">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="stat-card animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <div className="stat-icon" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                        <card.icon size={26} />
                    </div>
                    <div className="stat-label">{card.title}</div>
                    <div className="stat-value">
                        {card.value}
                        {card.subtitle && <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--color-text-muted)', marginInlineStart: '6px' }}>{card.subtitle}</span>}
                    </div>
                    {card.change !== undefined && (
                        <div className={`stat-change ${card.change >= 0 ? 'positive' : 'negative'}`}>
                            {card.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            {card.change >= 0 ? '+' : ''}{card.change.toFixed(1)}% {card.changeLabel}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
