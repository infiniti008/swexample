

// Регистрация сервис воркера
let registrationSW = (function (){
    // Проверка того, что наш браузер поддерживает Service Worker API.
    if ('serviceWorker' in navigator) {
        // Регистрируем новый сервис воркер
        if (navigator.serviceWorker.controller) {
            console.log('Сервис воркер уже зарегистрирован!')
        } else {
            navigator.serviceWorker.register('sw.js')
                .then(function(registration) {
                    console.log('Регистрация завершена успешно. Scope: ' + registration.scope);
                })
                .catch((error) => console.log(error));
        }
    }
})()


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
    let sum = 0;
    let items = document.getElementsByName('number');
    items.forEach(val => sum += parseInt(val.value));
    document.getElementById('printResult').innerHTML = sum;
    let imageUrl;
    if(sum % 5 == 0){
        imageUrl = 'images/1.png';
    } else if(sum % 3 == 0){
        imageUrl = 'images/2.png';
    } else if( sum % 2 == 0){
        imageUrl = 'images/3.png';
    } else {
        imageUrl = 'images/4.png';
    }

    document.getElementById('image').innerHTML = "<img src="+ imageUrl +">";
    document.getElementById('imageUrlText').innerHTML = imageUrl;
}