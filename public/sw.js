self.addEventListener('install', function(event) {
    console.log('Сервис воркер установлен.')
    event.waitUntil(
      // Кэшируем необходимые ресурсы
      caches.open('v1').then(function(cache) {
        return cache.addAll([
          // '/',
          // '/index.html',
          // '/script.js',
          // '/style.css',
          // '/manifest.json',
          // '/icon.png',
          // '/images/1.png',
          // '/images/4.png'
        ]);
      })
    );
  });


self.addEventListener('message', function(event){
  let keys = JSON.parse(event.data).keysToDelete;
  keys.map(function(key){
    deleteFromCache(key);
  })
});


function deleteFromCache(key){
  caches.open('v1').then(function(cache) {
    cache.delete(key)
  });
}


self.addEventListener('fetch', function(event) {
  
  if(event.request.url.match(/rewrite=true/)){
    event.respondWith(
      fetch('http://localhost:3333/getstrangeimage')
    )
  }
  
  else if(event.request.url.match(/[0-9].png/)){
    let isImage3 = event.request.url.match('/images/3.png');

    event.respondWith(
      caches.match(event.request)
        .then(function(cachedResponse) {
          // Если изображение присутствует с кэше - возвращаем его
          if(cachedResponse) return cachedResponse;

          // Если изображение отсутствует - запрашиваем его
          return new Promise(function(resolve, reject){
            // Используем текущий запрос
            fetch(event.request)
              .then(function(resp){
                // Если не удалось получить изображение
                if(resp.status !== 200) {
                  reject();
                }

                // Пробрасываем ответ от сервера дальше
                else {
                  resolve(resp);
                } 
              })
              .catch(function(){
                reject(); // Если не удалось выполнить fetch
              });
          });
        })
        .then(function(response) {          
          if(isImage3){
            caches.open('v1').then(function(cache) {
              // Записываем ответ в кэш
              cache.put(event.request, response);
            });
            // Клонируем ответ для ответа клиенту
            return response.clone();
          } 
          else return response;
        })
        .catch(function() {
          return caches.match('/images/4.png');
        })
    );




  } else {
    event.respondWith(
      caches.match(event.request)
        .then(function(cachedResponse) {

          if(cachedResponse) return cachedResponse;
        
          else return fetch(event.request);

        })
    );
  }  
});