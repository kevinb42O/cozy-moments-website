import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-latte-100 flex items-center justify-center px-4"
    >
      <SEO
        title="Pagina Niet Gevonden | COZY Moments"
        description="Deze pagina bestaat niet. Ga terug naar de homepage van COZY Moments in Blankenberge."
        robots="noindex, nofollow"
      />
      <div className="text-center max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col items-center leading-none mb-8">
            <span className="font-rounded font-extrabold text-[10rem] leading-none text-coffee-900/10 select-none">
              404
            </span>
            <div className="font-rounded font-extrabold text-5xl md:text-6xl text-coffee-900 tracking-tight -mt-8">
              COZY
            </div>
            <span className="font-script text-3xl md:text-4xl text-coffee-800 -mt-3 ml-8">
              mis je
            </span>
          </div>

          <p className="text-coffee-700 text-lg leading-relaxed font-sans mb-10">
            Oeps — deze pagina bestaat niet (meer).<br />
            Kom terug naar de gezelligheid.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-coffee-900 text-latte-100 font-medium uppercase tracking-widest hover:bg-coffee-800 transition-colors duration-300 rounded-full"
          >
            <ArrowLeft size={18} />
            Terug naar Home
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
