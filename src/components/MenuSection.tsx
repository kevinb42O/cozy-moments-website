import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const ease: [number, number, number, number] = [0.76, 0, 0.24, 1];

const MenuSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);

  return (
    <section id="home-menu-section" ref={sectionRef} className="relative pt-8 pb-16 sm:pb-20 md:pb-28 bg-latte-100 text-coffee-900 overflow-hidden">
      <div className="absolute top-10 right-0 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-coffee-300/20 blur-3xl pointer-events-none" />

      {/* ── Main editorial layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — big image with zoom-on-scroll */}
          <motion.div
            initial={{ clipPath: 'inset(12% 12% 12% 12%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/70 shadow-xl"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Koffie bij COZY Moments"
              style={{ scale: imgScale }}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-linear-to-t from-coffee-900/60 via-transparent to-transparent" />
            {/* Floating label */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-sans uppercase tracking-[0.3em] text-gold-500/90">COZY Moments</span>
              <p className="text-2xl md:text-3xl font-serif mt-1 leading-tight text-latte-100">Elk drankje, een verhaal.</p>
            </div>
          </motion.div>

          {/* Right — text + staggered drink categories */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="text-gold-500 font-sans text-xs font-bold uppercase tracking-[0.3em]">Onze Selectie</span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-rounded font-extrabold mt-3 leading-[0.95] text-coffee-900 tracking-tight">
                Drank<span className="italic text-gold-500 font-serif font-medium">kaart</span>
              </h2>
            </motion.div>

            {/* Category list — editorial style, no cards */}
            <div className="space-y-2 border-t border-coffee-200 bg-white/80 rounded-2xl px-5 py-3 border border-white shadow-sm">
              {[
                { name: 'koffie, choco & melk', count: 'Warm & romig', link: '/menu?category=koffie-choco-melk' },
                { name: 'thee, chai & matcha', count: 'Kruidig & zacht', link: '/menu?category=thee-chai-matcha' },
                { name: 'verfrissende dranken', count: 'Fris & sprankelend', link: '/menu?category=verfrissende-dranken' },
                { name: '0.0% dranken', count: 'Licht & vrij', link: '/menu?category=0.0% dranken' },
                { name: 'bieren', count: 'Belgisch & blond', link: '/menu?category=beer' },
                { name: 'wijnen & bubbels', count: 'Glas & fles', link: '/menu?category=wine' },
                { name: 'cocktails', count: 'Klassiek & creatief', link: '/menu?category=cocktail' },
                { name: 'alcoholische sterke dranken', count: 'Rijk & krachtig', link: '/menu?category=alcoholische sterke dranken' },
              ].map((cat, i) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                >
                  <Link
                    to={cat.link}
                    className="group flex items-center justify-between py-5 px-2 rounded-xl border border-transparent hover:border-gold-500/35 hover:bg-latte-100/55 transition-colors duration-500"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-[10px] font-mono text-coffee-400 tabular-nums">0{i + 1}</span>
                      <span className="text-xl md:text-2xl font-serif text-coffee-900 group-hover:text-gold-600 transition-colors duration-300">{cat.name}</span>
                    </div>
                    <div className="flex w-[15rem] shrink-0 items-center justify-end gap-4 text-right">
                      <span className="hidden sm:block text-xs font-sans uppercase tracking-wider text-coffee-500">{cat.count}</span>
                      <ArrowRight size={16} className="text-coffee-400 group-hover:text-gold-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6, ease }}
              className="pt-4"
            >
              <Link
                to="/menu"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-linear-to-b from-[#d6ba80] via-gold-500 to-[#8f7750] text-coffee-900 font-bold uppercase tracking-widest transition-all duration-300 rounded-full border border-[#d8c192] shadow-[0_10px_24px_rgba(170,141,87,0.34)] hover:brightness-110 hover:shadow-[0_14px_28px_rgba(170,141,87,0.42)] overflow-hidden"
              >
                <span className="pointer-events-none absolute inset-x-6 top-1.5 h-px bg-linear-to-r from-transparent via-white/70 to-transparent" />
                Volledige Kaart <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
