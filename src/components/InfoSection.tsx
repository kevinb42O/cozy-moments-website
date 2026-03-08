import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_CLEAN, ADDRESS_LINE_1, ADDRESS_LINE_2 } from '../constants';

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
                  <div className="text-coffee-700 space-y-1 font-sans">
                    <div className="flex justify-between w-full max-w-50">
                      <span className="font-medium">Maandag:</span>
                      <span>10:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between w-full max-w-50">
                      <span className="font-medium">Di - Wo:</span>
                      <span>Gesloten</span>
                    </div>
                    <div className="flex justify-between w-full max-w-50">
                      <span className="font-medium">Do - Za:</span>
                      <span>10:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between w-full max-w-50">
                      <span className="font-medium">Zondag:</span>
                      <span>12:00 - 22:00</span>
                    </div>
                    <p className="text-sm opacity-60 italic pt-2">Openingsuren kunnen variëren op feestdagen.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-100 lg:h-auto bg-latte-200 rounded-3xl overflow-hidden shadow-lg relative border-4 border-white">
            <iframe
              title="COZY Moments locatie op Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.5!2d3.1322!3d51.3133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c4aa0b5a5a5a5b%3A0x4b4b4b4b4b4b4b4b!2sGrote%20Markt%2C%208370%20Blankenberge!5e0!3m2!1snl!2sbe!4v1709900000000!5m2!1snl!2sbe"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
