const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/beranda-guru.html',
  '/beranda.html',
  '/kelompok.html',
  '/login.html',
  '/modul.html',
  '/pengenalan.html',
  '/penilaian-guru.html',
  '/penilaian-kelompok-guru.html',
  '/praktikum.html',
  '/profile.html',
  '/simbol-bahaya.html',
  '/start-praktikum.html',
  '/topik.html',
  '/data/MODUL ASAM BASA_merged.pdf',
  '/assets/images/BG-Lab.png',
  '/assets/images/image_redoks.png',
  '/assets/images/image-asam-basa.png',
  '/assets/images/image-energi.png',
  '/assets/images/image-gerak-lurus.png',
  '/assets/images/image-listrik.png',
  '/assets/images/image-polimer.png',
  '/assets/images/image-stoikiometri.png',
  '/assets/images/kelas10.png',
  '/assets/images/kelas11.png',
  '/assets/images/kelas12.png',
  '/assets/images/Logo.png',
  '/assets/images/profile-picture.png',
  '/assets/images/whatsapp-svgrepo-com (1).svg',
  '/assets/javascript/asam-basa.js',
  '/assets/javascript/energi.js',
  '/assets/javascript/gerak.js',
  '/assets/javascript/listrik.js',
  '/assets/javascript/polimer.js',
  '/assets/javascript/redoks.js',
  '/assets/javascript/stoikiometri.js',
  '/assets/videos/VideoModul.mp4',
  '/assets/landing-page.css',
  '/assets/landing-page.js',
  '/assets/main.js',
  '/assets/pengenalan.css',
  '/assets/plugins.js',
  '/assets/praktikum.css',
  '/assets/praktikum.js',
  '/assets/style.css',
  '/assets/vendor.css',
  '/data/MODUL ASAM BASA_merged.pdf',
  // Add other assets (images, fonts, etc.)
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});