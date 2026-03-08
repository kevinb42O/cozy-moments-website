import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ArrowRight, Gift, Coffee, Wine, Beer, Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { LOYALTY_APP_URL } from '../constants';
import PageHero from '../components/PageHero';

const Loyalty = () => {
  return (
    <div className="bg-latte-100 min-h-screen">
      <SEO 
        title="Digitale Klantenkaart | Spaar voor Gratis Drankjes"
        description="Spaar punten bij elk bezoek aan COZY Moments met onze digitale klantenkaart. Ontvang gratis drankjes en exclusieve voordelen."
        canonical="https://cozy-moments.be/klantenkaart"
      />
      {/* Hero Header */}
      <PageHero
        title="Klantenkaart"
        subtitle="Spaar mee"
        description="Bij COZY moments belonen we graag onze trouwe klanten. Spaar voor gratis drankjes en geniet van exclusieve voordelen."
        imageSrc="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Phone/App Preview - Reduced Size */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-3xl transform scale-90 translate-y-4" />
              <PhoneCarousel />

              {/* Gratis drankje badge */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="absolute -bottom-4 right-0 sm:-right-4 z-30 bg-white rounded-2xl shadow-2xl px-4 py-3 border border-latte-200 flex items-center gap-3"
              >
                <div className="text-2xl">🎁</div>
                <div>
                  <p className="font-rounded font-bold text-coffee-900 text-sm leading-tight">Gratis drankje</p>
                  <p className="text-[11px] text-coffee-700 leading-tight">bij een volle kaart!</p>
                </div>
              </motion.div>

              {/* Floating Badge */}
              <div className="absolute right-0 sm:-right-4 top-1/4 z-20 bg-white p-4 rounded-2xl shadow-xl border border-latte-200 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="bg-gold-500 p-2 rounded-lg text-white">
                    <Gift size={24} />
                  </div>
                  <div>
                    <p className="font-rounded font-bold text-coffee-900">Gratis Drankje</p>
                    <p className="text-xs text-coffee-600 font-sans">Bij een volle kaart</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-white/50">
              <h2 className="text-2xl font-rounded font-bold text-coffee-900 mb-4 flex items-center gap-3">
                <Star className="text-gold-500 fill-current" />
                Hoe werkt het?
              </h2>
              <ul className="space-y-4 font-sans text-coffee-700">
                <li className="flex items-start gap-3">
                  <span className="bg-latte-200 text-coffee-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">1</span>
                  <span>
                    <a href={LOYALTY_APP_URL} target="_blank" rel="noopener noreferrer" className="text-coffee-900 font-bold underline decoration-gold-500 underline-offset-2 hover:text-gold-600 transition-colors">Bezoek</a> of download onze huisgemaakte digitale Klantenkaart.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-latte-200 text-coffee-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">2</span>
                  <span>Scan je QR-code bij elk bezoek aan de kassa.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-latte-200 text-coffee-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">3</span>
                  <span>Spaar punten voor gratis koffie, wijn of bier!</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-white/50 text-center">
                <div className="bg-coffee-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-coffee-800">
                  <Coffee size={24} />
                </div>
                <p className="font-rounded font-bold text-coffee-900">Koffie</p>
                <p className="text-xs text-coffee-600">10 stempels</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-white/50 text-center">
                <div className="bg-red-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-red-800">
                  <Wine size={24} />
                </div>
                <p className="font-rounded font-bold text-coffee-900">Wijn</p>
                <p className="text-xs text-coffee-600">10 stempels</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-white/50 text-center">
                <div className="bg-yellow-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-yellow-700">
                  <Beer size={24} />
                </div>
                <p className="font-rounded font-bold text-coffee-900">Bier</p>
                <p className="text-xs text-coffee-600">10 stempels</p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:items-start gap-4">
              <a 
                href={LOYALTY_APP_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-white font-bold uppercase tracking-widest hover:bg-gold-600 transition-colors duration-300 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto justify-center"
              >
                Open Klantenkaart <ExternalLink size={18} />
              </a>
              <Link 
                to="/menu" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-coffee-800 text-latte-100 font-medium uppercase tracking-widest hover:bg-coffee-900 transition-colors duration-300 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto justify-center"
              >
                Bekijk Drankkaart <ArrowRight size={18} />
              </Link>
              <p className="text-sm text-coffee-600 italic font-sans">
                Ontdek al onze dranken en begin vandaag nog met sparen!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Loyalty;

const loyaltyImages = ['/klantenkaart1.png', '/klantenkaart2.png'];

const PhoneCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % loyaltyImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-10 rounded-[2.5rem] shadow-2xl border-8 border-white overflow-hidden w-full aspect-9/19 bg-coffee-900">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={loyaltyImages[index]}
          alt={`Klantenkaart ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {loyaltyImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'bg-gold-500 w-4' : 'bg-white/50 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
