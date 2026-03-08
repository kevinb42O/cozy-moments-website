import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, ReactNode } from 'react';

interface PageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imagePosition?: string;
  children?: ReactNode;
}

const PageHero = ({ title, subtitle, description, imageSrc, imagePosition = 'object-center', children }: PageHeroProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative h-[50vh] min-h-100 overflow-hidden flex items-center justify-center pt-20">
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <img
          src={imageSrc}
          alt={title}
          className={`w-full h-full object-cover ${imagePosition}`}
        />
        <div className="absolute inset-0 bg-coffee-900/60" /> {/* Dark overlay for text readability */}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 mb-4 border border-gold-500/30 rounded-full text-gold-500 text-sm font-bold uppercase tracking-widest bg-gold-500/10 backdrop-blur-sm font-sans shadow-sm">
            {subtitle}
          </span>
          <h1 className="text-5xl md:text-7xl font-rounded font-extrabold text-latte-100 mb-6 tracking-tight drop-shadow-lg">
            {title}
          </h1>
          <p className="text-latte-100/90 text-lg max-w-xl mx-auto font-sans leading-relaxed drop-shadow-md font-medium">
            {description}
          </p>
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
    </div>
  );
};

export default PageHero;
