import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <h4 className="text-white text-lg font-bold mb-4">
                            {t('footer.title')}
                        </h4>
                        <p className="text-sm opacity-70 leading-relaxed">
                            {t('footer.description')}
                        </p>
                    </div>

                    {/* Official Sources */}
                    <div>
                        <h4 className="text-white font-bold mb-4">
                            {t('footer.officialSources')}
                        </h4>
                        <ul className="space-y-3 text-sm opacity-70">
                            <li>
                                <a href="#" className="hover:text-primary-400 transition flex items-center gap-2">
                                    {t('footer.ministry')}
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                            <li>
                                <a href="https://maadialna.ma" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition flex items-center gap-2">
                                    {t('footer.maaDialna')}
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-400 transition flex items-center gap-2">
                                    {t('footer.abh')}
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Water Saving */}
                    <div>
                        <h4 className="text-white font-bold mb-4">
                            {t('footer.waterSaving')}
                        </h4>
                        <p className="text-sm opacity-70 mb-4">
                            {t('footer.waterSavingDesc')}
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-primary-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-500 transition"
                        >
                            {t('common.viewGuidelines')}
                        </motion.button>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-slate-800 text-center text-xs opacity-50">
                    {t('footer.copyright')}
                </div>
            </div>
        </footer>
    );
}
