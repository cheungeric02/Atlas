/* Atlas service worker — offline app shell + runtime font cache.
   Firebase realtime traffic is never intercepted, so live sync is unaffected. */
const CACHE = 'atlas-v4';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Never touch Firebase (SDK module + realtime socket/long-poll) — must go straight to network.
  if (/firebaseio\.com|firebasedatabase\.app|firebasejs|identitytoolkit|gstatic\.com\/firebasejs/.test(url.href)) return;

  // Navigations & the main document: network-first (fresh on deploy), fall back to cached shell offline.
  if (req.mode === 'navigate' || (url.origin === location.origin && url.pathname.endsWith('index.html'))) {
    // cache:'reload' bypasses the browser HTTP disk cache (GitHub Pages sets
    // max-age=600 on index.html), so an online refresh always gets the newest
    // deploy instead of a stale document that lingers for up to 10 minutes.
    e.respondWith(
      fetch(req.url, { cache: 'reload', credentials: 'same-origin' })
        .then(res => {
          // Only cache a genuinely good full document — never a 404/500 or an
          // opaque error page (e.g. GitHub Pages mid-deploy), which would
          // otherwise poison the offline fallback and break future refreshes.
          if (res.ok && res.status === 200 && res.type === 'basic') {
            const cp = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', cp));
          }
          return res;
        })
        .catch(() => caches.match('./index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  // Same-origin static assets (icons, manifest): cache-first.
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(req).then(r => r || fetch(req).then(res => {
        if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); }
        return res;
      }))
    );
    return;
  }

  // Google Fonts (CSS + font files): stale-while-revalidate so the app stays styled offline.
  if (/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(url.href)) {
    e.respondWith(
      caches.match(req).then(cached => {
        const net = fetch(req).then(res => {
          if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); }
          return res;
        }).catch(() => cached);
        return cached || net;
      })
    );
    return;
  }
});
