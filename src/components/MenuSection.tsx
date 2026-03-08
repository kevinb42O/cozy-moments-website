import { motion } from 'motion/react';
import { ArrowRight, Coffee, Wine, Beer } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    icon: <Coffee className="w-8 h-8" />,
    title: "Koffie & Thee",
    desc: "Vers gebrande bonen en premium theesoorten.",
    link: "/menu#koffie-choco-melk"
  },
  {
    icon: <Wine className="w-8 h-8" />,
    title: "Wijnen",
    desc: "Zorgvuldig geselecteerde wijnen per glas of fles.",
    link: "/menu#witte-wijn"
  },
  {
    icon: <Beer className="w-8 h-8" />,
    title: "Speciaalbieren",
    desc: "Lokale en internationale bieren om van te genieten.",
    link: "/menu#bieren"
  }
];

const MenuSection = () => {
  return (
    <section className="py-24 bg-latte-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-gold-500 font-sans font-bold uppercase tracking-widest text-sm">Onze Selectie</span>
          <h2 className="text-4xl md:text-5xl font-rounded font-extrabold text-coffee-900 mt-2 tracking-tight">
            Drankkaart
          </h2>
          <p className="text-coffee-700 mt-4 max-w-2xl mx-auto font-sans">
            Ontdek onze uitgebreide kaart met warme dranken, verfrissende cocktails en meer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <Link to={cat.link} className="block h-full bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1 border border-transparent hover:border-gold-500/20">
                <div className="w-16 h-16 bg-latte-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-coffee-800 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300">
                  {cat.icon}
                </div>
                <h3 className="font-rounded font-bold text-2xl text-coffee-900 mb-3">{cat.title}</h3>
                <p className="text-coffee-700 text-sm leading-relaxed font-sans">{cat.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 bg-coffee-800 text-latte-100 font-medium uppercase tracking-widest hover:bg-coffee-900 transition-colors duration-300 rounded-full"
          >
            Bekijk Volledige Kaart <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSection;
