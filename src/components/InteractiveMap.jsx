import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function InteractiveMap({ dams }) {
    const { t, language } = useLanguage();
    const [hoveredDam, setHoveredDam] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    // Morocco map bounding coordinates (approximate)
    const mapBounds = {
        minLat: 27.5,
        maxLat: 36.0,
        minLng: -13.5,
        maxLng: -1.0,
    };

    const getMarkerPosition = (dam) => {
        const { lat, lng } = dam.location;
        const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
        const y = ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
        return { left: `${x}%`, top: `${y}%` };
    };

    const getLevelClass = (fillRate) => {
        if (fillRate >= 60) return 'high';
        if (fillRate >= 30) return 'medium';
        return 'low';
    };

    const handleMouseEnter = (dam, event) => {
        setHoveredDam(dam);
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltipPos({
            x: rect.left + rect.width / 2,
            y: rect.top - 10
        });
    };

    return (
        <section className="section map-section">
            <div className="section-header">
                <h2 className="section-title">{t('mapSectionTitle')}</h2>
                <p className="section-subtitle">{t('mapSectionSubtitle')}</p>
            </div>

            <div className="map-container">
                {/* SVG Morocco Map */}
                <svg
                    viewBox="0 0 600 500"
                    className="morocco-map"
                    style={{ background: 'linear-gradient(180deg, #e0f2fe 0%, #bae6fd 100%)' }}
                >
                    {/* Simplified Morocco outline */}
                    <path
                        d="M 120 60 
               L 280 40 L 380 50 L 480 80 L 520 120 L 540 180 
               L 530 250 L 500 320 L 450 380 L 380 420 
               L 300 450 L 220 460 L 150 440 L 100 400 
               L 80 340 L 70 280 L 60 220 L 80 160 L 100 100 
               Z"
                        fill="#f8fafc"
                        stroke="#0284c7"
                        strokeWidth="2"
                    />

                    {/* Region dividers */}
                    <path d="M 200 100 L 250 300" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="5,5" />
                    <path d="M 350 80 L 400 350" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="5,5" />
                    <path d="M 100 200 L 500 220" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="5,5" />

                    {/* City labels */}
                    <text x="280" y="90" fill="#64748b" fontSize="12" textAnchor="middle">طنجة</text>
                    <text x="200" y="180" fill="#64748b" fontSize="12" textAnchor="middle">الرباط</text>
                    <text x="180" y="220" fill="#64748b" fontSize="12" textAnchor="middle">الدار البيضاء</text>
                    <text x="300" y="140" fill="#64748b" fontSize="12" textAnchor="middle">فاس</text>
                    <text x="250" y="290" fill="#64748b" fontSize="12" textAnchor="middle">مراكش</text>
                    <text x="400" y="250" fill="#64748b" fontSize="12" textAnchor="middle">الراشيدية</text>
                    <text x="320" y="400" fill="#64748b" fontSize="12" textAnchor="middle">ورزازات</text>
                </svg>

                {/* Dam Markers */}
                {dams.map((dam) => {
                    const position = getMarkerPosition(dam);
                    const level = getLevelClass(dam.currentLevel?.fillRate || 0);

                    return (
                        <div
                            key={dam.id}
                            className="map-marker"
                            style={position}
                            onMouseEnter={(e) => handleMouseEnter(dam, e)}
                            onMouseLeave={() => setHoveredDam(null)}
                        >
                            <div className={`marker-dot ${level}`} />
                        </div>
                    );
                })}

                {/* Tooltip */}
                {hoveredDam && (
                    <div
                        className="map-tooltip"
                        style={{
                            left: '50%',
                            top: '10%',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        <div className="map-tooltip-title">
                            {language === 'ar' ? hoveredDam.nameAr : hoveredDam.name}
                        </div>
                        <div className="map-tooltip-value">
                            {hoveredDam.currentLevel?.fillRate?.toFixed(1) || 0}%
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                            {hoveredDam.currentLevel?.volume || 0}M / {hoveredDam.capacity}M m³
                        </div>
                    </div>
                )}
            </div>

            {/* Legend */}
            <div className="map-legend">
                <div className="legend-item">
                    <div className="legend-dot high"></div>
                    <span>{t('highLevel')}</span>
                </div>
                <div className="legend-item">
                    <div className="legend-dot medium"></div>
                    <span>{t('mediumLevel')}</span>
                </div>
                <div className="legend-item">
                    <div className="legend-dot low"></div>
                    <span>{t('lowLevel')}</span>
                </div>
            </div>
        </section>
    );
}
