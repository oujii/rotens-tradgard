# Rotens Trädgård - Projektöverlämning (AI Handover)

Senast uppdaterad: 2026-02-15  
Projektrot: `/Users/carl/rotens`

## 1. Syfte och nuläge

Detta repo driver Rotens Trädgårds webbplats:

- Frontend: Next.js App Router (`frontend/`)
- CMS: Sanity Studio (`studio/`)
- Monorepo med npm workspaces, gemensam schema/typegen via `sanity.schema.json`

Projektet har gått från "template" mot ett verkligt varumärkesbygge med svensk copy, tjänster, kontaktflöde, events och butik.

## 2. Affärsidé och varumärkesfilosofi

### Kärnposition

Rotens Trädgård är en handelsträdgård i Bjursås (Dalarna) med historik sedan 1940-talet, med fokus på:

- Lokalt
- Härdigt
- Svenskodlat
- Hög kvalitet

### Filosofi

Affären är inte bara "sälj växter", utan en levande mötesplats där:

- trädgård
- konst
- kultur

förenas för att skapa välmående, inspiration och lokal förankring.

### Kundlöfte

- Personlig rådgivning
- Kunskapsdelning
- Hållbara val (minskat svinn/transporter, säsongsfokus)
- Familjär, välkomnande miljö

### Affärsområden (praktiskt)

- Handelsträdgård och växthus
- Sommarcafé/besöksmål
- Tjänster (rådgivning, beskärning/skötsel, binderi/floristik, workshops, fest/konferens)
- Webbutik/förbokning av produkter

## 3. Innehålls- och sidkarta (nuvarande)

### Kärnsidor

- `/` Startsida (hero, intro, handelsträdgårdstext, events, sortiment, öppettider)
- `/om-oss` Om oss (historia, vision, verksamhetsbeskrivning)
- `/tjanster` Tjänster (CMS-styrt med fallback i kod)
- `/butik` Webbutik/förbokning (produktlista från Sanity)
- `/kontakt` Kontaktformulär (skickar e-post via Resend)
- `/event/[slug]` Eventdetalj

### Övrigt/template-arv

- `/[slug]` Generisk CMS-sida via page builder
- `/posts/[slug]` Bloggposter
- `/sitemap.xml`

## 4. Vem äger vilket innehåll? (viktigt för nästa AI)

### CMS-styrt (Sanity)

- Site settings (titel, meta, hero-video, öppettider, kontaktinfo)
- **Vårt sortiment-kort på startsidan** (nytt, se sektion 8)
- Tjänstesida (singleton `servicesPage`)
- Events (`event`)
- Produkter (`product`)
- Page builder-sidor (`page`)
- Poster (`post`)

### Kodstyrt (hårdkodat i frontend)

- Delar av startsidans copy/sektioner (utöver settings-fält)
- Om oss-sidans huvudcopy
- Kontaktformulärets validering och kategorifält
- Navigationsstruktur/header/footer

## 5. Teknikstack och arkitektur

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- `next-sanity` för data och live preview/draft mode

### CMS

- Sanity Studio v5
- Custom desk structure med singletons:
  - `settings` (documentId `siteSettings`)
  - `servicesPage` (documentId `servicesPage`)

### Dataflöde i korthet

- Queries i `frontend/sanity/lib/queries.ts`
- Fetch via `sanityFetch` från `frontend/sanity/lib/live.ts`
- Typegen till:
  - `frontend/sanity.types.ts`
  - `studio/sanity.types.ts`
- Schema snapshot:
  - `sanity.schema.json`

## 6. E-post och kontaktflöde

- Form: `/kontakt`
- API route: `frontend/app/api/contact/route.ts`
- Leverans: Resend (`resend` npm package)

### Miljövariabler som krävs för kontaktform

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

Notera: dessa ligger inte i nuvarande `.env.example` och bör dokumenteras/adderas framåt.

## 7. Kommandon (drift/utveckling)

Kör från projektrot:

