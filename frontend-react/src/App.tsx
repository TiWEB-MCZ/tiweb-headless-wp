import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
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
        <BentoGrid />
        <LisaShowcaseSection />
        <LegalVerticalSection />
        <CasesShowcase />
        <RoiCalculator />
        <EngineeringTrust />
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
