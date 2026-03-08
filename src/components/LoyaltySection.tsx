import { motion } from 'motion/react';
import { Smartphone, Star, Coffee, Gift, QrCode } from 'lucide-react';
import { LOYALTY_APP_URL } from '../constants';

const LoyaltySection = () => {
  return (
    <section className="py-20 bg-coffee-900 text-latte-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-latte-100 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 rounded-full text-gold-500 text-sm font-medium uppercase tracking-wider border border-gold-500/30">
              <Star size={16} className="fill-gold-500" />
              <span>Nieuw bij COZY</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Spaar voor <span className="text-gold-500 italic">gratis</span> momenten
            </h2>
            
            <p className="text-lg text-latte-200/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Ontdek onze nieuwe digitale klantenkaart! Scan bij elk bezoek en spaar voor een heerlijke beloning.
            </p>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm inline-block w-full max-w-md relative">
              {/* Floating Startbonus Badge */}
              <motion.div 
                animate={{ y: [0, 5, 0], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-gold-500 text-coffee-900 p-3 rounded-xl shadow-xl flex items-center gap-2 z-20"
              >
                <div className="bg-white/20 p-1.5 rounded-full">
                  <Star size={16} fill="currentColor" />
                </div>
                <div>
                  <p className="font-bold text-sm leading-none">+2 Stempels</p>
                  <p className="text-[10px] opacity-80">Startbonus</p>
                </div>
              </motion.div>

              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gold-500 rounded-xl text-coffee-900">
                  <Gift size={24} />
                </div>
                <div className="text-left">
                  <h4 className="font-serif text-xl">Welkomstcadeau</h4>
                  <p className="text-sm text-latte-200/70">Speciaal voor nieuwe leden</p>
                </div>
              </div>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                  <span>Krijg direct <strong className="text-gold-500">2 gratis stempels</strong> bij registratie</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                  <span>10 stempels = <strong className="text-white">1 gratis drankje</strong> naar keuze*</span>
                </div>
                <p className="text-xs text-latte-200/40 pl-9 italic">*Bier, wijn, frisdrank of koffie</p>
              </div>
            </div>

            <div className="pt-4">
              <a 
                href={LOYALTY_APP_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-coffee-900 font-bold uppercase tracking-widest hover:bg-white hover:text-coffee-900 transition-all duration-300 rounded-full shadow-lg shadow-gold-500/20 hover:shadow-white/20 transform hover:-translate-y-1"
              >
                <Smartphone size={20} />
                Maak je account aan
              </a>
            </div>
          </motion.div>

          {/* Visual/Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-125 bg-[#F9F9F7] rounded-[3rem] border-8 border-coffee-900 shadow-2xl overflow-hidden">
              {/* Screen Content */}
              <div className="absolute inset-0 bg-[#F9F9F7] flex flex-col pt-12 px-4 overflow-hidden">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-6 px-2">
                   <div className="flex flex-col items-start leading-none">
                      <span className="font-rounded font-extrabold text-xl text-gray-900 tracking-tight">COZY</span>
                      <span className="font-script text-sm text-gray-600 -mt-1 mr-0.5">Moments</span>
                    </div>
                   <div className="w-8 h-8 rounded-full bg-[#E8E6DE] flex items-center justify-center text-[#8C8A80] font-serif text-sm">k</div>
                </div>

                {/* Koffie Kaart Preview */}
                <div className="bg-white rounded-3xl p-4 shadow-sm mb-4 transform scale-95 origin-top">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#5C4033] flex items-center justify-center text-white shrink-0">
                        <Coffee size={18} />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg text-gray-800">Koffie Kaart</h3>
                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">COZY MOMENTS</p>
                      </div>
                    </div>
                    <div className="px-2 py-0.5 rounded-full bg-[#E8E6DE] text-[#8C8A80] text-xs font-bold">
                      2/10
                    </div>
                  </div>

                  {/* Stamps Grid */}
                  <div className="grid grid-cols-5 gap-2 mb-2">
                    {Array.from({ length: 10 }, (_, i) => {
                      let stamp;
                      if (i < 2) {
                        stamp = (
                          <div className="w-8 h-8 rounded-full bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-sm">
                            <Gift size={14} />
                          </div>
                        );
                      } else if (i === 9) {
                        stamp = (
                          <div className="w-8 h-8 rounded-full bg-[#F5F5F0] border border-[#E8E6DE] flex items-center justify-center">
                            <span className="text-[8px] text-[#C0BEB5] font-medium">Gratis</span>
                          </div>
                        );
                      } else {
                        stamp = (
                          <div className="w-8 h-8 rounded-full bg-[#F5F5F0] border border-[#E8E6DE] flex items-center justify-center text-[#DCDAD4]">
                            <Coffee size={12} />
                          </div>
                        );
                      }
                      return (
                        <div key={`stamp-${i}`} className="flex justify-center">
                          {stamp}
                        </div>
                      );
                    })}
                  </div>
                </div>

                 {/* Floating Action Button Preview */}
                <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-center">
                  <div className="bg-white text-gray-900 w-full py-3 rounded-4xl shadow-lg flex items-center justify-center gap-2 border border-gray-100">
                    <QrCode size={18} className="text-gray-800" />
                    <span className="font-sans text-sm font-medium tracking-wide">Scan QR Code</span>
                  </div>
                </div>

              </div>
              
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-coffee-900 rounded-b-xl" />
            </div>
            
            {/* Floating Elements */}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default LoyaltySection;
