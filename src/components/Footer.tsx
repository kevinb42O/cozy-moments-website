import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_CLEAN, ADDRESS_LINE_1, ADDRESS_LINE_2 } from '../constants';

const Footer = () => {
  return (
    <footer className="bg-coffee-900 text-latte-200">
      <div className="h-px bg-linear-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-14 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="inline-flex flex-col items-end leading-none">
              <span className="font-rounded font-extrabold text-4xl text-latte-100 tracking-tight">COZY</span>
              <span className="font-script text-2xl text-latte-200 -mt-2 mr-1">Moments</span>
            </div>
            <p className="text-sm leading-relaxed opacity-70 max-w-[260px] text-center md:text-left">
              Een plek waar gezelligheid, warmte en oprechte verbinding altijd op de eerste plaats komen.
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-latte-100/90 font-semibold">Blankenberge, Belgie</p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/cozymoments_blankenberge/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-latte-200 hover:border-gold-500 hover:text-gold-500 transition-all duration-200"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/p/COZY-moments-61576070607157/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-latte-200 hover:border-gold-500 hover:text-gold-500 transition-all duration-200"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-base text-latte-100 mb-5 tracking-wide">Navigatie</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/menu', label: 'Drankkaart' },
                { to: '/inspiration', label: 'Inspiratie' },
                { to: '/about', label: 'Over Ons' },
                { to: '/info', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="opacity-70 hover:opacity-100 hover:text-gold-500 transition-all duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-base text-latte-100 mb-5 tracking-wide">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS_LINE_1 + ', ' + ADDRESS_LINE_2)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 opacity-70 hover:opacity-100 hover:text-gold-500 transition-all duration-200"
                >
                  <MapPin size={15} className="mt-0.5 shrink-0" />
                  <span>{ADDRESS_LINE_1}<br />{ADDRESS_LINE_2}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE_CLEAN}`}
                  className="flex items-center gap-2.5 opacity-70 hover:opacity-100 hover:text-gold-500 transition-all duration-200"
                >
                  <Phone size={15} className="shrink-0" />
                  <span>{CONTACT_PHONE}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-2.5 opacity-70 hover:opacity-100 hover:text-gold-500 transition-all duration-200"
                >
                  <Mail size={15} className="shrink-0" />
                  <span>{CONTACT_EMAIL}</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-base text-latte-100 mb-5 tracking-wide">Juridisch</h4>
            <dl className="space-y-4 text-sm w-full max-w-xs text-left">
              <div className="flex flex-col">
                <dt className="mb-1 text-[11px] uppercase tracking-[0.16em] text-latte-200/55">Uitbater</dt>
                <dd className="text-latte-100/90 leading-relaxed">Janssens, Sixtine (eenmanszaak)</dd>
              </div>
              <div className="flex flex-col">
                <dt className="mb-1 text-[11px] uppercase tracking-[0.16em] text-latte-200/55">Ondernemingsnummer (BTW)</dt>
                <dd className="font-mono text-latte-100/90 leading-relaxed">BE1021.623.893</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="border-t border-white/8 pt-5 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-latte-200/55">
          <p>&copy; {new Date().getFullYear()} COZY Moments - Janssens, Sixtine. Alle rechten voorbehouden.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-gold-500 transition-colors">Privacybeleid</Link>
            <span aria-hidden="true" className="text-latte-200/45">|</span>
            <Link to="/voorwaarden" className="hover:text-gold-500 transition-colors">Algemene voorwaarden</Link>
            <span aria-hidden="true" className="text-latte-200/45">|</span>
            <a
              href="https://www.webaanzee.be"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-500 transition-colors"
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
