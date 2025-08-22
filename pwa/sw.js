const CACHE = 'arpc-v1';
const ASSETS = [
'/',
'/index.html',
'/css/styles.css',
'/js/interaction.js',
'/markers/targets.mind'
];
self.addEventListener('install', e => {
e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('activate', e => {
e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
});
self.addEventListener('fetch', e => {
e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});