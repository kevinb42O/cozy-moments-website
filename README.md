# COZY Moments Website

Moderne React/Vite-website voor COZY Moments in Blankenberge.

## Over dit project

Deze repository bevat de publieke website van COZY Moments, met onder andere:

- meertalige, snelle single-page ervaring met client-side routing
- pagina's voor menu, social, info, loyalty, privacy en voorwaarden
- PWA-ondersteuning (service worker + web app manifest)
- integratie met Supabase (optioneel, via environment variables)

## Tech stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- React Router 7
- Framer Motion (`motion`)
- `vite-plugin-pwa`
- Supabase JS

## Vereisten

- Node.js 20 of nieuwer
- npm 10 of nieuwer

## Snel starten

1. Installeer dependencies:

```bash
npm install
```

2. Maak een `.env.local` bestand aan in de projectroot:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
INSTAGRAM_USERNAME=
INSTAGRAM_SESSIONID=
INSTAGRAM_CSRFTOKEN=
INSTAGRAM_DS_USER_ID=
INSTAGRAM_IG_DID=
INSTAGRAM_DATR=
INSTAGRAM_MID=
INSTAGRAM_RUR=
INSTAGRAM_COOKIE_HEADER=
INSTAGRAM_POST_LIMIT=12
INSTAGRAM_DOWNLOAD_MEDIA=true
```

Opmerking: Supabase is optioneel. Als deze variabelen leeg blijven, draait de site nog steeds, maar zonder Supabase-functionaliteit.

Instagram-opmerking: `INSTAGRAM_USERNAME` is nodig om recente posts op te halen. `INSTAGRAM_SESSIONID` is optioneel maar helpt als Instagram extra authenticatie vraagt. `INSTAGRAM_POST_LIMIT` is optioneel (standaard 12, max 500). `INSTAGRAM_DOWNLOAD_MEDIA` is optioneel (standaard `true`) en slaat beelden lokaal op in `public/instagram`.

3. Start de development server:

```bash
npm run dev
```

De app draait standaard op `http://localhost:3000`.

## Beschikbare scripts

- `npm run dev` Start Vite dev server op poort 3000 en host `0.0.0.0`
- `npm run scrape:instagram` Haalt recente Instagram posts op en schrijft genormaliseerde data naar `src/data/instagramPosts.ts`
- `npm run scrape:instagram:debug` Zelfde als hierboven, met extra debug snapshot in `src/data/instagramRawSnapshot.json`
- `npm run build` Draait eerst de Instagram scraper en bouwt daarna de productieversie naar `dist/`
- `npm run preview` Serveert de productiebuild lokaal
- `npm run lint` TypeScript typecheck zonder output
- `npm run clean` Verwijdert de buildmap `dist/`

## Instagram scraper workflow

1. Vul minstens `INSTAGRAM_USERNAME` in `.env.local` in.
2. Draai lokaal:

```bash
INSTAGRAM_USERNAME=cozymoments_blankenberge npm run scrape:instagram
```

3. Controleer output:

- `src/data/instagramPosts.ts` bevat de genormaliseerde feed (`id`, `shortcode`, `permalink`, `caption`, `timestamp`, `mediaType`, `thumbnailUrl`, `mediaUrl`).
- `src/data/instagramRawSnapshot.json` bevat ruwe payload voor troubleshooting.
- `public/instagram` bevat lokaal gedownloade beelden die in de carousel gebruikt worden.

De scraper probeert meerdere endpoint-strategieen met retries en exponential backoff. Als scraping faalt maar er bestaat al een eerdere `src/data/instagramPosts.ts`, dan blijft die laatste succesvolle dataset behouden zodat de build kan doorgaan.

## Fouten en rate limits

- HTTP 429/5xx of timeout: de scraper retryt automatisch met exponential backoff.
- Geen data of endpointwijziging bij Instagram: run `npm run scrape:instagram:debug` en inspecteer `src/data/instagramRawSnapshot.json`.
- Auth wall: voeg `INSTAGRAM_SESSIONID` toe in `.env.local` en probeer opnieuw.
- Als er nog geen eerdere dataset bestaat en scraping faalt, stopt het buildproces met een duidelijke foutmelding.

## Productie build

```bash
npm run build
npm run preview
```

## Deploy

### Vercel

Deze repo bevat een `vercel.json` met rewrite-regel zodat client-side routes (zoals `/menu` of `/info`) correct naar `index.html` gaan.

Aanbevolen instellingen op Vercel:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## PWA

De PWA-configuratie staat in `vite.config.ts` via `vite-plugin-pwa`:

- automatische service worker updates
- manifest met app icons en branding
- caching van statische assets via Workbox

## Projectstructuur

```text
src/
   components/      Herbruikbare UI-secties
   pages/           Route-pagina's
   lib/             Externe clients (o.a. Supabase)
   types/           Type-definities
   constants.ts     Contact- en domeinconstanten
   App.tsx          Router + page transitions
   main.tsx         App entrypoint + SW registratie
public/
   icons/           Favicons en PWA-icons
```

## Domein en contact

- Website: https://cozy-moments.be
- E-mail: info@cozy-moments.be
- Telefoon: 050 73 16 16

## Licentie

Interne projectcode voor COZY Moments. Geen publieke licentie gespecificeerd.
