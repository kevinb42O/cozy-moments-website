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
        title="COZY Moments | Koffiebar, Cocktails & Gezellig Cafe in Blankenberge"
        description="COZY Moments is jouw koffiebar en gezellige cocktailbar in Blankenberge. Ontdek koffie, cocktails, mocktails en onze volledige drankkaart."
        canonical="https://www.cozy-moments.be/"
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
