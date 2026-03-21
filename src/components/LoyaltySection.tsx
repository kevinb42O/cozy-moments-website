import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Smartphone, Star, Gift, Check, Trophy } from 'lucide-react';
import { LOYALTY_APP_URL } from '../constants';

const LoyaltySection = () => {
  return (
    <section id="home-loyalty-section" className="py-24 text-latte-100 relative overflow-hidden bg-hotel-950">
      {/* Premium dark base with subtle texture */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_14%_18%,rgba(181,152,95,0.12),transparent_42%),radial-gradient(circle_at_80%_58%,rgba(181,152,95,0.14),transparent_40%),linear-gradient(145deg,#0f2a27_0%,#163732_42%,#224b45_100%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[repeating-linear-gradient(125deg,transparent_0,transparent_7px,rgba(255,255,255,0.04)_8px,transparent_14px)]" />
      <div className="absolute top-[22%] right-[14%] w-[30rem] h-[30rem] rounded-full bg-champagne-500/15 blur-[130px] pointer-events-none" />
      <div className="absolute top-[48%] left-[10%] w-[24rem] h-[24rem] rounded-full bg-copper-500/10 blur-[120px] pointer-events-none" />

      {/* Thin separator replacing wave transition */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-champagne-500/70 to-transparent z-20" />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-15 pointer-events-none">
        <div className="absolute top-24 -left-28 w-96 h-96 bg-champagne-500 rounded-full blur-3xl" />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-champagne-500/10 rounded-full text-champagne-500 text-sm font-medium uppercase tracking-[0.18em] border border-champagne-500/30 backdrop-blur-sm">
              <Star size={16} className="fill-champagne-500" />
              <span>Nieuw bij COZY</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display leading-tight text-cream-100 tracking-[0.02em]">
              Spaar voor <span className="text-champagne-500 italic">gratis</span> momenten
            </h2>
            
            <p className="text-lg text-cream-200/85 leading-[1.9] max-w-xl mx-auto lg:mx-0 font-sans">
              Ontdek onze nieuwe digitale klantenkaart! Scan bij elk bezoek en spaar voor een heerlijke beloning.
            </p>

            <div className="bg-hotel-900/45 rounded-2xl p-6 border border-champagne-500/40 backdrop-blur-md inline-block w-full max-w-md relative shadow-[0_24px_80px_rgba(14,33,30,0.45)]">
              {/* Floating Startbonus Badge */}
              <motion.div 
                animate={{ y: [0, 5, 0], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 right-2 sm:-top-6 sm:-right-6 bg-champagne-500 text-hotel-900 p-3 rounded-lg shadow-xl shadow-hotel-950/55 flex items-center gap-2 z-20"
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
                <div className="p-3 bg-champagne-500/20 rounded-xl text-champagne-500 border border-champagne-500/35">
                  <Gift size={24} />
                </div>
                <div className="text-left">
                  <h4 className="font-display text-xl text-cream-100">Welkomstcadeau</h4>
                  <p className="text-sm text-cream-200/70">Speciaal voor nieuwe leden</p>
                </div>
              </div>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm text-cream-100/90">
                  <div className="w-6 h-6 rounded-full border border-champagne-500/50 flex items-center justify-center text-champagne-500">
                    <Check size={13} strokeWidth={1.8} />
                  </div>
                  <span>Krijg direct <strong className="text-champagne-500">2 gratis stempels</strong> bij registratie</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-cream-100/90">
                  <div className="w-6 h-6 rounded-full border border-champagne-500/50 flex items-center justify-center text-champagne-500">
                    <Check size={13} strokeWidth={1.8} />
                  </div>
                  <span>12 stempels = <strong className="text-cream-100">1 gratis drankje</strong> naar keuze*</span>
                </div>
                <p className="text-xs text-cream-200/45 pl-9 italic">*Bier, wijn, frisdrank of koffie</p>
              </div>
            </div>

            <div className="pt-4">
              <a 
                href={LOYALTY_APP_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#d8c192] text-hotel-900 font-semibold uppercase tracking-[0.16em] bg-linear-to-b from-[#d6ba80] via-champagne-500 to-[#8f7750] transition-all duration-300 rounded-lg shadow-[0_12px_26px_rgba(181,152,95,0.34)] hover:brightness-110 hover:shadow-[0_16px_32px_rgba(181,152,95,0.44)] transform hover:-translate-y-1 relative overflow-hidden"
              >
                <span className="pointer-events-none absolute inset-x-4 top-1.5 h-px bg-linear-to-r from-transparent via-white/70 to-transparent" />
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
      <div className="relative w-[18.5rem] h-[38rem] rounded-[3.2rem] border border-cream-100/10 shadow-[0_32px_90px_rgba(10,34,31,0.62)] overflow-hidden bg-hotel-950">
        <div className="absolute inset-[2px] rounded-[3rem] border border-champagne-500/35 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-hotel-950 rounded-b-2xl z-30 border-x border-b border-champagne-500/20" />

        {/* Real loyalty app screenshots inside the premium frame */}
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

        {/* Premium tint layer to keep the new upscale look */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(15,42,39,0.22)_0%,rgba(22,55,50,0.2)_100%)]" />

        {/* Slow parallax sheen for premium feel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0 bg-[linear-gradient(115deg,transparent_18%,rgba(255,255,255,0.07)_42%,transparent_66%)]"
            initial={{ x: '-85%', opacity: 0 }}
            animate={{ x: '95%', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.8, ease: 'easeInOut' }}
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
                i === index ? 'bg-champagne-500 w-4' : 'bg-cream-100/35'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Gratis drankje badge */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        className="absolute -bottom-4 -right-6 z-30 bg-hotel-900/90 backdrop-blur-md rounded-xl shadow-2xl px-4 py-3 border border-champagne-500/45 flex items-center gap-3 max-w-[200px]"
      >
        <div className="p-2 rounded-lg border border-champagne-500/45 text-champagne-500 bg-champagne-500/10">
          <Trophy size={16} strokeWidth={1.8} />
        </div>
        <div>
          <p className="font-sans font-semibold text-cream-100 text-sm leading-tight uppercase tracking-[0.12em]">Gratis drankje</p>
          <p className="text-[11px] text-cream-200/70 leading-tight">bij 12 stempels!</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoyaltySection;
