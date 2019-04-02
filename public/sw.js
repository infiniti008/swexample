self.addEventListener('install', function(event) {
    console.log('Сервис воркер установлен.')
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/script.js',
          '/style.css',
          '/manifest.json',
          '/icon.png',
          '/images/1.png',
          '/images/3.png',
          '/images/4.png'
        ]);
      })
    );
  });

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});