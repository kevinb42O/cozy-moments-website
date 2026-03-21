import { motion } from 'motion/react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { CONTACT_EMAIL, ADDRESS_LINE_1, ADDRESS_LINE_2 } from '../constants';

const Terms = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SEO
        title="Algemene Voorwaarden | COZY Moments Blankenberge"
        description="Lees de algemene voorwaarden voor het gebruik van de website en diensten van COZY Moments in Blankenberge."
        canonical="https://www.cozy-moments.be/voorwaarden"
      />
      <PageHero
        title="Algemene Voorwaarden"
        subtitle="Duidelijke Afspraken"
        description="Deze voorwaarden gelden voor het gebruik van onze website en onze dienstverlening in de zaak."
        imageSrc="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-24 bg-white relative z-20 -mt-20 rounded-t-[3rem]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none font-sans text-coffee-700 space-y-10">
            <div>
              <p className="text-sm text-coffee-400 uppercase tracking-widest font-bold mb-1">Laatst bijgewerkt</p>
              <p className="text-coffee-700">20 maart 2026</p>
            </div>

            <div>
              <h2 className="font-rounded font-extrabold text-2xl text-coffee-900 mb-3">1. Identiteit van de uitbater</h2>
              <p>Deze website en de diensten van COZY Moments worden uitgebaat door:</p>
              <div className="mt-3 pl-4 border-l-4 border-gold-500 space-y-1 text-coffee-800">
                <p className="font-semibold">COZY Moments</p>
                <p>Janssens, Sixtine (eenmanszaak)</p>
                <p>{ADDRESS_LINE_1}</p>
                <p>{ADDRESS_LINE_2}</p>
                <p>BTW: BE1021.623.893</p>
                <p>
                  E-mail:{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold-600 hover:text-gold-700 underline underline-offset-2">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-rounded font-extrabold text-2xl text-coffee-900 mb-3">2. Toepassingsgebied</h2>
              <p>
                Deze algemene voorwaarden zijn van toepassing op elk bezoek aan en gebruik van de website van COZY Moments,
                en op de informatie over ons aanbod, onze openingsuren en onze digitale klantenkaart.
              </p>
            </div>

            <div>
              <h2 className="font-rounded font-extrabold text-2xl text-coffee-900 mb-3">3. Informatie op de website</h2>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Wij streven ernaar alle informatie op deze website correct en actueel te houden.</li>
                <li>Openingsuren, beschikbaarheid en aanbod kunnen wijzigen zonder voorafgaande aankondiging.</li>
                <li>Kennelijke fouten of vergissingen (zoals typefouten) binden COZY Moments niet.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-rounded font-extrabold text-2xl text-coffee-900 mb-3">4. Prijzen en aanbod</h2>
              <p>
                Vermelde prijzen en productinformatie op de website zijn indicatief. De prijzen en voorwaarden die in de zaak
                op het moment van bestelling worden meegedeeld, hebben steeds voorrang.
              </p>
            </div>

            <div>
              <h2 className="font-rounded font-extrabold text-2xl text-coffee-900 mb-3">5. Digitale klantenkaart</h2>
              <p>
                Voor de digitale klantenkaart gelden de voorwaarden die op de klantenkaartpagina en in de app worden
                meegedeeld. Op dit moment betekent dit onder meer:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Een volle kaart (12 stempels) geeft recht op een gratis drankje volgens de op dat moment geldende actievoorwaarden.</li>
                <li>Bij een nieuwe registratie kan een welkomstbonus worden toegekend (momenteel 2 stempels).</li>
                <li>COZY Moments kan spaarsystemen of actievoorwaarden aanpassen, pauzeren of stopzetten.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-rounded font-extrabold text-2xl text-coffee-900 mb-3">6. Aansprakelijkheid</h2>
              <p>
                COZY Moments is niet aansprakelijk voor directe of indirecte schade die voortvloeit uit het gebruik van de
                website, behalve in geval van opzet, zware fout of wanneer aansprakelijkheid wettelijk niet kan worden uitgesloten.
              </p>
            </div>

            <div>
              <h2 className="font-rounded font-extrabold text-2xl text-coffee-900 mb-3">7. Intellectuele eigendom</h2>
              <p>
                Alle teksten, beelden, logo&apos;s en andere inhoud op deze website zijn eigendom van COZY Moments of worden
                gebruikt met toestemming. Het is niet toegestaan deze inhoud te kopieren, te verspreiden of commercieel te
                gebruiken zonder voorafgaande schriftelijke toestemming.
              </p>
            </div>

            <div>
              <h2 className="font-rounded font-extrabold text-2xl text-coffee-900 mb-3">8. Privacy</h2>
              <p>
                Voor de verwerking van persoonsgegevens verwijzen wij naar ons privacybeleid op deze website.
              </p>
            </div>

            <div>
              <h2 className="font-rounded font-extrabold text-2xl text-coffee-900 mb-3">9. Toepasselijk recht en bevoegde rechtbank</h2>
              <p>
                Op deze voorwaarden is het Belgisch recht van toepassing. Eventuele geschillen vallen onder de bevoegdheid van
                de rechtbanken van het gerechtelijk arrondissement van de uitbatingszetel, tenzij dwingend recht anders bepaalt.
              </p>
            </div>

            <div>
              <h2 className="font-rounded font-extrabold text-2xl text-coffee-900 mb-3">10. Contact</h2>
              <p>
                Vragen over deze algemene voorwaarden? Neem contact op via{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold-600 hover:text-gold-700 underline underline-offset-2">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Terms;