# COZY Moments Website

Moderne React/Vite-website voor COZY Moments in Blankenberge.

## Over dit project

Deze repository bevat de publieke website van COZY Moments, met onder andere:

- meertalige, snelle single-page ervaring met client-side routing
- pagina's voor menu, inspiratie, info, loyalty, privacy en voorwaarden
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
```

Opmerking: Supabase is optioneel. Als deze variabelen leeg blijven, draait de site nog steeds, maar zonder Supabase-functionaliteit.

3. Start de development server:

```bash
npm run dev
```

De app draait standaard op `http://localhost:3000`.

## Beschikbare scripts

- `npm run dev` Start Vite dev server op poort 3000 en host `0.0.0.0`
- `npm run build` Bouwt de productieversie naar `dist/`
- `npm run preview` Serveert de productiebuild lokaal
- `npm run lint` TypeScript typecheck zonder output
- `npm run clean` Verwijdert de buildmap `dist/`

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
