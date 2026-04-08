# eestec.pl — strona EESTEC AGH Kraków

Statyczna witryna marketingowa zbudowana w **Next.js 15** (App Router), dwujęzyczna (PL / EN), z sekcjami: wstęp (karuzela), o nas, nadchodzące wydarzenia, główne wydarzenia, partnerzy i stopka. Treść witryny **nie pochodzi z bazy ani panelu CMS** — edytuje się ją w **plikach JSON** w repozytorium; po zmianach budujesz i wdrażasz aplikację (np. AWS Amplify).

## Wymagania

- Node.js **≥ 20**

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Podgląd: [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # produkcyjny build
npm run start   # serwer po buildzie
```

## Edycja treści na stronie

### Gdzie są dane

| Plik | Opis |
|------|------|
| `content/site.pl.json` | Pełna treść **po polsku** |
| `content/site.en.json` | Pełna treść **po angielsku** |

Struktura obu plików jest taka sama. Typy pól są opisane w kodzie: `src/content/site.ts` (wygodna podpowiedź w edytorze, jeśli używasz TypeScript).

### Sekcje w JSON

- **`hero`** — mała etykieta (`eyebrow`), tytuł, opis, przycisk (`ctaLabel`, `ctaHref` — np. `#o-nas`), tablica **`slides`** z polami `imageUrl` (adres zdjęcia tła slajdu).
- **`about`** — sekcja „O nas”: `eyebrow`, `title`, `lead`, `imageUrl`.
- **`events`** — slider wydarzeń: nagłówki `eyebrow`, `title`, tablica **`items`**. Każde wydarzenie: `title`, `dateIso` (format `RRRR-MM-DD`), `dateLabel` (tekst dla ludzi), `description`, `imageUrl`.
- **`featuredEvents`** — „Główne wydarzenia” (kafelki): `eyebrow`, `title`, **`items`** z `title`, `description`, `imageUrl`.
- **`partners`** — nagłówki sekcji partnerów: `eyebrow`, `title` (same logotypy są w komponencie `PartnersSection` i plikach w `public/partners/`).
- **`board`** — **Zarząd** (nad stopką): `eyebrow`, `title`, opcjonalnie `intro`, tablica **`members`**: `name` (imię i nazwisko), `role` (funkcja), **`imageUrl`** (zdjęcie, np. `https://…` lub `/ścieżka/w/public`), opcjonalnie `email` / `link`. Układ: **5 kafelków w jednym rzędzie** od szerokości `lg`; na węższych ekranach 2–3 kolumny.
- **`footer`** — `label`, `copyright`, **`social`**: `instagram`, `facebook`, `linkedin` (pełne URL).

### Obrazy

- **Z internetu:** wpisz pełny adres `https://…` w `imageUrl`.
- **Z projektu:** umieść plik np. w `public/uploads/events/nazwa.webp` i w JSON podaj **`/uploads/events/nazwa.webp`** (ścieżka od roota witryny).

### Dwujęzyczność

Język przełącza użytkownik na stronie. Musisz utrzymać **spójność ręcznie**: te same sekcje w obu plikach; liczba elementów w `events.items` i `featuredEvents.items` warto **zachować taką samą** w PL i EN, żeby układ był przewidywalny.

### Ważne przy edycji

1. Zachowaj **poprawny JSON** (przecinki, cudzysłowy) — zepsuty plik spowoduje błąd przy buildzie. **Komentarzy `//` i `/* */` nie wstawiaj** — standardowy JSON ich nie obsługuje (`JSON.parse` się wywali). Żeby „wyłączyć” wpis, usuń cały obiekt z tablicy albo zachowaj go bez zmian.
2. Po zmianach: **`npm run build`** lokalnie przed commitem, żeby upewnić się, że wszystko się kompiluje.
3. Na hostingu treść jest wczytywana **w czasie builda** strony głównej — po edycji JSON trzeba **ponownie zbudować / wdrożyć** aplikację.

## Struktura przydatna przy zmianach w kodzie

- `src/app/page.tsx` — strona główna, ładuje oba JSON-y.
- `src/lib/getSiteContent.ts` — odczyt plików z `content/`.
- `src/components/` — sekcje UI (Hero, wydarzenia, nawigacja itd.).

## Deploy (AWS Amplify)

Konfiguracja builda: **`amplify.yml`** (standardowo `npm ci` + `npm run build`). Do samej treści z JSON **nie są potrzebne** zmienne środowiskowe — wystarczy repozytorium z aktualnymi plikami w `content/`.

---

Szczegóły frameworka: [dokumentacja Next.js](https://nextjs.org/docs).
