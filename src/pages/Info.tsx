import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Star, PawPrint } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import CustomStyledMap from '../components/CustomStyledMap';

const Info = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-latte-100 min-h-screen"
    >
      <SEO 
        title="Contact, Adres & Openingsuren | COZY Moments Blankenberge"
        description="Zoek je een gezellige koffiebar of cocktails in Blankenberge? Vind hier het adres, telefoonnummer en openingsuren van COZY Moments."
        canonical="https://www.cozy-moments.be/info"
      />
      {/* Hero Header */}
      <PageHero
        title="Contact & Info"
        subtitle="Altijd Welkom"
        description="Heb je een vraag, wil je reserveren of gewoon even hallo zeggen? We horen graag van je."
        imageSrc="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Cards Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Address Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-coffee-900/5 border border-white/50 backdrop-blur-sm group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-12 h-12 bg-latte-100 rounded-2xl flex items-center justify-center text-coffee-800 mb-6 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                <MapPin size={24} />
              </div>
              <h3 className="font-rounded font-bold text-2xl text-coffee-900 mb-2">Locatie</h3>
              <p className="text-coffee-700 leading-relaxed mb-4 font-sans">
                Grote Markt 2/0002<br />
                8370 Blankenberge<br />
                België
              </p>
              <a 
                href="https://maps.google.com/?q=COZY+Moments%2C+Grote+Markt+2%2F0002%2C+8370+Blankenberge" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-gold-600 font-bold hover:text-gold-700 transition-colors text-sm uppercase tracking-wider font-sans"
              >
                Routebeschrijving &rarr;
              </a>
            </motion.div>

            {/* Contact Details Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-coffee-900/5 border border-white/50 backdrop-blur-sm group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-12 h-12 bg-latte-100 rounded-2xl flex items-center justify-center text-coffee-800 mb-6 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                <Phone size={24} />
              </div>
              <h3 className="font-rounded font-bold text-2xl text-coffee-900 mb-4">Bereikbaarheid</h3>
              <div className="space-y-4 font-sans">
                <div>
                  <p className="text-xs text-coffee-400 uppercase tracking-wider font-bold mb-1">Telefoon</p>
                  <a href="tel:050731616" className="text-lg text-coffee-800 hover:text-gold-600 transition-colors font-medium">
                    050 73 16 16
                  </a>
                </div>
                <div>
                  <p className="text-xs text-coffee-400 uppercase tracking-wider font-bold mb-1">E-mail</p>
                  <a href="mailto:info@cozy-moments.be" className="text-lg text-coffee-800 hover:text-gold-600 transition-colors font-medium break-all">
                    info@cozy-moments.be
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Map & Hours Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Map Container */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-3 rounded-3xl shadow-xl shadow-coffee-900/5 h-[28rem] md:h-[32rem] relative overflow-hidden group"
            >
              <div className="h-full rounded-2xl overflow-hidden border border-champagne-500/35">
                <CustomStyledMap className="transition-all duration-700 scale-100 group-hover:scale-105 [&>img]:object-[center_88%]" />
              </div>
              
              {/* Floating Location Badge */}
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-white/50 hidden sm:flex items-center gap-3">
                <div className="w-2 h-2 bg-champagne-500 rounded-full" />
                <span className="text-coffee-900 font-medium text-sm font-sans">Hartje Blankenberge</span>
              </div>
            </motion.div>

            {/* Opening Hours & Atmosphere */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Hours */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-coffee-900 text-latte-100 p-8 rounded-3xl shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
                
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="text-gold-500" size={24} />
                  <h3 className="font-rounded font-bold text-2xl">Openingsuren</h3>
                </div>
                
                <div className="space-y-3 relative z-10 font-sans">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="opacity-80">Maandag</span>
                    <span className="font-mono text-gold-500">10:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="opacity-80">Dinsdag</span>
                    <span className="font-mono text-gold-500">Gesloten</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="opacity-80">Woensdag</span>
                    <span className="font-mono text-gold-500">Gesloten</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="opacity-80">Donderdag</span>
                    <span className="font-mono text-gold-500">10:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="opacity-80">Vrijdag</span>
                    <span className="font-mono text-gold-500">10:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="opacity-80">Zaterdag</span>
                    <span className="font-mono text-gold-500">10:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="opacity-80">Zondag</span>
                    <span className="font-mono text-gold-500">12:00 - 22:00</span>
                  </div>
                </div>
              </motion.div>

              {/* Atmosphere / Extra Info */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white p-8 rounded-3xl shadow-xl shadow-coffee-900/5 border border-white/50 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-latte-100 rounded-2xl flex items-center justify-center text-coffee-800 mb-6">
                    <PawPrint size={24} />
                  </div>
                  <h3 className="font-rounded font-bold text-2xl text-coffee-900 mb-3">Huisdiervriendelijk</h3>
                  <p className="text-coffee-700 text-sm leading-relaxed mb-6 font-sans">
                    Bij COZY moments is jouw viervoeter meer dan welkom! We zijn trots aangesloten bij:
                  </p>

                  <a href="https://www.hondaanzee.be" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 group mb-6 rounded-xl bg-[#2f3a4f] px-2.5 py-2 shadow-[0_8px_18px_rgba(37,48,70,0.24)] transition-all duration-200 hover:shadow-[0_12px_24px_rgba(37,48,70,0.3)] hover:-translate-y-0.5">
                    <div className="w-10 h-10 rounded-xl bg-[#1ba0eb] flex items-center justify-center shrink-0 shadow-[inset_0_1px_2px_rgba(255,255,255,0.28)]">
                      <PawPrint size={20} className="text-white" strokeWidth={2.2} />
                    </div>
                    <div className="flex flex-col leading-none">
                      <div className="font-sans font-extrabold text-[1.65rem] tracking-[-0.02em] text-white">
                        Hond<span className="text-[#18a3eb]">Aan</span><span className="text-white">Zee</span>
                      </div>
                      <span className="text-[9px] font-bold text-white/65 uppercase tracking-[0.16em] mt-0.5">De Kustgids</span>
                    </div>
                  </a>
                  
                  <div className="border-t border-coffee-100 pt-4">
                    <p className="text-xs text-coffee-500 mb-2 uppercase tracking-wider font-sans font-bold">Bezoek ook onze dierenwinkel</p>
                    <a href="https://www.dogsandcats.be/" target="_blank" rel="noopener noreferrer" className="block group hover:opacity-80 transition-opacity">
                        <img
                          src="/dogscats.png"
                          alt="Dogs & Cats"
                          className="h-9 w-auto object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="text-xs text-coffee-400 group-hover:text-gold-600 transition-colors font-sans">Blankenberge &rarr;</span>
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-600 mt-6 font-sans">
                  <Star size={14} fill="currentColor" />
                  <span>Extra verwennerij voor je dier</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Info;
