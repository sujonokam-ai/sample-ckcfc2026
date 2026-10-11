const CACHE_PREFIX = "jianzi-pwa-";
const CACHE_VERSION = "v1";
const CACHE_NAME = CACHE_PREFIX + CACHE_VERSION;

const CORE_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./offline.html",
  "./images/logo/logo.png",
  "./images/logo/icon-192.png",
  "./images/logo/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for (const file of CORE_FILES) {
      try {
        await cache.add(file);
      } catch (error) {
        console.warn("PWA cache skipped:", file, error);
      }
    }
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const base = new URL("./", self.registration.scope);
  if (!url.pathname.startsWith(base.pathname)) return;

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        }
        return response;
      } catch {
        return await caches.match(new URL("./index.html", base).href)
          || await caches.match(new URL("./", base).href)
          || await caches.match(new URL("./offline.html", base).href)
          || await caches.match(request);
      }
    })());
    return;
  }

  // Aset lokal: gunakan cache jika tersedia, perbarui dari jaringan.
  event.respondWith((async () => {
    const cached = await caches.match(request);
    const refresh = fetch(request).then(async response => {
      if (response.ok && response.type === "basic") {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    });
    if (cached) {
      event.waitUntil(refresh.catch(() => {}));
      return cached;
    }
    try {
      return await refresh;
    } catch {
      return Response.error();
    }
  })());
});