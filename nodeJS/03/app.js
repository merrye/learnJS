const http = require('http'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // 用来接收post方式数据
app.use(bodyParser.urlencoded({
    extended: true  // 表示可以接收任何数据类型的数据
}));
app.use('/',require('./router/index'));

http.createServer(app).listen(233);