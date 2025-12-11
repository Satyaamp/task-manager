/* ==============================
   SERVICE WORKER - FIXED VERSION
   Prevent stale JS & API issues
============================== */

const CACHE_NAME = "pm-static-v2";
const STATIC_FILES = [
  "/",
  "index.html",
  "styles/style.css",
  "styles/components.css",
  "manifest.json",
  "assets/icons/login.png",
  "assets/icons/task.png"
];

/* ==============================
   INSTALL EVENT
============================== */
self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Caching static assets");
      return cache.addAll(STATIC_FILES);
    })
  );

  self.skipWaiting();
});

/* ==============================
   ACTIVATE EVENT
============================== */
self.addEventListener("activate", (event) => {
  console.log("[SW] Activated");

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[SW] Removing old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

/* ==============================
   FETCH EVENT
============================== */
self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // ⭐ IMPORTANT: Network-first for API calls
  if (url.includes("/api/")) {
    event.respondWith(
      fetch(event.request).catch(() => {
        console.warn("[SW] API offline:", url);
        return new Response(
          JSON.stringify({ error: "offline-api" }),
          { status: 503, headers: { "Content-Type": "application/json" } }
        );
      })
    );
    return;
  }

  // ⭐ Cache-first for static files
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request);
    })
  );
});
