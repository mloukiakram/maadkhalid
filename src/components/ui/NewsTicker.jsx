import { useTranslation } from 'react-i18next';

export default function NewsTicker() {
    const { t } = useTranslation();

    const newsItems = [
        { type: 'breaking', text: t('news.news1') },
        { type: 'alert', text: t('news.news2') },
        { type: 'update', text: t('news.news3') },
        { type: 'infrastructure', text: t('news.news4') },
    ];

    return (
        <div className="bg-slate-900 text-white text-xs py-2.5 overflow-hidden news-ticker">
            <div className="news-ticker-content">
                {[...newsItems, ...newsItems].map((item, index) => (
                    <span key={index} className="inline-flex items-center mx-4">
                        <span className="font-bold text-cyan-400 mr-2">
                            {t(`news.${item.type}`)}
                        </span>
                        <span className="text-white/90">{item.text}</span>
                        <span className="mx-4 text-slate-600">•</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
