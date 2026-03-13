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
    <section ref={sectionRef} className="relative bg-coffee-900 text-latte-100 overflow-hidden">
      {/* ── Main editorial layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — big image with zoom-on-scroll */}
          <motion.div
            initial={{ clipPath: 'inset(12% 12% 12% 12%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden"
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
              <span className="text-xs font-sans uppercase tracking-[0.3em] text-gold-500/80">COZY Moments</span>
              <p className="text-2xl md:text-3xl font-serif mt-1 leading-tight">Elk drankje, een verhaal.</p>
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
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif mt-3 leading-[0.95]">
                Drank<span className="italic text-gold-500">kaart</span>
              </h2>
            </motion.div>

            {/* Category list — editorial style, no cards */}
            <div className="space-y-0 border-t border-white/10">
              {[
                { name: 'Koffie, Choco & Melk', count: '30+ soorten', link: '/menu?category=koffie-choco-melk' },
                { name: 'Thee, Chai & Matcha', count: '18 variaties', link: '/menu?category=thee-chai-matcha' },
                { name: 'Wijnen & Bubbels', count: 'Per glas of fles', link: '/menu?category=wine' },
                { name: 'Speciaalbieren', count: '40+ Belgisch & meer', link: '/menu?category=beer' },
                { name: 'Cocktails & 0.0%', count: 'Klassiek & virgin', link: '/menu?category=cocktail' },
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
                    className="group flex items-center justify-between py-5 border-b border-white/10 hover:border-gold-500/40 transition-colors duration-500"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-[10px] font-mono text-white/20 tabular-nums">0{i + 1}</span>
                      <span className="text-xl md:text-2xl font-serif group-hover:text-gold-500 transition-colors duration-300">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-sans uppercase tracking-wider text-white/30 hidden sm:block">{cat.count}</span>
                      <ArrowRight size={16} className="text-white/20 group-hover:text-gold-500 group-hover:translate-x-1 transition-all duration-300" />
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
                className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-coffee-900 font-bold uppercase tracking-widest hover:bg-latte-100 transition-all duration-300 rounded-full"
              >
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
