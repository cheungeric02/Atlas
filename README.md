# Atlas

A multi-destination travel planner — movement between places is first-class, not an afterthought.

**Live:** https://cheungeric02.github.io/Atlas

## Features

- **Day-by-day itinerary** with drag-and-drop (works on touch + mouse) — reorder items *or* swap whole days
- **Named, color-coded days** and a jump-to-day summary rail
- **Destination legs**, hotel stays, and a **Bookings** tab that flags any night missing a hotel
- **Interactive map** — geocoded pins colored and numbered by day, per-day route lines, hotel markers, and a day filter
- **Per-day weather** — forecast highs/lows and rain chance on each upcoming day (Open-Meteo, no API key)
- **Photo memories** — attach photos to any day; a memory strip appears under it (offline-first, group-synced, canvas-compressed)
- **Travel documents** — store boarding passes, hotel confirmations, passports and insurance in the Bookings tab (kept on-device and synced to the group)
- **Comments on items**, manual flight details (flight # + confirmation), reservation countdowns and reminders
- **Smart dates** — move the whole trip and the plan shifts with it; add days and they arrive empty; trim days and anything on them drops safely to the Wishlist (never deleted)
- **Live collaboration** — anyone with the link sees the same trips and edits them together in real time; a "Live" badge shows sync status
- **Money** — expenses, per-category budgets, cost-split settle-up, and a currency converter / cheat sheet
- **Prep** — packing list, travel party, printable itinerary + pocket day-cards
- **Installable PWA** — add to home screen; works offline via a service worker (app shell + fonts cached)
- Light/dark themes, foldable/desktop responsive

## Tech

Single self-contained `index.html` — no build step. Fonts from Google Fonts; Firebase Realtime Database (loaded from CDN) powers live shared sync, with `localStorage` as the offline cache. Media (photos + documents) is stored offline-first in IndexedDB and synced through a separate `atlas/media` Firebase path so the main trip data stays small. A service worker (`sw.js`) plus web app manifest make it installable and offline-capable. Weather uses the keyless Open-Meteo forecast + geocoding APIs; the map geocodes place names on demand. Open collaboration: no login — anyone with the link can view and edit.
