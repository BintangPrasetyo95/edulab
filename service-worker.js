const CACHE_NAME = 'edulab-cache-v1';
const urlsToCache = [
  '/edulab/',
  '/edulab/index.html',
  '/edulab/beranda-guru.html',
  '/edulab/beranda.html',
  '/edulab/kelompok.html',
  '/edulab/login.html',
  '/edulab/modul.html',
  '/edulab/pengenalan.html',
  '/edulab/penilaian-guru.html',
  '/edulab/penilaian-kelompok-guru.html',
  '/edulab/praktikum.html',
  '/edulab/profile.html',
  '/edulab/simbol-bahaya.html',
  '/edulab/start-praktikum.html',
  '/edulab/topik.html',
  '/edulab/data/MODUL ASAM BASA_merged.pdf',
  '/edulab/assets/images/BG-Lab.png',
  '/edulab/assets/images/image_redoks.png',
  '/edulab/assets/images/image-asam-basa.png',
  '/edulab/assets/images/image-energi.png',
  '/edulab/assets/images/image-gerak-lurus.png',
  '/edulab/assets/images/image-listrik.png',
  '/edulab/assets/images/image-polimer.png',
  '/edulab/assets/images/image-stoikiometri.png',
  '/edulab/assets/images/kelas10.png',
  '/edulab/assets/images/kelas11.png',
  '/edulab/assets/images/kelas12.png',
  '/edulab/assets/images/Logo.png',
  '/edulab/assets/images/profile-picture.png',
  '/edulab/assets/images/whatsapp-svgrepo-com (1).svg',
  '/edulab/assets/javascript/asam-basa.js',
  '/edulab/assets/javascript/energi.js',
  '/edulab/assets/javascript/gerak.js',
  '/edulab/assets/javascript/listrik.js',
  '/edulab/assets/javascript/polimer.js',
  '/edulab/assets/javascript/redoks.js',
  '/edulab/assets/javascript/stoikiometri.js',
  '/edulab/assets/videos/VideoModul.mp4',
  '/edulab/assets/landing-page.css',
  '/edulab/assets/landing-page.js',
  '/edulab/assets/main.js',
  '/edulab/assets/pengenalan.css',
  '/edulab/assets/plugins.js',
  '/edulab/assets/praktikum.css',
  '/edulab/assets/praktikum.js',
  '/edulab/assets/style.css',
  '/edulab/assets/vendor.css',
  '/edulab/data/MODUL ASAM BASA_merged.pdf',
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