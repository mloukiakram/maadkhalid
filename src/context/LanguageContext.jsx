import { createContext, useContext, useState, useEffect } from 'react';

// Translations
const translations = {
    ar: {
        // Navigation
        navTitle: 'مرصد المياه',
        langButton: 'English',
        themeLight: 'فاتح',
        themeDark: 'داكن',

        // Hero
        heroTitle: 'مرصد الموارد المائية بالمغرب',
        heroSubtitle: 'تتبع مباشر لحالة السدود والموارد المائية في المملكة المغربية',

        // Stats
        fillRate: 'نسبة الملء',
        waterAvailable: 'المياه المتوفرة',
        damsMonitored: 'السدود المراقبة',
        annualRainfall: 'التساقطات المطرية',
        vsLastMonth: 'مقارنة بالشهر الماضي',
        vsLastYear: 'مقارنة بالسنة الماضية',
        millionCubic: 'مليون م³',
        largeDams: 'سد كبير',
        mm: 'ملم',

        // Sections
        mapSectionTitle: 'خريطة السدود الرئيسية',
        mapSectionSubtitle: 'انقر على أي سد لمعرفة حالته الحالية',
        chartsSectionTitle: 'تطور حالة الملء',
        chartsSectionSubtitle: 'مقارنة نسب الملء عبر السنوات',
        damsSectionTitle: 'تفاصيل السدود',
        damsSectionSubtitle: 'استعرض جميع السدود المراقبة مع إحصائيات مفصلة',

        // Charts
        fillRateTrends: 'تطور نسبة الملء',
        majorDamsComparison: 'مقارنة السدود الكبرى',
        rainfallComparison: 'مقارنة التساقطات المطرية',

        // Filters
        searchPlaceholder: 'البحث عن سد...',
        allBasins: 'جميع الأحواض',
        sortByFillRate: 'ترتيب حسب نسبة الملء',
        sortByCapacity: 'ترتيب حسب السعة',
        sortByVolume: 'ترتيب حسب الحجم',
        sortByName: 'ترتيب أبجدي',
        damsOf: 'من',

        // Dam Card
        currentVolume: 'الحجم الحالي',
        capacity: 'السعة',
        yearBuilt: 'سنة البناء',

        // Legend
        highLevel: 'مستوى مرتفع (>60%)',
        mediumLevel: 'مستوى متوسط (30-60%)',
        lowLevel: 'مستوى منخفض (<30%)',

        // Footer
        dataSource: 'البيانات من وزارة التجهيز والماء',
        copyright: 'مرصد المياه المغربي',

        // Months
        months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو', 'يوليوز', 'غشت', 'شتنبر', 'أكتوبر', 'نونبر', 'دجنبر'],
    },
    en: {
        // Navigation
        navTitle: 'Water Observatory',
        langButton: 'العربية',
        themeLight: 'Light',
        themeDark: 'Dark',

        // Hero
        heroTitle: 'Morocco Water Resources Observatory',
        heroSubtitle: 'Real-time monitoring of dams and water resources across the Kingdom of Morocco',

        // Stats
        fillRate: 'Fill Rate',
        waterAvailable: 'Water Available',
        damsMonitored: 'Dams Monitored',
        annualRainfall: 'Annual Rainfall',
        vsLastMonth: 'vs last month',
        vsLastYear: 'vs last year',
        millionCubic: 'Million m³',
        largeDams: 'Large Dams',
        mm: 'mm',

        // Sections
        mapSectionTitle: 'Major Dams Map',
        mapSectionSubtitle: 'Click on any dam to see its current status',
        chartsSectionTitle: 'Fill Rate Trends',
        chartsSectionSubtitle: 'Compare fill rates across different years',
        damsSectionTitle: 'Dam Details',
        damsSectionSubtitle: 'Browse all monitored dams with detailed statistics',

        // Charts
        fillRateTrends: 'Fill Rate Trends',
        majorDamsComparison: 'Major Dams Comparison',
        rainfallComparison: 'Rainfall Comparison',

        // Filters
        searchPlaceholder: 'Search for a dam...',
        allBasins: 'All Basins',
        sortByFillRate: 'Sort by Fill Rate',
        sortByCapacity: 'Sort by Capacity',
        sortByVolume: 'Sort by Volume',
        sortByName: 'Sort by Name',
        damsOf: 'of',

        // Dam Card
        currentVolume: 'Current Volume',
        capacity: 'Capacity',
        yearBuilt: 'Year Built',

        // Legend
        highLevel: 'High Level (>60%)',
        mediumLevel: 'Medium Level (30-60%)',
        lowLevel: 'Low Level (<30%)',

        // Footer
        dataSource: 'Data from Ministry of Equipment and Water',
        copyright: 'Morocco Water Observatory',

        // Months
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('ar'); // Arabic default
    const [theme, setTheme] = useState('light'); // Light mode default

    useEffect(() => {
        // Set document direction
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }, [language]);

    useEffect(() => {
        // Set theme
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const t = (key) => {
        return translations[language][key] || key;
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <LanguageContext.Provider value={{
            language,
            theme,
            t,
            toggleLanguage,
            toggleTheme,
            isRTL: language === 'ar',
            isDark: theme === 'dark'
        }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
