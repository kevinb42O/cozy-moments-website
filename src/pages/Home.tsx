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
      <div className="-mt-px">
        <AboutSection />
      </div>
      <div className="-mt-px">
        <MenuSection />
      </div>
      <div className="-mt-px">
        <LoyaltySection />
      </div>
      <div className="-mt-px">
        <InfoSection />
      </div>
    </motion.div>
  );
};

export default Home;
