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
      <AboutSection />
      {/* Smooth gradient transition between latte-100 and latte-200 */}
      <div className="h-24 bg-linear-to-b from-latte-100 to-latte-200" />
      <MenuSection />
      <LoyaltySection />
      <InfoSection />
    </motion.div>
  );
};

export default Home;
