import { motion } from 'motion/react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { CONTACT_EMAIL, ADDRESS_LINE_1, ADDRESS_LINE_2 } from '../constants';

const Privacy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SEO
        title="Privacybeleid | COZY Moments Blankenberge"
        description="Lees het privacybeleid van COZY Moments. Hoe wij omgaan met jouw persoonsgegevens."
        canonical="https://www.cozy-moments.be/privacy"
      />
      <PageHero
        title="Privacybeleid"
        subtitle="Transparantie"
        description="Hoe COZY Moments omgaat met jouw gegevens."
        imageSrc="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-24 bg-white relative z-20 -mt-20 rounded-t-[3rem]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none font-sans text-coffee-700 space-y-10">

            <div>
              <p className="text-sm text-coffee-400 uppercase tracking-widest font-bold mb-1">Laatst bijgewerkt</p>
              <p className="text-coffee-700">8 maart 2026</p>
            </div>

            <div>
              <h2 className="font-rounded font-extrabold text-2xl text-coffee-900 mb-3">1. Verantwoordelijke</h2>
              <p>
                De verwerkingsverantwoordelijke voor jouw persoonsgegevens is:
              </p>
              <div className="mt-3 pl-4 border-l-4 border-gold-500 space-y-1 text-coffee-800">
                <p className="font-semibold">COZY Moments</p>
                <p>{ADDRESS_LINE_1}</p>
                <p>{ADDRESS_LINE_2}</p>
                <p>
                  E-mail:{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold-600 hover:text-gold-700 underline underline-offset-2">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-rounded font-extrabold text-2xl text-coffee-900 mb-3">2. Welke gegevens verzamelen wij?</h2>
              <p>Wij verzamelen alleen gegevens die je zelf aan ons verstrekt, namelijk:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Je naam en e-mailadres bij het aanmaken van een digitale klantenkaart.</li>
                <li>Contactgegevens die je invult wanneer je ons een e-mail stuurt.</li>
              </ul>
              <p className="mt-3">
                Wij plaatsen geen cookies en gebruiken geen tracking- of analysesoftware op deze website.
              </p>
            </div>

            <div>
              <h2 className="font-rounded font-extrabold text-2xl text-coffee-900 mb-3">3. Waarvoor gebruiken wij jouw gegevens?</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Het beheren van jouw digitale klantenkaart (spaarpunten bijhouden).</li>
                <li>Het beantwoorden van vragen die je per e-mail of telefoon stelt.</li>
              </ul>
              <p className="mt-3">
                Wij verkopen, verhuren of delen jouw gegevens <strong className="text-coffee-900">nooit</strong> met derden voor commerciële doeleinden.
              </p>
            </div>

            <div>
              <h2 className="font-rounded font-extrabold text-2xl text-coffee-900 mb-3">4. Hoe lang bewaren wij jouw gegevens?</h2>
              <p>
                Wij bewaren jouw gegevens niet langer dan noodzakelijk. Gegevens van de klantenkaart worden bewaard zolang je actief klant bent. Bij inactiviteit van meer dan 2 jaar worden je gegevens verwijderd, tenzij wettelijke verplichtingen anders vereisen.
              </p>
            </div>

            <div>
              <h2 className="font-rounded font-extrabold text-2xl text-coffee-900 mb-3">5. Jouw rechten</h2>
              <p>Op grond van de Algemene Verordening Gegevensbescherming (AVG / GDPR) heb je de volgende rechten:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong className="text-coffee-900">Recht op inzage</strong> — je kunt opvragen welke gegevens wij van jou bewaren.</li>
                <li><strong className="text-coffee-900">Recht op correctie</strong> — je kunt onjuiste gegevens laten aanpassen.</li>
                <li><strong className="text-coffee-900">Recht op verwijdering</strong> — je kunt vragen jouw gegevens te verwijderen.</li>
                <li><strong className="text-coffee-900">Recht op beperking</strong> — je kunt de verwerking van jouw gegevens laten beperken.</li>
                <li><strong className="text-coffee-900">Recht op bezwaar</strong> — je kunt bezwaar maken tegen de verwerking van jouw gegevens.</li>
              </ul>
              <p className="mt-3">
                Stuur een e-mail naar{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold-600 hover:text-gold-700 underline underline-offset-2">
                  {CONTACT_EMAIL}
                </a>{' '}
                om een verzoek in te dienen. Wij reageren binnen 30 dagen.
              </p>
            </div>

            <div>
              <h2 className="font-rounded font-extrabold text-2xl text-coffee-900 mb-3">6. Klacht indienen</h2>
              <p>
                Als je van mening bent dat wij jouw gegevens niet correct verwerken, heb je het recht een klacht in te dienen bij de Belgische toezichthoudende autoriteit:
              </p>
              <div className="mt-3 pl-4 border-l-4 border-latte-200 space-y-1">
                <p className="font-semibold text-coffee-800">Gegevensbeschermingsautoriteit (GBA)</p>
                <a
                  href="https://www.gegevensbeschermingsautoriteit.be"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-600 hover:text-gold-700 underline underline-offset-2"
                >
                  www.gegevensbeschermingsautoriteit.be
                </a>
              </div>
            </div>

            <div>
              <h2 className="font-rounded font-extrabold text-2xl text-coffee-900 mb-3">7. Beveiliging</h2>
              <p>
                Wij nemen passende technische en organisatorische maatregelen om jouw persoonsgegevens te beschermen tegen onrechtmatige verwerking, verlies of onbevoegde toegang.
              </p>
            </div>

            <div>
              <h2 className="font-rounded font-extrabold text-2xl text-coffee-900 mb-3">8. Wijzigingen</h2>
              <p>
                Wij kunnen dit privacybeleid van tijd tot tijd aanpassen. De meest actuele versie vind je altijd op deze pagina.
              </p>
            </div>

          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Privacy;
