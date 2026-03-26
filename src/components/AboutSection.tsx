import { motion } from 'motion/react';

type Feature = {
  title: string;
  desc: string;
  icon?: React.ReactNode;
  iconSrc?: string;
  iconAlt?: string;
};

const features: Feature[] = [
  {
    iconSrc: "/coffeeicon.png",
    iconAlt: "Coffee icon",
    title: "Coffee To Go",
    desc: "In a rush? Neem je favoriete koffie mee voor onderweg."
  },
  {
    iconSrc: "/wifiicon.png",
    iconAlt: "Wifi icon",
    title: "Free WIFI",
    desc: "Gratis wifi in heel de zaak, altijd verbonden."
  },
  {
    iconSrc: "/chargeicon.png",
    iconAlt: "Charge icon",
    title: "Good vibe,full battery",
    desc: "Charge & Chill. Laad gerust je toestel op terwijl je geniet van een drankje."
  },
  {
    iconSrc: "/dogicon.png",
    iconAlt: "Dog icon",
    title: "Dog Friendly",
    desc: "Jouw viervoeter is welkom met leiband, water staat klaar."
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
              <div className="mt-2 mb-6">
                <img
                  src="/cozy_logo.png"
                  alt="COZY Moments"
                  className="h-24 md:h-28 w-auto"
                  loading="lazy"
                />
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
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-coffee-200/60 bg-white text-gold-600 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md">
                    {feature.iconSrc ? (
                      <img
                        src={feature.iconSrc}
                        alt={feature.iconAlt ?? ''}
                        className="h-11 w-11 object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      feature.icon
                    )}
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

    </section>
  );
};

export default AboutSection;
