
const CACHE_NAME = 'zull-the-club-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Solo se cachean las peticiones GET.
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        // Si se encuentra en caché, se devuelve la respuesta desde la caché.
        if (response) {
          return response;
        }

        // Si no está en caché, se hace la petición a la red.
        return fetch(event.request).then(networkResponse => {
          // Comprobar si hemos recibido una respuesta válida
          if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
          }
          
          // Solo cachear peticiones de nuestro origen o de CDNs de confianza.
          const shouldCache =
              event.request.url.startsWith(self.location.origin) ||
              event.request.url.startsWith('https://aistudiocdn.com/') ||
              event.request.url.startsWith('https://cdn.tailwindcss.com');
          
          if (shouldCache) {
            const responseToCache = networkResponse.clone();
            cache.put(event.request, responseToCache);
          }
          
          return networkResponse;
        });
      });
    })
  );
});


self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Eliminar cachés antiguas
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});