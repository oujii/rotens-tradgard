# Projekt: Rotens Trädgård (Sanity + Next.js)

## Övergripande Vision
En modern, personlig och estetiskt tilltalande hemsida för en handelsträdgård i Bjursås, Dalarna. Fokus ligger på en "familjär mötesplats" där trädgård, konst och kultur möts. Designen är inspirerad av Rosendals Trädgård och Mora Trädgård med en organisk färgpalett (mörkgrön, salvia, creme) och klassisk typografi (Playfair Display).

## Teknisk Stack
- **Framework:** Next.js 15+ (App Router)
- **CSS:** Tailwind CSS v4 (med CSS-variabler i `globals.css`)
- **CMS:** Sanity Studio v3 (Headless)
- **Datafetching:** Sanity Live Content (för realtidsuppdateringar)
- **Komponenter:** React Server Components (RSC) som standard, Client Components för formulärlogik.

## Menystruktur & Navigering
- **BUTIK** (`/butik`): Förbokning av växter inför våren och direktköp via Stripe Payment Links.
- **PÅ GÅNG** (`/#events`): Ankarlänk till startsidans eventsektion.
- **VI HJÄLPER DIG** (`/tjanster`): Tjänster på beställning (Binderier, Beskärning, Rådgivning).
- **BESÖK OSS** (`/besok-oss`): Historia (Om oss), Kafé-info, Öppettider och Hitta hit.
- **KONTAKT** (`/kontakt`): Dynamiskt kontaktformulär (Action-knapp i menyn).

## Implementerade Funktioner

### 1. Hybrid-modell för Events
- **Logik:** Renderar olika knappar baserat på `bookingUrl` i Sanity.
  - Innehåller `stripe.com` -> "KÖP BILJETT"
  - Innehåller länk (ej Stripe) -> "BOKA PLATS"
  - Tom länk -> "Fri entré / Drop-in"
- **Detaljsidor:** Varje event har en egen slug-baserad sida (`/event/[slug]`) med full beskrivning och bild.

### 2. Dynamiskt Kontaktformulär
- Placerat på `/kontakt`.
- Tar emot query-parameters (t.ex. `?val=beskarning`) för att förvälja kategori.
- **Villkorliga fält:** Visar Adress-fält för hembesök och Datum-fält för binderier.
- Förberett för integration med mailtjänst (t.ex. Resend).

### 3. Anslagstavlan (Just nu)
- En sektion direkt under Heron för korta, globala notiser.
- Styrs centralt från **Site Settings** i Sanity.
- Design: 🌱 [AKTUELLT] Etikett med punktseparerade notiser.

### 4. Direct Checkout (Webshop)
- Ingen varukorg. Varje produkt länkar direkt till en Stripe Payment Link.
- Stöd för "Förbokning" med etiketten "Leverans i vår" via en boolean i Sanity.

## Designmanual (Tailwind v4)
- **Brand Dark:** `#344E41` (Används för Hero, Footer, Knappar)
- **Brand Light:** `#588157` (Accenter)
- **Accent Pop:** `#DAD7CD` (Ljus text mot mörk bakgrund)
- **Fonts:** 
  - Serif: `Playfair Display` (Rubriker)
  - Sans: `Inter` (Brödtext)

## Analys för framtiden
- **Styrkor:** Sidan är extremt lättmanövrerad för både besökare och admin. Den "manuella" integrationen av Stripe och Cal.com gör systemet robust och billigt att drifta.
- **Skalbarhet:** Om behovet av e-handel växer kan Stripe-integrationen enkelt byggas ut till en full varukorg.
- **SEO:** Genom att använda `/event/[slug]` och `/besok-oss` istället för en single-page-app har vi optimerat för lokala sökningar i Dalarna/Bjursås.

---
*Dokumentet uppdaterat: 2024-05-23 av Gemini*
