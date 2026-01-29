import { Droplets, RefreshCw } from 'lucide-react';

export default function Header({ lastUpdate }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <header className="header">
            <div className="header-left">
                <div className="logo">🇲🇦</div>
                <div>
                    <h1 className="header-title">Morocco Water Dashboard</h1>
                    <p className="header-subtitle">Real-time water resource monitoring</p>
                </div>
            </div>
            <div className="header-right">
                <div className="update-indicator">
                    <span className="update-dot"></span>
                    <span>Last update: {formatDate(lastUpdate)}</span>
                </div>
            </div>
        </header>
    );
}
