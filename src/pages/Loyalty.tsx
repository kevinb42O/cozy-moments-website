import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ArrowRight, Coffee, Wine, Beer, Star, ExternalLink, Droplets } from 'lucide-react';
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
        canonical="https://www.cozy-moments.be/klantenkaart"
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
            <PhoneMockup />
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
                  <span>Spaar punten voor gratis koffie, frisdrank, wijn of bier!</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-white/50 text-center">
                <div className="bg-coffee-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-coffee-800">
                  <Coffee size={24} />
                </div>
                <p className="font-rounded font-bold text-coffee-900">Koffie</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-white/50 text-center">
                <div className="bg-coffee-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-coffee-700">
                  <Droplets size={24} />
                </div>
                <p className="font-rounded font-bold text-coffee-900">Frisdrank</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-white/50 text-center">
                <div className="bg-red-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-red-800">
                  <Wine size={24} />
                </div>
                <p className="font-rounded font-bold text-coffee-900">Wijn</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-white/50 text-center">
                <div className="bg-yellow-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-yellow-700">
                  <Beer size={24} />
                </div>
                <p className="font-rounded font-bold text-coffee-900">Bier</p>
              </div>
            </div>

            <p className="text-sm text-coffee-700 font-sans">
              volle kaart = <span className="font-semibold text-coffee-900">gratis drankje*</span>
            </p>

            {/* Welkomstbonus */}
            <div className="flex items-start gap-3 bg-gold-500/10 border border-gold-500/30 rounded-2xl px-5 py-4">
              <Star size={18} className="text-gold-500 fill-gold-500 shrink-0 mt-0.5" />
              <p className="text-sm text-coffee-800 font-sans leading-relaxed">
                <span className="font-bold text-coffee-900">Welkomstbonus:</span> bij het aanmaken van een nieuwe klantenkaart ontvang je eenmalig{' '}
                <span className="font-bold text-gold-600">2 gratis stempels</span>.
              </p>
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

const PhoneMockup = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % loyaltyImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto w-[280px] sm:w-[316px]" style={{ aspectRatio: '9 / 17.9' }}>
      <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-3xl transform scale-90 translate-y-4" />
      <div className="absolute inset-x-7 bottom-[-12px] h-10 rounded-[999px] bg-coffee-900/40 blur-xl" aria-hidden="true" />

      <div className="pointer-events-none absolute -left-[4px] top-[21.5%] h-[52px] w-[4px] rounded-l-full bg-[linear-gradient(180deg,#b9bec8_0%,#7f8591_100%)] shadow-[inset_0_0_2px_rgba(255,255,255,0.5),0_0_0_1px_rgba(56,60,66,0.45)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-[4px] top-[33.2%] h-[82px] w-[4px] rounded-l-full bg-[linear-gradient(180deg,#b9bec8_0%,#7f8591_100%)] shadow-[inset_0_0_2px_rgba(255,255,255,0.5),0_0_0_1px_rgba(56,60,66,0.45)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-[4px] top-[47.2%] h-[82px] w-[4px] rounded-l-full bg-[linear-gradient(180deg,#b9bec8_0%,#7f8591_100%)] shadow-[inset_0_0_2px_rgba(255,255,255,0.5),0_0_0_1px_rgba(56,60,66,0.45)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-[4px] top-[37.4%] h-[116px] w-[4px] rounded-r-full bg-[linear-gradient(180deg,#b9bec8_0%,#7f8591_100%)] shadow-[inset_0_0_2px_rgba(255,255,255,0.5),0_0_0_1px_rgba(56,60,66,0.45)]" aria-hidden="true" />

      <article className="relative h-full rounded-[3.15rem] bg-[linear-gradient(145deg,#f4f6fa_0%,#d4d8e2_14%,#a9afba_30%,#f8f9fb_50%,#9ca3af_70%,#dbe0e8_84%,#f4f6fa_100%)] p-[2.6px] shadow-[0_30px_65px_rgba(10,34,31,0.35)]">
        <div className="relative h-full rounded-[2.98rem] bg-[#0c0d10] p-[5px]">
          <div className="pointer-events-none absolute left-1/2 top-[6px] z-20 h-[26px] w-[118px] -translate-x-1/2 rounded-[999px] bg-black shadow-[inset_0_-1px_0_rgba(255,255,255,0.1)]" aria-hidden="true">
            <span className="absolute left-[16px] top-1/2 h-[8px] w-[8px] -translate-y-1/2 rounded-full bg-zinc-900 ring-1 ring-zinc-700" />
            <span className="absolute right-[12px] top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-zinc-900 ring-1 ring-zinc-700" />
          </div>

          <div className="relative h-full overflow-hidden rounded-[2.62rem] bg-[#11151c] ring-1 ring-white/10">
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={loyaltyImages[index]}
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
              {loyaltyImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Toon klantenkaart afbeelding ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-5 bg-gold-500' : 'w-2 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-[2.98rem] bg-[linear-gradient(138deg,rgba(255,255,255,0.15)_0,rgba(255,255,255,0)_36%,rgba(255,255,255,0.03)_68%,rgba(255,255,255,0)_100%)]" aria-hidden="true" />
        </div>
      </article>

      {/* Gratis drankje badge */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        className="absolute -bottom-4 right-0 sm:-right-4 z-30 bg-white rounded-2xl shadow-2xl px-4 py-3 border border-latte-200 flex items-center gap-3"
      >
        <div className="text-2xl">🎁</div>
        <div>
          <p className="font-rounded font-bold text-coffee-900 text-sm leading-tight">Gratis drankje</p>
          <p className="text-[11px] text-coffee-700 leading-tight">bij 12 stempels!</p>
        </div>
      </motion.div>
    </div>
  );
};
