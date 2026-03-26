import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section
      id="home-hero-section"
      className="relative h-[100svh] min-h-[620px] md:h-[90vh] flex items-center justify-center overflow-hidden bg-coffee-900"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Sfeervolle koffiebar bij COZY Moments in Blankenberge"
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-linear-to-b from-coffee-900/60 via-coffee-900/40 to-coffee-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-latte-100 px-4 pb-14 sm:pb-16 md:pb-10 max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="block font-sans text-sm md:text-base uppercase tracking-[0.3em] mb-4 text-gold-500">
            Est. 2023 • Blankenberge
          </span>
          <h1 className="mb-8 flex justify-center">
            <img
              src="/cozyHDlogo.png"
              alt="COZY Moments"
              className="h-24 md:h-32 w-auto drop-shadow-lg"
              loading="eager"
              decoding="async"
            />
          </h1>
          <p className="font-bebas text-2xl md:text-4xl font-light opacity-90 max-w-2xl mx-auto leading-relaxed">
            COME IN, FEEL AT HOME
          </p>
          <p className="mt-2 text-sm md:text-base opacity-90 max-w-2xl mx-auto leading-relaxed">
            Een plek waar gezelligheid, warmte en oprechte verbinding altijd op de eerste plaats komen.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
        >
          <Link
            to="/menu"
            className="group relative px-8 py-4 bg-linear-to-b from-[#d6ba80] via-gold-500 to-[#8f7750] text-coffee-900 font-medium uppercase tracking-widest transition-all duration-300 overflow-hidden rounded-full border border-[#d8c192] shadow-[0_10px_24px_rgba(170,141,87,0.34)] hover:brightness-110 hover:shadow-[0_14px_28px_rgba(170,141,87,0.42)]"
          >
            <span className="pointer-events-none absolute inset-x-6 top-1.5 h-px bg-linear-to-r from-transparent via-white/70 to-transparent" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              Drankkaart <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link
            to="/info"
            className="px-8 py-4 border border-latte-100/30 text-latte-100 font-medium uppercase tracking-widest hover:bg-latte-100/10 transition-colors duration-300 backdrop-blur-sm rounded-full"
          >
            Kom Langs
          </Link>
        </motion.div>
      </div>

      {/* Anchored wave keeps the transition consistent across mobile viewport sizes */}
      <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[58px] sm:h-[72px] md:h-[110px] block"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,60 C320,110 640,10 960,70 C1120,95 1300,30 1440,50 L1440,120 L0,120 Z"
            className="fill-latte-100"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
