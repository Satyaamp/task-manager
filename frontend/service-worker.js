/* ==============================
   SERVICE WORKER - PWA CACHE
============================== */

const CACHE_NAME = "task-manager-cache-v1";

const FILES_TO_CACHE = [
  "index.html",
  "register.html",
  "dashboard.html",
  "tasks.html",
  "add-task.html",
  "edit-task.html",
  "styles/style.css",
  "styles/components.css",
  "js/utils.js",
  "js/api.js",
  "js/auth.js",
  "js/tasks.js",
  "manifest.json"
];

/* ==============================
   INSTALL EVENT
============================== */
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[ServiceWorker] Pre-caching offline resources");
        return cache.addAll(FILES_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

/* ==============================
   ACTIVATE EVENT
============================== */
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");

  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

/* ==============================
   FETCH EVENT (OFFLINE FALLBACK)
============================== */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return (
        resp ||
        fetch(event.request).catch(() =>
          caches.match("index.html") // fallback offline page
        )
      );
    })
  );
});
