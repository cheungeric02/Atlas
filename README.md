# Atlas

A multi-destination travel planner — movement between places is first-class, not an afterthought.

**Live:** https://cheungeric02.github.io/Atlas

## Features

- **Day-by-day itinerary** with drag-and-drop (works on touch + mouse) — reorder items *or* swap whole days
- **Named, color-coded days** and a jump-to-day summary rail
- **Destination legs**, hotel stays, and a **Bookings** tab that flags any night missing a hotel
- **Smart dates** — move the whole trip and the plan shifts with it; add days and they arrive empty; trim days and anything on them drops safely to the Wishlist (never deleted)
- **Money** — expenses, per-category budgets, cost-split settle-up, and a currency cheat sheet
- **Prep** — packing list, travel party, printable itinerary + pocket day-cards
- Light/dark themes, foldable/desktop responsive, works offline (data stored locally in the browser)

## Tech

Single self-contained `index.html` — no build step, no dependencies (fonts from Google Fonts). State is saved to `localStorage`.

Phase 2 (planned): real-time sync + shared trips via Firebase, installable PWA, interactive map.
