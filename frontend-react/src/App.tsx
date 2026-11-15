import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ExplorationGameProvider } from './context/ExplorationGameContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { GamifiedSitemap } from './components/sitemap/GamifiedSitemap';
import { ExplorerHud } from './components/sitemap/ExplorerHud';
import { LisaShowcaseSection } from './components/lisa/LisaShowcaseSection';
import { LegalVerticalSection } from './components/legal/LegalVerticalSection';
import { CasesShowcase } from './components/cases/CasesShowcase';
import { RoiCalculator } from './components/RoiCalculator';
import { EngineeringTrust } from './components/EngineeringTrust';
import { Footer } from './components/Footer';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-main)] flex flex-col font-sans transition-colors duration-200">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <GamifiedSitemap />
        <BentoGrid />
        <LisaShowcaseSection />
        <LegalVerticalSection />
        <CasesShowcase />
        <RoiCalculator />
        <EngineeringTrust />
      </main>
      <Footer />
      <ExplorerHud />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ExplorationGameProvider>
        <AppContent />
      </ExplorationGameProvider>
    </ThemeProvider>
  );
};

export default App;
