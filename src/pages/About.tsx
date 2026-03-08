import { motion } from 'motion/react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SEO 
        title="Over Ons | Het Verhaal van Sixtine & COZY Moments"
        description="Leer Sixtine en het verhaal achter COZY Moments kennen. Een plek in Blankenberge waar warmte en gezelligheid centraal staan."
        canonical="https://cozy-moments.be/about"
      />
      {/* Hero Header */}
      <PageHero
        title="Over Ons"
        subtitle="Het Verhaal"
        description="Het verhaal achter COZY moments"
        imageSrc="/sixtine.jpeg"
        imagePosition="object-right"
      />
      
      <section className="py-24 bg-white relative z-20 -mt-20 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-3/4 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/sixtinefoto.jpg" 
                  alt="Sixtine in COZY moments" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Element */}
              <div className="absolute -z-10 -bottom-5 -right-5 w-full h-full border-2 border-gold-500 rounded-2xl" />
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
    </motion.div>
  );
};

export default About;
