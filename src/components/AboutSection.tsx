import { motion } from 'motion/react';
import { Coffee, Wifi, Heart, Clock } from 'lucide-react';

const features = [
  {
    icon: <Coffee className="w-6 h-6" />,
    title: "Coffee To Go",
    desc: "In a rush? Neem je favoriete koffie mee voor onderweg."
  },
  {
    icon: <Wifi className="w-6 h-6" />,
    title: "Work Friendly",
    desc: "Laptops welkom. Overal zijn stopcontacten voorzien."
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Gezelligheid",
    desc: "De ideale omgeving om tot rust te komen."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Ontspanning",
    desc: "Zet je zorgen aan de kant en geniet."
  }
];

const AboutSection = () => {
  return (
    <section className="pt-24 pb-16 sm:pb-20 md:pb-28 bg-latte-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative grid grid-cols-2 gap-4"
          >
            <img 
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Koffiedetail" 
              className="rounded-2xl shadow-xl w-full h-64 object-cover mt-12"
              loading="lazy"
              decoding="async"
            />
            <img 
              src="/inspi6.png" 
              alt="Gezellig interieur van COZY Moments" 
              className="rounded-2xl shadow-xl w-full h-64 object-cover"
              loading="lazy"
              decoding="async"
            />
            {/* Decorative Element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-coffee-200/20 rounded-full blur-3xl" />
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <span className="text-gold-500 font-serif italic text-xl">Welkom bij</span>
              <div className="flex flex-col items-start leading-none mt-2 mb-6">
                <span className="font-rounded font-extrabold text-5xl md:text-6xl text-coffee-900 tracking-tight">COZY</span>
                <span className="font-script text-3xl md:text-4xl text-coffee-800 -mt-3 ml-1">Moments</span>
              </div>
              <p className="text-coffee-700 leading-relaxed text-lg">
                Afgekort 'COZY' - en dat zegt precies wat je kan verwachten. 
                Een plek waar gezelligheid, warmte en oprechte verbinding altijd op de eerste plaats komen.
              </p>
              <p className="text-coffee-700 leading-relaxed mt-4">
                De ideale omgeving om even tot rust te komen, bij te praten, nieuwe vrienden te maken of... 
                misschien wel de ware liefde tegen het lijf te lopen.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="p-3 bg-white rounded-xl shadow-sm text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-medium text-coffee-900">{feature.title}</h4>
                    <p className="text-sm text-coffee-700 mt-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave transition into dark MenuSection — mirrors Hero wave */}
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
            fill="#1A2E2A"
          />
        </svg>
      </div>
    </section>
  );
};

export default AboutSection;
