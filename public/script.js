

// Регистрация сервис воркера
let registrationSW = (function (){
    // Проверка того, что наш браузер поддерживает Service Worker API.
    if ('serviceWorker' in navigator) {
        // Проверяем наличие зарегистрированного сервис воркера
        if (navigator.serviceWorker.controller) {
            console.log('Сервис воркер уже зарегистрирован!');
        } else {
            // Регистрируем новый сервис воркер
            navigator.serviceWorker.register('sw.js')
                .then(function(registration) {
                    console.log('Регистрация завершена успешно. Scope: ' + registration.scope);
                })
                .catch((error) => console.log(error));
        }
    }
})()


function deleteCachedImage(){
    sendMessageToSw(JSON.stringify({
        keysToDelete: ['/images/3.png']
    }));
}

function sendMessageToSw(msg){
    navigator.serviceWorker.controller.postMessage(msg);
}


// Регистрация сервис воркера с указание неверного Scope
let test1 = (function (){
    console.log('Регистрация сервис воркера с указание неверного Scope');
    if ('serviceWorker' in navigator) {
        // Регистрируем новый сервис воркер
        navigator.serviceWorker.register('/getsw/with_wrong_scope', { scope: '/' })
            .then(function(registration) {
                console.log('Регистрация завершена успешно. Scope: ' + registration.scope);
            })
            .catch((error) => console.log(error));
    }
})


// Регистрация сервис воркера с указание верного Scope
let test2 = (function (){
    console.log('Регистрация сервис воркера с указание верного Scope');
    if ('serviceWorker' in navigator) {
        // Регистрируем новый сервис воркер
        navigator.serviceWorker.register('/getsw/with_correct_scope', { scope: '/getsw/' })
            .then(function(registration) {
                console.log('Регистрация завершена успешно. Scope: ' + registration.scope);
            })
            .catch((error) => console.log(error));
    }
})


// Регистрация сервис воркера с изменением Scope
let test3 = (function (){
    console.log('Регистрация сервис воркера с изменением Scope');
    if ('serviceWorker' in navigator) {
        // Регистрируем новый сервис воркер
        navigator.serviceWorker.register('/getsw/with_changed_scope', { scope: '/' })
            .then(function(registration) {
                console.log('Регистрация завершена успешно. Scope: ' + registration.scope);
            })
            .catch((error) => console.log(error));
    }
})


function calculate(){
    let imageUrl;

    let imageId = document.getElementById('imageIdInput').value;

    // Нормальная работа
    let needToRewrite = false;
    // Для замены на локальный файл
    needToRewrite = document.getElementById('rewrite').checked;

    if(needToRewrite){
        imageUrl =  'images/' + imageId + '.png?rewrite=true';
    }
    else{
        imageUrl =  'images/' + imageId + '.png';
    }

    document.getElementById('image').innerHTML = "<img src="+ imageUrl +">";
    document.getElementById('imageUrlText').innerHTML = imageUrl;
}