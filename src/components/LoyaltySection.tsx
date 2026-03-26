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
              <Star size={16} className="fill-champagne-500" />
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
                  <p className="font-bold text-sm leading-none uppercase">+2 STEMPELS</p>
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
                  <span>Krijg <strong className="text-champagne-500">2 gratis stempels</strong> bij registratie</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-cream-100/90">
                  <div className="w-6 h-6 rounded-full border border-champagne-500/50 flex items-center justify-center text-champagne-500">
                    <Check size={13} strokeWidth={1.8} />
                  </div>
                  <span>
                    volle kaart = <strong className="text-cream-100">gratis drankje</strong>*
                  </span>
                </div>
                <p className="text-xs text-cream-200/45 pl-9 italic">* koffie, frisdrank, wijn of bier</p>
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
      <div className="relative mx-auto w-[316px] sm:w-[340px]" style={{ aspectRatio: '9 / 17.9' }}>
        <div className="absolute inset-x-7 bottom-[-12px] h-10 rounded-[999px] bg-hotel-950/55 blur-xl" aria-hidden="true" />

        <div className="pointer-events-none absolute -left-[4px] top-[21.5%] h-[52px] w-[4px] rounded-l-full bg-[linear-gradient(180deg,#b9bec8_0%,#7f8591_100%)] shadow-[inset_0_0_2px_rgba(255,255,255,0.5),0_0_0_1px_rgba(56,60,66,0.45)]" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-[4px] top-[33.2%] h-[82px] w-[4px] rounded-l-full bg-[linear-gradient(180deg,#b9bec8_0%,#7f8591_100%)] shadow-[inset_0_0_2px_rgba(255,255,255,0.5),0_0_0_1px_rgba(56,60,66,0.45)]" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-[4px] top-[47.2%] h-[82px] w-[4px] rounded-l-full bg-[linear-gradient(180deg,#b9bec8_0%,#7f8591_100%)] shadow-[inset_0_0_2px_rgba(255,255,255,0.5),0_0_0_1px_rgba(56,60,66,0.45)]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-[4px] top-[37.4%] h-[116px] w-[4px] rounded-r-full bg-[linear-gradient(180deg,#b9bec8_0%,#7f8591_100%)] shadow-[inset_0_0_2px_rgba(255,255,255,0.5),0_0_0_1px_rgba(56,60,66,0.45)]" aria-hidden="true" />

        <article className="relative h-full rounded-[3.15rem] bg-[linear-gradient(145deg,#f4f6fa_0%,#d4d8e2_14%,#a9afba_30%,#f8f9fb_50%,#9ca3af_70%,#dbe0e8_84%,#f4f6fa_100%)] p-[2.6px] shadow-[0_30px_65px_rgba(10,34,31,0.62)]">
          <div className="relative h-full rounded-[2.98rem] bg-[#0c0d10] p-[5px]">
            <div className="pointer-events-none absolute left-1/2 top-[6px] z-20 h-[26px] w-[118px] -translate-x-1/2 rounded-[999px] bg-black shadow-[inset_0_-1px_0_rgba(255,255,255,0.1)]" aria-hidden="true">
              <span className="absolute left-[16px] top-1/2 h-[8px] w-[8px] -translate-y-1/2 rounded-full bg-zinc-900 ring-1 ring-zinc-700" />
              <span className="absolute right-[12px] top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-zinc-900 ring-1 ring-zinc-700" />
            </div>

            <div className="relative h-full overflow-hidden rounded-[2.62rem] bg-[#11151c] ring-1 ring-white/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={index}
                  src={images[index]}
                  alt={`Klantenkaart ${index + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,42,39,0.18)_0%,rgba(22,55,50,0.12)_100%)]" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={`sheen-${index}`}
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_18%,rgba(255,255,255,0.07)_42%,transparent_66%)]"
                  initial={{ x: '-85%', opacity: 0 }}
                  animate={{ x: '95%', opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.8, ease: 'easeInOut' }}
                />
              </AnimatePresence>

              <div className="pointer-events-none absolute top-0 left-0 right-0 flex items-center justify-between px-6 pb-1 pt-3 text-[11px] font-semibold text-white/85 z-10" aria-hidden="true">
                <span>10:28</span>
                <span>5G</span>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Toon klantenkaart afbeelding ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? 'w-5 bg-champagne-500' : 'w-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-[2.98rem] bg-[linear-gradient(138deg,rgba(255,255,255,0.15)_0,rgba(255,255,255,0)_36%,rgba(255,255,255,0.03)_68%,rgba(255,255,255,0)_100%)]" aria-hidden="true" />
          </div>
        </article>
      </div>

      {/* Gratis drankje badge */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        className="absolute -bottom-4 -right-2 z-30 bg-hotel-900/90 backdrop-blur-md rounded-xl shadow-2xl px-4 py-3 border border-champagne-500/45 flex items-center gap-3 max-w-[200px]"
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
