import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import VisitorTracking from './components/VisitorTracking';
import CookieConsent from './components/CookieConsent';
import EmailJSSetupGuide from './components/EmailJSSetupGuide';
import ScrollToTop from './components/ScrollToTop';
import FreeWebsiteOffer from './components/FreeWebsiteOffer';

function App() {
  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <VisitorTracking />
      <CookieConsent />
      <EmailJSSetupGuide />
      <ScrollToTop />
      <FreeWebsiteOffer />
    </div>
  );
}

export default App;
