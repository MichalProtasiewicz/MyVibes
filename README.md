# MyVibes

Aplikacja webowa do wyszukiwania utworów, albumów i artystów w Spotify, z możliwością zapisywania ulubionych.
Zbudowana w React + TypeScript, z użyciem Vite, Material UI, Tailwind CSS i React Query.

---

## Demo

> LINK - TODO

---

## Funkcje

- **Wyszukiwanie** utworów, albumów i artystów w Spotify.
- **Przeglądanie szczegółów** utworu, albumu lub artysty.
- **Dodawanie do ulubionych** (przechowywane lokalnie w IndexedDB, działa offline).
- **Przeglądanie ulubionych** z podziałem na kategorie.
- **Infinite scroll** wyników wyszukiwania.
- **Responsywny interfejs** (Material UI + Tailwind CSS).

---

## Szybki start

### Instalacja zależności

```bash
npm install
# lub
yarn install
```

### Konfiguracja zmiennych środowiskowych

Utwórz plik `.env` w katalogu głównym i dodaj:

```
VITE_SPOTIFY_CLIENT_ID=twoj_client_id
VITE_SPOTIFY_CLIENT_SECRET=twoj_client_secret
```

> Klucze uzyskasz w [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).

### Uruchomienie aplikacji

```bash
npm run dev
# lub
yarn dev
```

Aplikacja będzie dostępna pod adresem: [http://localhost:5173](http://localhost:5173)

---

## Struktura projektu

- `src/pages` – główne strony (wyszukiwanie, szczegóły, ulubione)
- `src/components` – komponenty UI (karty, formularze, przyciski)
- `src/components/DetailsRenderer` – szczegóły utworu/albumu/artysty
- `src/hooks` – hooki do obsługi ulubionych i kontekstu
- `src/api` – komunikacja z API Spotify
- `src/types` – typy TypeScript dla danych Spotify
- `src/layout` – główny layout i nawigacja

---

## Najważniejsze technologie

- **React 19** (SPA)
- **TypeScript**
- **Vite** (dev/build)
- **Material UI** (komponenty)
- **Tailwind CSS** (utility classes)
- **React Query** (fetching, cache)
- **IndexedDB** (ulubione offline)
- **React Router v7** (routing)

---

## Użytkowanie

- Wyszukaj utwór, album lub artystę.
- Kliknij na kartę, aby zobaczyć szczegóły.
- Dodaj do ulubionych klikając serduszko.
- Przejdź do zakładki "Ulubione", aby zobaczyć zapisane elementy (działają offline).

---

## Skróty komend

| Komenda           | Opis                       |
|-------------------|----------------------------|
| `npm run dev`     | Uruchomienie dev servera   |
| `npm run build`   | Budowanie produkcyjne      |
| `npm run preview` | Podgląd produkcyjny        |
| `npm run lint`    | Lintowanie kodu            |
| `npm run format`  | Formatowanie kodu Prettier |
| `npm run test`    | Uruchomienie testów        |

---

## Wymagania

- Node.js 18+
- Konto Spotify Developer (do uzyskania kluczy API)

---

## Licencja

MIT
