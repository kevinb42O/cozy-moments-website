import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import MenuSection from '../components/MenuSection';
import InfoSection from '../components/InfoSection';
import LoyaltySection from '../components/LoyaltySection';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SEO 
        title="COZY Moments | Koffiebar & Lounge in Blankenberge"
        description="Ontdek COZY Moments in Blankenberge. De perfecte plek voor koffie, cocktails en gezelligheid. Bekijk onze menukaart en spaar mee met onze klantenkaart."
        canonical="https://cozy-moments.be/"
      />
      <Hero />
      {/* Wave divider — outside overflow-hidden so it never clips */}
      <div className="relative z-10 -mt-[22px] md:-mt-[112px] pointer-events-none">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0,60 C320,110 640,10 960,70 C1120,95 1300,30 1440,50 L1440,120 L0,120 Z" fill="#F5F0EB" />
        </svg>
      </div>
      <AboutSection />
      {/* Smooth gradient transition between latte-100 and latte-200 */}
      <div className="h-24 bg-gradient-to-b from-latte-100 to-latte-200" />
      <MenuSection />
      <LoyaltySection />
      <InfoSection />
    </motion.div>
  );
};

export default Home;
