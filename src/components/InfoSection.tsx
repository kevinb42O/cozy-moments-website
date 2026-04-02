import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_CLEAN, ADDRESS_LINE_1, ADDRESS_LINE_2, OPENING_HOURS, OPENING_HOURS_NOTE } from '../constants';
import CustomStyledMap from './CustomStyledMap';

const InfoSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <span className="text-gold-500 font-sans font-bold uppercase tracking-widest text-sm">Bezoek Ons</span>
              <h2 className="text-4xl md:text-5xl font-rounded font-extrabold text-coffee-900 mt-2 mb-6 tracking-tight">
                Locatie & Contact
              </h2>
              <p className="text-coffee-700 leading-relaxed font-sans">
                Gelegen in het hart van Blankenberge, vlakbij de Grote Markt. 
                De perfecte stop tijdens een dagje uit of voor een gezellige avond.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-latte-100 rounded-xl text-coffee-800">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-rounded font-bold text-lg text-coffee-900">Adres</h4>
                  <p className="text-coffee-700 font-sans">{ADDRESS_LINE_1}<br />{ADDRESS_LINE_2}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-latte-100 rounded-xl text-coffee-800">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-rounded font-bold text-lg text-coffee-900">Telefoon</h4>
                  <a href={`tel:${CONTACT_PHONE_CLEAN}`} className="text-coffee-700 hover:text-gold-500 transition-colors font-sans font-medium">
                    {CONTACT_PHONE}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-latte-100 rounded-xl text-coffee-800">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-rounded font-bold text-lg text-coffee-900">E-mail</h4>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-coffee-700 hover:text-gold-500 transition-colors font-sans font-medium">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-latte-100 rounded-xl text-coffee-800">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-rounded font-bold text-lg text-coffee-900">Openingsuren</h4>
                  <div className="text-coffee-700 space-y-1 font-sans mt-1">
                    {OPENING_HOURS.map(({ label, hours }) => (
                      <div key={label} className="flex justify-between w-full max-w-52 gap-4">
                        <span className="font-medium">{label}</span>
                        <span className={hours ? '' : 'opacity-50 italic'}>
                          {hours ?? 'Gesloten'}
                        </span>
                      </div>
                    ))}
                    <p className="text-sm opacity-60 italic pt-2">{OPENING_HOURS_NOTE}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-100 lg:h-auto rounded-3xl overflow-visible relative">
            <CustomStyledMap variant="homepage" className="absolute inset-0 transition-all duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
