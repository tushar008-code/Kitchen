self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open("kitchen-cache-v1").then((cache) =>
      cache.match(event.request).then((resp) => {
        const fetchPromise = fetch(event.request).then((networkResp) => {
          cache.put(event.request, networkResp.clone());
          return networkResp;
        });
        return resp || fetchPromise;
      })
    )
  );
});
