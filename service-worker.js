// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var CACHE_NAME = 'SOS-v1';
var urlsToCache = [
  '/',
  '/assets/img/logo/SOS-logo-svg.svg',
  '/dist/css/styles.css',
  '/dist/js/all.js',
  'index.html'
];


self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
	  .then(function() {
   
      return self.skipWaiting();
    })
  );  
});

self.addEventListener('activate', function(event) {
  console.log('Finally Service Worker actived & Ready to start serving content!');  
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

caches.keys().then(function(cacheNames) {
  cacheNames.forEach(function(cacheName) {
    caches.delete(cacheName);
  });
});

