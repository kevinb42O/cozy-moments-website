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
  const [isInHomeHeroSection, setIsInHomeHeroSection] = useState(false);
  const [isInHomeMenuSection, setIsInHomeMenuSection] = useState(false);
  const [isInHomePremiumSections, setIsInHomePremiumSections] = useState(false);
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

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsInHomeHeroSection(false);
      setIsInHomeMenuSection(false);
      setIsInHomePremiumSections(false);
      return;
    }

    const heroSectionId = 'home-hero-section';
    const menuSectionId = 'home-menu-section';
    const premiumSectionIds = ['home-loyalty-section'];
    let ticking = false;

    const detectHeaderSections = () => {
      const probeY = globalThis.innerHeight * 0.4;
      const heroSection = globalThis.document.getElementById(heroSectionId);
      const menuSection = globalThis.document.getElementById(menuSectionId);
      const inHeroSection = heroSection
        ? heroSection.getBoundingClientRect().top <= probeY && heroSection.getBoundingClientRect().bottom >= probeY
        : false;
      const inMenuSection = menuSection
        ? menuSection.getBoundingClientRect().top <= probeY && menuSection.getBoundingClientRect().bottom >= probeY
        : false;

      const inPremiumSection = premiumSectionIds.some((sectionId) => {
        const section = globalThis.document.getElementById(sectionId);
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom >= probeY;
      });

      setIsInHomeHeroSection(inHeroSection);
      setIsInHomeMenuSection(inMenuSection);
      setIsInHomePremiumSections(inPremiumSection);
    };

    const handlePositionChange = () => {
      if (!ticking) {
        globalThis.requestAnimationFrame(() => {
          detectHeaderSections();
          ticking = false;
        });
        ticking = true;
      }
    };

    detectHeaderSections();
    globalThis.addEventListener('scroll', handlePositionChange);
    globalThis.addEventListener('resize', handlePositionChange);

    return () => {
      globalThis.removeEventListener('scroll', handlePositionChange);
      globalThis.removeEventListener('resize', handlePositionChange);
    };
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Drankkaart', path: '/menu' },
    { name: 'Social', path: '/social' },
    { name: 'Klantenkaart', path: '/klantenkaart' },
    { name: 'Info', path: '/info' },
  ];

  // Pages that have a dark hero section and require white text when not scrolled
  // Now all main pages have a dark hero section for consistency
  const isDarkHeroPage = ['/', '/info', '/menu', '/social', '/klantenkaart'].includes(location.pathname);
  const onHomepagePremiumOrHero = !isInHomeMenuSection && (isInHomeHeroSection || isInHomePremiumSections);
  const useWhiteText = location.pathname === '/' ? onHomepagePremiumOrHero : (isDarkHeroPage && !scrolled);
  const keepHomeActiveReadableInHero = location.pathname === '/' && isInHomeHeroSection;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`
          relative w-full max-w-5xl overflow-hidden
          backdrop-blur-2xl backdrop-saturate-150
          border transition-all duration-500 ease-in-out
          ${isOpen ? 'rounded-3xl border-champagne-500/60 shadow-[0_18px_60px_rgba(0,0,0,0.35)]' : 'rounded-2xl border-champagne-500/55 shadow-[0_12px_36px_rgba(0,0,0,0.28)]'}
          ${!isOpen && scrolled ? 'bg-latte-100/20' : ''}
          ${!isOpen && !scrolled && useWhiteText ? 'bg-latte-100/10' : ''}
          ${!isOpen && !scrolled && !useWhiteText ? 'bg-latte-100/24' : ''}
        `}
      >
        {/* Liquid glass surface layers */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,rgba(243,232,213,0.46)_0%,rgba(243,232,213,0.14)_34%,rgba(255,255,255,0.04)_70%)]" />
        <div className="pointer-events-none absolute inset-[1px] rounded-[inherit] bg-[radial-gradient(circle_at_12%_15%,rgba(243,232,213,0.34),transparent_44%),radial-gradient(circle_at_88%_100%,rgba(181,152,95,0.24),transparent_42%)]" />
        <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-linear-to-r from-transparent via-white/70 to-transparent" />

        <div className="px-6 py-3 sm:px-8 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center z-10 relative h-10 w-32">
              <img
                src="/cozy_logo_wit.png"
                alt="COZY Moments"
                className={`absolute inset-0 h-10 w-auto object-contain transition-opacity duration-500 ${useWhiteText && !isOpen ? 'opacity-100' : 'opacity-0'}`}
              />
              <img
                src="/cozy_logo.png"
                alt="COZY Moments"
                className={`absolute inset-0 h-10 w-auto object-contain transition-opacity duration-500 ${useWhiteText && !isOpen ? 'opacity-0' : 'opacity-100'}`}
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                const keepDarkHomeStyle = keepHomeActiveReadableInHero && isActive && link.path === '/';
                const linkUsesWhiteText = keepDarkHomeStyle ? false : useWhiteText;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="relative px-4 py-2 text-sm font-medium transition-colors group"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className={`absolute inset-0 rounded-full shadow-sm border transition-colors duration-300 ${linkUsesWhiteText ? 'bg-white/20 border-white/10' : 'bg-white/50 border-white/40'}`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className={`relative z-10 uppercase tracking-wider text-xs transition-colors duration-300 ${
                      isActive 
                        ? getTextColor(false, linkUsesWhiteText, 'text-white font-bold', 'text-coffee-900 font-bold') 
                        : getTextColor(false, linkUsesWhiteText, 'text-latte-100/80 hover:text-white', 'text-coffee-700 hover:text-coffee-900')
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
              aria-label={isOpen ? 'Sluit menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
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
              id="mobile-menu"
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
