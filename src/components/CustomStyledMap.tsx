const GOOGLE_MAPS_LINK = 'https://maps.google.com/?q=Grote+Markt+2%2F0002%2C+8370+Blankenberge%2C+Belgium';

interface CustomStyledMapProps {
  className?: string;
}

const CustomStyledMap = ({ className = '' }: CustomStyledMapProps) => {
  return (
    <a
      href={GOOGLE_MAPS_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open COZY Moments locatie in Google Maps"
      className={`${className} group block relative overflow-hidden w-full h-full`}
    >
      <img
        src="/mapmapfinal.png"
        alt="COZY Moments kaart"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />

      <div className="pointer-events-none absolute top-4 right-4 px-3 py-1.5 rounded-full border border-cream-100/45 bg-hotel-900/65 text-cream-100 text-[11px] uppercase tracking-[0.14em] font-semibold backdrop-blur-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300">
        Open in Google Maps
      </div>

      <div className="pointer-events-none absolute left-4 bottom-4 px-3 py-2 rounded-lg bg-hotel-900/70 border border-cream-100/35 text-cream-100 text-xs tracking-wide backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Grote Markt 2/0002, Blankenberge
      </div>
    </a>
  );
};

export default CustomStyledMap;
