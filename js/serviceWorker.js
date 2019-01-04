console.log('service worker: registered');

//Cache url's
self.addEventListener('install', function(event) {

    event.waitUntil(
        caches.open('cache-v1').then(function(cache) {
            return cache.addAll([
                '/',
                '/js/main.js',
                '/js/dbhelper.js',
                '/js/restaurant_info.js',
                '/index.html',
                '/restaurant.html',
                '/css/styles.css',
                '/data/restaurants.json',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            console.log("hi");
            if (response) return response;
            console.log('hi');
            return fetch(event.request);
        })
    );
});