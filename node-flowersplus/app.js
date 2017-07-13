const http = require("http"),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

module.exports = app;

app.set('views' , __dirname + '/views');

app.set('view engine' , 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser('flowersplus'));

app.use(session({
    serect: 'flowersplus'
}));

require('./module/configData');

app.use('/' , require('./router/index'));

http.createServer(app).listen(3000 , () => {
    console.log("app start at port 3000");
});