import { useState, useMemo } from 'react';
import { Search, Building2 } from 'lucide-react';
import DamCard from './DamCard';
import { basins } from '../data/dams';
import { useLanguage } from '../context/LanguageContext';

export default function DamList({ dams, onDamClick }) {
    const { t, language } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBasin, setSelectedBasin] = useState('all');
    const [sortBy, setSortBy] = useState('fillRate');

    const filteredDams = useMemo(() => {
        let result = [...dams];

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(dam =>
                dam.name.toLowerCase().includes(query) ||
                dam.nameAr?.includes(searchQuery) ||
                dam.basin.toLowerCase().includes(query)
            );
        }

        // Filter by basin
        if (selectedBasin !== 'all') {
            result = result.filter(dam => dam.basin === selectedBasin);
        }

        // Sort
        result.sort((a, b) => {
            switch (sortBy) {
                case 'fillRate':
                    return (b.currentLevel?.fillRate || 0) - (a.currentLevel?.fillRate || 0);
                case 'capacity':
                    return b.capacity - a.capacity;
                case 'name':
                    const nameA = language === 'ar' ? (a.nameAr || a.name) : a.name;
                    const nameB = language === 'ar' ? (b.nameAr || b.name) : b.name;
                    return nameA.localeCompare(nameB);
                case 'volume':
                    return (b.currentLevel?.volume || 0) - (a.currentLevel?.volume || 0);
                default:
                    return 0;
            }
        });

        return result;
    }, [dams, searchQuery, selectedBasin, sortBy, language]);

    return (
        <section className="section">
            <div className="section-header">
                <h2 className="section-title">{t('damsSectionTitle')}</h2>
                <p className="section-subtitle">{t('damsSectionSubtitle')}</p>
            </div>

            <div className="filters-bar">
                <div className="search-wrapper">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder={t('searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <select
                    className="filter-select"
                    value={selectedBasin}
                    onChange={(e) => setSelectedBasin(e.target.value)}
                >
                    <option value="all">{t('allBasins')}</option>
                    {basins.map(basin => (
                        <option key={basin.id} value={basin.id}>
                            {language === 'ar' ? basin.nameAr : basin.name}
                        </option>
                    ))}
                </select>

                <select
                    className="filter-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="fillRate">{t('sortByFillRate')}</option>
                    <option value="capacity">{t('sortByCapacity')}</option>
                    <option value="volume">{t('sortByVolume')}</option>
                    <option value="name">{t('sortByName')}</option>
                </select>

                <span className="text-muted" style={{ fontSize: '0.9375rem', alignSelf: 'center' }}>
                    {filteredDams.length} {t('damsOf')} {dams.length}
                </span>
            </div>

            <div className="dam-grid">
                {filteredDams.map((dam, index) => (
                    <div key={dam.id} style={{ animationDelay: `${index * 0.05}s` }}>
                        <DamCard dam={dam} onClick={onDamClick} />
                    </div>
                ))}
            </div>

            {filteredDams.length === 0 && (
                <div className="text-center" style={{ padding: '4rem' }}>
                    <Building2 size={48} style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }} />
                    <p className="text-muted" style={{ fontSize: '1.125rem' }}>
                        {language === 'ar' ? 'لم يتم العثور على سدود مطابقة' : 'No dams found matching your criteria'}
                    </p>
                </div>
            )}
        </section>
    );
}
