const express = require('express');
const app = express();

app.use(express.static('public', {setHeaders: (res) => {
    res.set('Cache-Control', 'no-cache')
}}))

app.listen(3333, () => {
    console.log("Server is started on port: 3333");
});


// Регистрация сервис воркера с неправильным указание Scope
app.get('/getsw/with_wrong_scope', (req, res) => {
    
    res.sendFile(__dirname + '/sw_withscope/sw.js');

});


// Пример с корректным Scope
app.get('/getsw/with_correct_scope', (req, res) => {

    res.set('Service-Worker-Allowed', '/').sendFile(__dirname + '/sw_withscope/sw.js');

});


// Пример с явным указанием максимально доступного Scope
app.get('/getsw/with_changed_scope', (req, res) => {

    res.set('Service-Worker-Allowed', '/').sendFile(__dirname + '/sw_withscope/sw.js');

});