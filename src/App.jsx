import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Hero
import HeroSection from './components/hero/HeroSection';

// Dashboard Components
import StatCards from './components/dashboard/StatCards';
import HistoryChart from './components/dashboard/HistoryChart';
import BasinChart from './components/dashboard/BasinChart';
import RegionalCards from './components/dashboard/RegionalCards';
import InfrastructurePanel from './components/dashboard/InfrastructurePanel';
import DamsTable from './components/dashboard/DamsTable';

// UI Components
import LoadingScreen from './components/ui/LoadingScreen';
import NewsTicker from './components/ui/NewsTicker';

export default function App() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}

      <div className={`min-h-screen transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Navigation */}
        <Navbar />

        {/* Hero Section with Slider */}
        <HeroSection />

        {/* News Ticker */}
        <NewsTicker />

        {/* Main Content */}
        <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Overview Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              {t('overview.title')}
            </h2>
            <p className="text-slate-600 max-w-3xl">
              {t('overview.description')}
            </p>
          </motion.div>

          {/* Stat Cards */}
          <StatCards />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Charts */}
            <div className="lg:col-span-2 space-y-8">
              <HistoryChart />
              <BasinChart />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <RegionalCards />
              <InfrastructurePanel />
            </div>
          </div>

          {/* Dams Table */}
          <DamsTable />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
