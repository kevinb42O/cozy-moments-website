import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const getTextColor = (isOpen: boolean, useWhiteText: boolean, lightColor: string, darkColor: string) => {
  if (isOpen) return darkColor;
  return useWhiteText ? lightColor : darkColor;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        globalThis.requestAnimationFrame(() => {
          setScrolled(globalThis.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    globalThis.addEventListener('scroll', handleScroll);
    return () => globalThis.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Drankkaart', path: '/menu' },
    { name: 'Inspiratie', path: '/inspiration' },
    { name: 'Klantenkaart', path: '/klantenkaart' },
    { name: 'Over', path: '/about' },
    { name: 'Info', path: '/info' },
  ];

  // Pages that have a dark hero section and require white text when not scrolled
  // Now all main pages have a dark hero section for consistency
  const isDarkHeroPage = ['/', '/about', '/info', '/menu', '/inspiration', '/klantenkaart'].includes(location.pathname);
  const useWhiteText = isDarkHeroPage && !scrolled;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`
          relative w-full max-w-5xl 
          backdrop-blur-xl
          border shadow-xl transition-all duration-500 ease-in-out
          ${isOpen ? 'rounded-3xl bg-white/90 border-white/40' : 'rounded-full'}
          ${!isOpen && scrolled ? 'bg-white/70 border-white/30 shadow-black/5' : ''}
          ${!isOpen && !scrolled && useWhiteText ? 'bg-white/5 border-white/10 shadow-black/0' : ''}
          ${!isOpen && !scrolled && !useWhiteText ? 'bg-white/40 border-white/40 shadow-black/5' : ''}
        `}
      >
        <div className="px-6 py-3 sm:px-8 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group z-10 relative">
              <div className="flex flex-col items-end leading-none">
                <span className={`font-rounded font-extrabold text-3xl tracking-tight transition-colors duration-300 ${getTextColor(isOpen, useWhiteText, 'text-latte-100', 'text-coffee-900')}`}>COZY</span>
                <span className={`font-script text-xl -mt-2 mr-1 transition-colors duration-300 ${getTextColor(isOpen, useWhiteText, 'text-latte-200', 'text-coffee-800')}`}>Moments</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="relative px-4 py-2 text-sm font-medium transition-colors group"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className={`absolute inset-0 rounded-full shadow-sm border transition-colors duration-300 ${useWhiteText ? 'bg-white/20 border-white/10' : 'bg-white/50 border-white/40'}`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className={`relative z-10 uppercase tracking-wider text-xs transition-colors duration-300 ${
                      isActive 
                        ? getTextColor(false, useWhiteText, 'text-white font-bold', 'text-coffee-900 font-bold') 
                        : getTextColor(false, useWhiteText, 'text-latte-100/80 hover:text-white', 'text-coffee-700 hover:text-coffee-900')
                    }`}>
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden relative z-10 p-2 rounded-full transition-colors duration-300 ${getTextColor(isOpen, useWhiteText, 'text-latte-100 hover:bg-white/10', 'text-coffee-800 hover:bg-black/5')}`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-4 pb-6 pt-2 space-y-2">
                {links.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-xl text-center font-medium uppercase tracking-widest transition-all ${
                        location.pathname === link.path 
                          ? 'bg-white/60 text-coffee-900 shadow-sm' 
                          : 'text-coffee-700 hover:bg-white/30'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
