const http = require('http'),
    express = require('express'),
    app = express();

// 设置模板引擎目录
app.set('views',__dirname+'/views');
// 设置使用的模板引擎是什么
app.set('view engine','ejs');
// 设置静态资源目录
// 必须访问abc/img/logo.png
// app.use('/abc',express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/public'));

app.use('/',require('./router/index'));

http.createServer(app).listen(233);