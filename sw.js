const CACHE_NAME = 'rahma-love-space-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './bg-music.mp4',
  './intro-video.mp4',
  './photo1.jpg',
  './icon.jpg' // ضفنا الأيقونة المربعة هنا عشان تتسيف أوفلاين
];

// مرحلة التثبيت ورفع الملفات الأساسية في الكاش
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching essential assets for offline love connectivity...');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting()) // لتفعيل السيرفس وركر فوراً بدون انتظار
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
    }).then(() => self.clients.claim())
  );
});

// استدعاء الملفات أوفلاين بسرعة السيرفرات المحلية
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // لو الملف موجود في الكاش رجعه، لو مش موجود هاته من السيرفر عادي
      return cachedResponse || fetch(event.request);
    })
  );
});