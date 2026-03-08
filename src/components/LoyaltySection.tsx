import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Smartphone, Star, Gift } from 'lucide-react';
import { LOYALTY_APP_URL } from '../constants';

const LoyaltySection = () => {
  return (
    <section className="py-20 bg-coffee-900 text-latte-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-latte-100 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 rounded-full text-gold-500 text-sm font-medium uppercase tracking-wider border border-gold-500/30">
              <Star size={16} className="fill-gold-500" />
              <span>Nieuw bij COZY</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Spaar voor <span className="text-gold-500 italic">gratis</span> momenten
            </h2>
            
            <p className="text-lg text-latte-200/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Ontdek onze nieuwe digitale klantenkaart! Scan bij elk bezoek en spaar voor een heerlijke beloning.
            </p>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm inline-block w-full max-w-md relative">
              {/* Floating Startbonus Badge */}
              <motion.div 
                animate={{ y: [0, 5, 0], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 right-2 sm:-top-6 sm:-right-6 bg-gold-500 text-coffee-900 p-3 rounded-xl shadow-xl flex items-center gap-2 z-20"
              >
                <div className="bg-white/20 p-1.5 rounded-full">
                  <Star size={16} fill="currentColor" />
                </div>
                <div>
                  <p className="font-bold text-sm leading-none">+2 Stempels</p>
                  <p className="text-[10px] opacity-80">Startbonus</p>
                </div>
              </motion.div>

              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gold-500 rounded-xl text-coffee-900">
                  <Gift size={24} />
                </div>
                <div className="text-left">
                  <h4 className="font-serif text-xl">Welkomstcadeau</h4>
                  <p className="text-sm text-latte-200/70">Speciaal voor nieuwe leden</p>
                </div>
              </div>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                  <span>Krijg direct <strong className="text-gold-500">2 gratis stempels</strong> bij registratie</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                  <span>10 stempels = <strong className="text-white">1 gratis drankje</strong> naar keuze*</span>
                </div>
                <p className="text-xs text-latte-200/40 pl-9 italic">*Bier, wijn, frisdrank of koffie</p>
              </div>
            </div>

            <div className="pt-4">
              <a 
                href={LOYALTY_APP_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-coffee-900 font-bold uppercase tracking-widest hover:bg-white hover:text-coffee-900 transition-all duration-300 rounded-full shadow-lg shadow-gold-500/20 hover:shadow-white/20 transform hover:-translate-y-1"
              >
                <Smartphone size={20} />
                Maak je account aan
              </a>
            </div>
          </motion.div>

          {/* Visual/Phone Mockup */}
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
};

const images = ['/klantenkaart1.png', '/klantenkaart2.png'];

const PhoneMockup = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative flex justify-center lg:justify-end"
    >
      <div className="relative w-72 h-125 rounded-[3rem] border-8 border-coffee-900 shadow-2xl overflow-hidden bg-coffee-900">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-coffee-900 rounded-b-xl z-20" />

        {/* Crossfading images */}
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
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
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Toon klantenkaart afbeelding ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === index ? 'bg-gold-500 w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Gratis drankje badge */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        className="absolute -bottom-4 -right-6 z-30 bg-white rounded-2xl shadow-2xl px-4 py-3 border border-latte-200 flex items-center gap-3 max-w-[180px]"
      >
        <div className="text-2xl">🎁</div>
        <div>
          <p className="font-rounded font-bold text-coffee-900 text-sm leading-tight">Gratis drankje</p>
          <p className="text-[11px] text-coffee-700 leading-tight">bij een volle kaart!</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoyaltySection;
