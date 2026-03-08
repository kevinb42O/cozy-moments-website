import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_CLEAN, ADDRESS_LINE_1, ADDRESS_LINE_2 } from '../constants';

const Footer = () => {
  return (
    <footer className="bg-coffee-900 text-latte-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex flex-col items-end leading-none mx-auto md:mx-0">
              <span className="font-rounded font-extrabold text-4xl text-latte-100 tracking-tight">COZY</span>
              <span className="font-script text-2xl text-latte-200 -mt-2 mr-1">Moments</span>
            </div>
            <p className="text-sm leading-relaxed opacity-80 max-w-xs mx-auto md:mx-0 pt-2">
              Een plek waar gezelligheid, warmte en oprechte verbinding altijd op de eerste plaats komen.
            </p>
            <div className="flex justify-center md:justify-start gap-4 pt-2">
              <a href="https://www.instagram.com/cozymoments_blankenberge/" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/profile.php?id=61576070607157&locale=nl_NL" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-serif text-lg text-latte-100 mb-6">Navigatie</h4>
            <ul className="space-y-3 text-sm uppercase tracking-wider">
              <li><Link to="/" className="hover:text-gold-500 transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-gold-500 transition-colors">Drankkaart</Link></li>
              <li><Link to="/inspiration" className="hover:text-gold-500 transition-colors">Inspiratie</Link></li>
              <li><Link to="/about" className="hover:text-gold-500 transition-colors">Over Ons</Link></li>
              <li><Link to="/info" className="hover:text-gold-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right space-y-4">
            <h4 className="font-serif text-lg text-latte-100 mb-6">Contact</h4>
            <div className="flex flex-col items-center md:items-end gap-3 text-sm opacity-80">
              <a href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS_LINE_1 + ', ' + ADDRESS_LINE_2)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold-500 transition-colors">
                <span>{ADDRESS_LINE_1}, {ADDRESS_LINE_2}</span>
                <MapPin size={16} />
              </a>
              <a href={`tel:${CONTACT_PHONE_CLEAN}`} className="flex items-center gap-2 hover:text-gold-500 transition-colors">
                <span>{CONTACT_PHONE}</span>
                <Phone size={16} />
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 hover:text-gold-500 transition-colors">
                <span>{CONTACT_EMAIL}</span>
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-coffee-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} COZY Moments. All rights reserved.</p>
          <a 
            href="https://www.webaanzee.be" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center gap-1 hover:opacity-100 transition-opacity"
          >
            <span>Website realisatie door</span>
            <span className="font-bold">
              <span className="text-white">Web</span>
              <span className="text-amber-500">aan</span>
              <span className="text-white">Zee.be</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
