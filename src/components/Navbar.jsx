import { Globe, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
    const { t, toggleLanguage, toggleTheme, isDark, language } = useLanguage();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <span className="navbar-logo">🇲🇦</span>
                    <span className="navbar-title">{t('navTitle')}</span>
                </div>

                <div className="navbar-controls">
                    <button className="lang-toggle" onClick={toggleLanguage}>
                        <Globe size={16} />
                        {t('langButton')}
                    </button>

                    <button className="theme-toggle" onClick={toggleTheme}>
                        {isDark ? <Sun size={16} /> : <Moon size={16} />}
                        {isDark ? t('themeLight') : t('themeDark')}
                    </button>
                </div>
            </div>
        </nav>
    );
}
