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
        title="Info | Verhaal, Contact & Openingsuren | COZY Moments"
        description="Lees het verhaal van COZY Moments en vind meteen alle praktische info: adres, telefoonnummer en openingsuren in Blankenberge."
        canonical="https://www.cozy-moments.be/info"
      />
      {/* Hero Header */}
      <PageHero
        title="Info"
        subtitle="Verhaal & Contact"
        description="Ontdek het verhaal achter COZY Moments en vind alle praktische info op een plek."
        imageSrc="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-24 bg-latte-100 relative z-20 -mt-20 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-3/4 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/sixtinefotozaak.jpeg" 
                  alt="Sixtine in COZY moments" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -z-10 -bottom-5 right-0 md:-right-5 w-full h-full border-2 border-gold-500 rounded-2xl" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <span className="text-gold-500 font-sans font-bold uppercase tracking-widest text-sm">Over COZY moments en over MIJ</span>
                <h2 className="text-4xl md:text-5xl font-rounded font-extrabold text-coffee-900 mt-2 mb-6 tracking-tight">
                  Hey, ik ben Sixtine.
                </h2>
                <div className="text-coffee-700 leading-relaxed text-lg space-y-6 font-sans">
                  <p>
                    Midden juli 2025 opende ik de Sixtine's, maar na enkele maanden besefte ik dat het meer was dan alleen 'mijn' plekje.
                    Het was er echt cozy... en zo ontstond
                    <span className="inline-flex items-baseline gap-1 align-baseline mx-1">
                        <span className="font-rounded font-extrabold text-lg text-coffee-900 tracking-tight">COZY</span>
                        <span className="font-script text-xl text-coffee-800">Moments</span>
                    </span>.
                  </p>
                  <p>
                    De <span className="font-rounded font-extrabold text-coffee-900 tracking-tight">COZY</span> is mijn manier om momenten van intens geluk te delen.
                    Ik ben een vrolijke, enthousiaste meid en dat probeer ik over te dragen met een 'Big Smile' en een flinke dosis pure gekkigheid.
                  </p>
                  <p className="font-medium text-coffee-900 italic border-l-4 border-gold-500 pl-4">
                    "Hier kan je helemaal jezelf zijn, ontspannen en genieten van gezellige verbinding."
                  </p>
                  <p>
                    Mijn ouders zorgen dagelijks voor extra sfeer en gezelligheid en ook mijn vaste vriendjes (klanten) dragen bij aan de fijne momenten die de <span className="font-rounded font-extrabold text-coffee-900 tracking-tight">COZY</span> zo bijzonder maken.
                  </p>
                  <p>
                    Samen creëren we een plek waar warmte, lachen en samenzijn op de eerste plaats komen.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 overflow-visible">
        <div className="rounded-[2rem] border border-white/60 bg-white/35 p-4 sm:p-6 lg:p-8 backdrop-blur-sm shadow-[0_24px_60px_rgba(44,29,12,0.08)] overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Contact Cards Column */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bg-white/95 p-7 rounded-3xl shadow-lg shadow-coffee-900/5 border border-white/60 backdrop-blur-sm"
          >
            <div className="w-12 h-12 bg-latte-100 rounded-2xl flex items-center justify-center text-coffee-800 mb-6">
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

            <div className="my-6 h-px bg-coffee-100" />

            <div className="w-12 h-12 bg-latte-100 rounded-2xl flex items-center justify-center text-coffee-800 mb-6">
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

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8 bg-white/95 p-3 rounded-3xl shadow-lg shadow-coffee-900/5 h-[22rem] md:h-[25rem] relative overflow-visible group border border-white/60"
          >
            <div className="h-full rounded-2xl overflow-visible border border-champagne-500/35">
              <CustomStyledMap
                variant="homepage"
                overlayPositionClassName="z-30 top-0 -right-4 -translate-y-[46%] md:right-[22%] md:-translate-y-[68%]"
                className="transition-all duration-700 scale-100 group-hover:scale-105 [&>img]:object-[center_88%]"
              />
            </div>
          </motion.div>

          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hours */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-coffee-900 text-latte-100 p-7 rounded-3xl shadow-lg relative overflow-hidden min-h-[26rem]"
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
                    <span className="font-mono text-gold-500">10:00 - 22:00</span>
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
                    <span className="font-mono text-gold-500">Gesloten</span>
                  </div>
                </div>
              </motion.div>

              {/* Atmosphere / Extra Info */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="bg-white/95 p-7 rounded-3xl shadow-lg shadow-coffee-900/5 border border-white/60 flex flex-col min-h-[26rem]"
              >
                <div>
                  <div className="w-12 h-12 bg-latte-100 rounded-2xl flex items-center justify-center text-coffee-800 mb-6">
                    <PawPrint size={24} />
                  </div>
                  <h3 className="font-rounded font-bold text-2xl text-coffee-900 mb-3">Huisdiervriendelijk</h3>
                  <p className="text-coffee-700 text-sm leading-relaxed mb-6 font-sans">
                    Bij COZY moments is jouw viervoeter meer dan welkom! We zijn trots aangesloten bij:
                  </p>

                  <div className="space-y-3">
                    <a
                      href="https://www.dogsandcats.be/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-coffee-100 bg-latte-50 px-3 py-2.5 hover:border-gold-500/45 hover:bg-gold-50/40 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-white border border-coffee-100 flex items-center justify-center shrink-0">
                          <PawPrint size={18} className="text-gold-600" strokeWidth={2.2} />
                        </div>
                        <img
                          src="/dogscats.png"
                          alt="Dogs & Cats"
                          className="h-10 w-auto max-w-[152px] object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </a>

                    <a
                      href="https://www.hondaanzee.be"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center gap-2.5 rounded-xl border border-coffee-100 bg-latte-50 px-2.5 py-2 transition-colors duration-200 hover:border-gold-500/45 hover:bg-gold-50/40"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white border border-coffee-100 flex items-center justify-center shrink-0">
                        <PawPrint size={18} className="text-gold-600" strokeWidth={2.2} />
                      </div>
                      <div className="ml-1.5 flex min-w-0 flex-col leading-none">
                        <div className="font-sans font-extrabold text-[1.12rem] tracking-[-0.02em] text-coffee-900 truncate">
                          Hond<span className="text-[#18a3eb]">Aan</span><span className="text-coffee-900">Zee</span>
                        </div>
                        <span className="text-[7px] font-bold text-coffee-500 uppercase tracking-[0.16em] mt-0.5">De Kustgids</span>
                      </div>
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
