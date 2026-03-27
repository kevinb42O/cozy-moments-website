import { Facebook, Instagram, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_CLEAN, ADDRESS_LINE_1, ADDRESS_LINE_2 } from '../constants';

const Footer = () => {
  return (
    <footer id="site-footer" className="relative overflow-hidden bg-hotel-950 text-cream-200 font-sans">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_14%_14%,rgba(181,152,95,0.12),transparent_42%),radial-gradient(circle_at_82%_64%,rgba(143,111,71,0.10),transparent_40%),linear-gradient(145deg,#0f2a27_0%,#163732_42%,#224b45_100%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[repeating-linear-gradient(125deg,transparent_0,transparent_7px,rgba(255,255,255,0.04)_8px,transparent_14px)]" />
      <div className="absolute top-[12%] right-[8%] w-[28rem] h-[28rem] rounded-full bg-champagne-500/12 blur-[120px] pointer-events-none" />
      <div className="h-px bg-linear-to-r from-transparent via-champagne-500/70 to-transparent relative z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-14 pb-6 relative z-10 text-center md:text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-10 xl:items-stretch">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="inline-flex">
              <img
                src="/cozy_logo_wit.png"
                alt="COZY Moments"
                className="h-20 w-auto"
                loading="lazy"
              />
            </div>
            <p className="text-sm leading-[1.9] text-cream-200/80 max-w-[260px] text-center md:text-left">
              Een plek waar gezelligheid, warmte en oprechte verbinding altijd op de eerste plaats komen.
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-cream-100/90 font-semibold">Blankenberge, Belgie</p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/cozymoments_blankenberge/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-champagne-500/45 bg-hotel-900/45 text-cream-200 hover:border-champagne-500 hover:text-champagne-500 hover:bg-champagne-500/10 transition-all duration-200"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/p/COZY-moments-61576070607157/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-champagne-500/45 bg-hotel-900/45 text-cream-200 hover:border-champagne-500 hover:text-champagne-500 hover:bg-champagne-500/10 transition-all duration-200"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div className="flex h-full flex-col items-center md:items-start xl:justify-center">
            <h4 className="font-semibold text-base text-cream-100 mb-5 tracking-[0.08em]">Navigatie</h4>
            <ul className="space-y-2.5 text-sm text-center md:text-left">
              {[
                { to: '/', label: 'Home' },
                { to: '/menu', label: 'Drankkaart' },
                { to: '/social', label: 'Social' },
                { to: '/info', label: 'Info' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-cream-200/80 hover:text-champagne-500 transition-all duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex h-full flex-col items-center md:items-start xl:justify-center">
            <h4 className="font-semibold text-base text-cream-100 mb-5 tracking-[0.08em]">Contact</h4>
            <ul className="space-y-3 text-sm text-center md:text-left">
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS_LINE_1 + ', ' + ADDRESS_LINE_2)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit mx-auto md:mx-0 items-start text-cream-200/80 hover:text-champagne-500 transition-all duration-200"
                >
                  <span className="text-center md:text-left">{ADDRESS_LINE_1}<br />{ADDRESS_LINE_2}</span>
                </a>
              </li>
              <li className="flex justify-center md:justify-start py-1">
                <img
                  src="/cozy_logo_wit.png"
                  alt="COZY Moments"
                  className="h-7 w-auto opacity-65"
                  loading="lazy"
                />
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE_CLEAN}`}
                  className="inline-flex w-fit mx-auto md:mx-0 items-center gap-2 text-cream-200/80 hover:text-champagne-500 transition-all duration-200"
                >
                  <Phone size={15} className="shrink-0" />
                  <span>{CONTACT_PHONE}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex w-fit mx-auto md:mx-0 items-center gap-2 text-cream-200/80 hover:text-champagne-500 transition-all duration-200"
                >
                  <Mail size={15} className="shrink-0" />
                  <span>{CONTACT_EMAIL}</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="flex h-full flex-col items-center md:items-start xl:justify-center">
            <h4 className="font-semibold text-base text-cream-100 mb-5 tracking-[0.08em]">Juridisch</h4>
            <dl className="space-y-4 text-sm w-full max-w-xs text-center md:text-left">
              <div className="flex flex-col">
                <dt className="mb-1 text-[11px] uppercase tracking-[0.16em] text-cream-200/55">Uitbater</dt>
                <dd className="text-cream-100/90 leading-relaxed">Janssens, Sixtine (eenmanszaak)</dd>
              </div>
              <div className="flex flex-col">
                <dt className="mb-1 text-[11px] uppercase tracking-[0.16em] text-cream-200/55">Ondernemingsnummer (BTW)</dt>
                <dd className="text-cream-100/90 leading-relaxed">BE1021.623.893</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="border-t border-champagne-500/25 pt-5 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-cream-200/60 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} COZY Moments - Janssens, Sixtine. Alle rechten voorbehouden.</p>
          <div className="flex items-center justify-center md:justify-end gap-4 flex-wrap">
            <Link to="/privacy" className="hover:text-champagne-500 transition-colors">Privacybeleid</Link>
            <span aria-hidden="true" className="text-cream-200/40">|</span>
            <Link to="/voorwaarden" className="hover:text-champagne-500 transition-colors">Algemene voorwaarden</Link>
            <span aria-hidden="true" className="text-cream-200/40">|</span>
            <a
              href="https://www.webaanzee.be"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-champagne-500 transition-colors"
            >
              Website door WebaanZee.be
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
