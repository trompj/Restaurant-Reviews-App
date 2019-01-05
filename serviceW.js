//Justin Tromp
//01/04/2019
//Service worker javascript page for restaurant reviews application
//to cache files/pages for use without network functionality.

let SW_Cache_Name = 'v1';
let urlsCached = [
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
];

//Cache url's with service worker
self.addEventListener('install', function(event) {
    //Perform installation steps of service worker
    event.waitUntil(
        caches.open(SW_Cache_Name).then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsCached);
        })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
        // Cache hit (return response)
        if (response) {
          return response;
        }

        //Clone the request since stream is consumed once by cache and
        //once by browser for fetch. 
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a correct response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            //Clone the request since stream is consumed once by cache and
            //once by browser for fetch. 
            var responseToCache = response.clone();

            caches.open(SW_Cache_Name).then(function(cache) {
                cache.put(event.request, responseToCache);
            });

        return response;
          }
        );
      })
    );
});