/**
 * App — root component for ScaleWithEvergreen.com
 * Evergreen Scaling marketing company web application.
 */

import { lazy, Suspense } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/ui/HeroSection';
import { ServicesSection } from './components/ui/ServicesSection';
import { ResultsSection } from './components/ui/ResultsSection';
import { useEditorBridge } from './hooks/useEditorBridge';

// Lazy-load non-critical sections for code splitting
const EditorSection = lazy(() =>
  import('./components/ui/EditorSection').then((m) => ({ default: m.EditorSection }))
);
const ContactSection = lazy(() =>
  import('./components/ui/ContactSection').then((m) => ({ default: m.ContactSection }))
);

function SectionFallback() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading section"
      className="py-24 flex items-center justify-center"
    >
      <div className="h-8 w-8 rounded-full border-2 border-green-600 border-t-transparent animate-spin" />
    </div>
  );
}

function App() {
  const bridge = useEditorBridge({
    url: 'ws://localhost:7654',
    autoConnect: false,
  });

  return (
    <div className="min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:bg-green-600 focus:rounded-lg"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <ResultsSection />

        <Suspense fallback={<SectionFallback />}>
          <EditorSection bridge={bridge} />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;

