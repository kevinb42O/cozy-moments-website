const GOOGLE_MAPS_LINK = 'https://maps.google.com/?q=Grote+Markt+2%2F0002%2C+8370+Blankenberge%2C+Belgium';

interface CustomStyledMapProps {
  className?: string;
  variant?: 'default' | 'homepage';
}

const CustomStyledMap = ({ className = '', variant = 'default' }: CustomStyledMapProps) => {
  const isHomepageVariant = variant === 'homepage';

  return (
    <div className="relative h-full w-full overflow-visible">
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

        <div className={`pointer-events-none absolute px-3 py-1.5 rounded-full border border-cream-100/45 bg-hotel-900/65 text-cream-100 text-[11px] uppercase tracking-[0.14em] font-semibold backdrop-blur-sm opacity-90 transition-opacity duration-300 group-hover:opacity-100 ${isHomepageVariant ? 'left-4 top-4' : 'top-4 right-4'}`}>
          Open in Google Maps
        </div>

        <div className={`pointer-events-none absolute left-4 bottom-4 px-3 py-2 rounded-lg bg-hotel-900/70 border border-cream-100/35 text-cream-100 text-xs tracking-wide backdrop-blur-sm transition-opacity duration-300 ${isHomepageVariant ? 'opacity-95 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          Grote Markt 2/0002, Blankenberge
        </div>
      </a>

      {isHomepageVariant ? (
        <div className="pointer-events-none absolute right-2 top-2 rounded-2xl border border-white/65 bg-white/25 p-1.5 shadow-[0_10px_28px_rgba(15,42,39,0.26)] backdrop-blur-sm transition-transform duration-500 sm:right-3 sm:top-3 sm:p-2 md:-right-14 md:-top-14">
          <img
            src="/cozymapimage.png"
            alt=""
            aria-hidden="true"
            className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28 md:h-42 md:w-42"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}
    </div>
  );
};

export default CustomStyledMap;
