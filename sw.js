const CACHE_NAME = 'rahma-love-space-v1';
const ASSETS = [
  '/rahma/',
  '/rahma/index.html',
  '/rahma/style.css',
  '/rahma/manifest.json',
  '/rahma/romantic-bg.mp3',
  '/rahma/intro-bg.mp4',
  '/rahma/memory1.jpg',
  '/rahma/memory2.jpg',
  '/rahma/tagfeela1.jpg',
  '/rahma/tagfeela2.jpg',
  '/rahma/love1.jpg',
  '/rahma/love2.jpg',
  '/rahma/love3.jpg',
  '/rahma/love4.jpg',
  '/rahma/icon-192.png',
  '/rahma/icon-512.png'
];

// مرحلة التثبيت ورفع الملفات في الكاش
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching essential assets for offline love connectivity...');
      return cache.addAll(ASSETS);
    })
  );
});

// تفعيل وتحديث الكاش القديم
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// استدعاء الملفات أوفلاين بسرعة السيرفرات المحلية
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});