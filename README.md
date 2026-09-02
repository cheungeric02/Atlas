# Atlas

A multi-destination travel planner — movement between places is first-class, not an afterthought.

**Live:** https://cheungeric02.github.io/Atlas

## Features

- **Day-by-day itinerary** with drag-and-drop (works on touch + mouse) — reorder items *or* swap whole days
- **Named, color-coded days** and a jump-to-day summary rail
- **Destination legs**, hotel stays, and a **Bookings** tab that flags any night missing a hotel
- **Smart dates** — move the whole trip and the plan shifts with it; add days and they arrive empty; trim days and anything on them drops safely to the Wishlist (never deleted)
- **Live collaboration** — anyone with the link sees the same trips and edits them together in real time; a "Live" badge shows sync status
- **Money** — expenses, per-category budgets, cost-split settle-up, and a currency cheat sheet
- **Prep** — packing list, travel party, printable itinerary + pocket day-cards
- Light/dark themes, foldable/desktop responsive

## Tech

Single self-contained `index.html` — no build step. Fonts from Google Fonts; Firebase Realtime Database (loaded from CDN) powers live shared sync, with `localStorage` as the offline cache. Open collaboration: no login — anyone with the link can view and edit.

Phase 2 (planned): installable PWA/offline, interactive map, optional view-only / edit-key access.
