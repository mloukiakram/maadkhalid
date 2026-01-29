import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X, Download, Globe, ChevronDown } from 'lucide-react';

const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' },
];

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const changeLanguage = (langCode) => {
        i18n.changeLanguage(langCode);
        document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = langCode;
        setLangDropdownOpen(false);
    };

    const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-lg shadow-md border-b border-slate-100'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center gap-3"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className={`p-2 rounded-xl transition-colors ${isScrolled ? 'bg-primary-600 text-white' : 'bg-white/20 text-white backdrop-blur-sm'
                            }`}>
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5" />
                                <path d="M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <div>
                            <h1 className={`text-lg lg:text-xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'
                                }`}>
                                MOROCCO <span className={isScrolled ? 'text-primary-500' : 'text-primary-300'}>DAMS</span>
                            </h1>
                            <p className={`text-[10px] uppercase tracking-widest font-semibold transition-colors ${isScrolled ? 'text-slate-500' : 'text-white/70'
                                }`}>
                                National Water Monitor
                            </p>
                        </div>
                    </motion.div>

                    {/* Desktop Controls */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Last Update */}
                        <div className={`text-right transition-colors ${isScrolled ? 'text-slate-600' : 'text-white/80'
                            }`}>
                            <p className="text-xs opacity-70">{t('common.lastUpdate')}</p>
                            <p className="font-bold text-sm">Jan 29, 2026</p>
                        </div>

                        {/* Language Switcher */}
                        <div className="relative lang-switcher">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${isScrolled
                                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm'
                                    }`}
                            >
                                <Globe className="w-4 h-4" />
                                <span>{currentLang.flag}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
                            </motion.button>

                            <AnimatePresence>
                                {langDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="lang-dropdown"
                                    >
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => changeLanguage(lang.code)}
                                                className={`lang-option ${i18n.language === lang.code ? 'bg-primary-50 text-primary-600' : 'text-slate-700'}`}
                                            >
                                                <span className="text-lg">{lang.flag}</span>
                                                <span>{lang.name}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Download Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isScrolled
                                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                                    : 'bg-white text-primary-600 hover:bg-slate-100'
                                }`}
                        >
                            <Download className="w-4 h-4" />
                            {t('common.downloadReport')}
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-slate-700' : 'text-white'
                            }`}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white rounded-b-2xl shadow-lg overflow-hidden"
                        >
                            <div className="p-4 space-y-4">
                                <div className="flex justify-center gap-2">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => changeLanguage(lang.code)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${i18n.language === lang.code
                                                    ? 'bg-primary-600 text-white'
                                                    : 'bg-slate-100 text-slate-700'
                                                }`}
                                        >
                                            <span>{lang.flag}</span>
                                            <span>{lang.name}</span>
                                        </button>
                                    ))}
                                </div>
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-xl font-medium">
                                    <Download className="w-4 h-4" />
                                    {t('common.downloadReport')}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}