- `npm run dev` - startar frontend + studio parallellt
- `npm run dev:next` - frontend
- `npm run dev:studio` - studio
- `npm run lint` - frontend lint
- `npm run type-check` - båda workspaces
- `npm run import-sample-data` - import av sampledata till Sanity

Frontend:

- `npm --workspace frontend run dev`
- `npm --workspace frontend run build`
- `npm --workspace frontend run sanity:typegen`

Studio:

- `npm --workspace studio run dev`
- `npm --workspace studio run build`
- `npm --workspace studio run sanity:typegen`

## 8. Nyligen genomfört (viktig förändring)

### 2026-02-15: "Vårt sortiment" blev CMS-styrt

Ny funktion: bilder/text/länkar för sortimentskorten på startsidan kan nu uppdateras i Sanity utan kodändring.

#### Schema

I `settings` finns nu array-fält:

- `assortmentItems` (max 4)
  - `title` (Rubrik)
  - `description` (Beskrivning)
  - `image` (Bild)
  - `link` (Länk-objekt)

Fil: `studio/src/schemaTypes/singletons/settings.tsx`

#### Query

`settingsQuery` hämtar nu:

- `assortmentItems[]`
- `imageUrl` (derived från image.asset->url)
- derefererad `link`

Fil: `frontend/sanity/lib/queries.ts`

#### Rendering

Startsidan renderar korten dynamiskt från `settings.assortmentItems`.  
Om inget finns i CMS används fallback-kort i kod, så sidan blir aldrig tom.

Fil: `frontend/app/page.tsx`

## 9. Brand copy och tonalitet (praktiskt för nästa AI)

När copy ändras, håll fast vid dessa ledord:

- varm men saklig
- jordnära
- lokal förankring i Dalarna/Bjursås
- hållbarhet utan "greenwashing-fluff"
- kunskap + personlig service

Undvik:

- generisk "AI-marknadsföring"
- överdrivet säljig ton
- engelska rubriker i svenska kundytor

## 10. Kända risker / teknisk skuld

- Delar av viktig copy är fortfarande hårdkodad (särskilt `/om-oss` och stora block på `/`).
- Kontaktkategorier är kodade i frontend; om tjänstekort ändras i CMS kan namngivning glida isär.
- Mobilmeny i header är placeholder (knapp finns, ingen menylogik).
- `sitemap.ts` använder `host` direkt (saknar protokollhantering), kan ge svag URL-kvalitet.
- Byggvarning om flera lockfiles (`/Users/carl/package-lock.json` och repo-lockfile). Ej blockerande men bör städas.

## 11. Rekommenderad nästa etapp (prioritet)

1. Flytta mer startsidecopy till CMS (hero-undertext, handelsträdgårdsblock, CTA-labels).  
2. Flytta Om oss-copy till singleton i Sanity.  
3. Lägg till saknade env-variabler i `.env.example` för kontaktmail.  
4. Implementera fungerande mobilmeny i header.  
5. Härda sitemap URL-bygge med `https://` + canonical host.

## 12. Snabb onboarding för ny AI-kodare

1. Läs `AGENTS.md` i repo root först.  
2. Kör `npm run dev` och verifiera:
   - frontend på `:3000`
   - studio på `:3333`  
3. Öppna Sanity `Site Settings` och kontrollera:
   - `assortmentItems`
   - `openingHours`
   - `contactInfo`  
4. Kör `npm --workspace frontend run build` innan push.

## 13. Filreferenser (viktigaste)

- Root scripts: `package.json`
- Frontend startsida: `frontend/app/page.tsx`
- Om oss: `frontend/app/om-oss/page.tsx`
- Tjänster: `frontend/app/tjanster/page.tsx`
- Kontakt route: `frontend/app/api/contact/route.ts`
- Sanity queries: `frontend/sanity/lib/queries.ts`
- Site settings schema: `studio/src/schemaTypes/singletons/settings.tsx`
- Studio structure/singletons: `studio/src/structure/index.ts`

