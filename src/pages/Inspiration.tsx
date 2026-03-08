import { motion } from 'motion/react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const images = [
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1529003600303-bd51f39627fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

const Inspiration = () => {
  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Inspiratie & Sfeer | COZY Moments"
        description="Bekijk sfeerbeelden van COZY Moments. Een impressie van onze gezellige koffiebar en lounge in Blankenberge."
        canonical="https://cozy-moments.be/inspiration"
      />
      {/* Hero Header */}
      <PageHero
        title="Inspiratie"
        subtitle="Sfeerbeelden"
        description="Een blik op de gezellige momenten bij COZY. Deel jouw momenten met ons op social media."
        imageSrc="https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-2xl shadow-md cursor-pointer"
            >
              <img
                src={src}
                alt={`Inspiration ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-coffee-900/0 group-hover:bg-coffee-900/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inspiration;
