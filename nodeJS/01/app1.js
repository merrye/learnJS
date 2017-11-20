// JavaScript source code
const http = require('http'),
    express = require('express'),
    //初始化
    app = express();

//响应浏览器的方法
//参数    1.访问路径  2.回调
//app.get('/', (req, res) => {
//    //响应数据方法
//    res.send('Hello World!');
//});

//访问当前路径的时候使用index文件里的路由方法
//访问当前路径的时候由index文件处理
app.use('/',require('./router/index'));

// http；//localhost:233/admin 这个路径已经被app.use匹配了
//  /index这个路径是来交给admin.js进行匹配的
app.use('/admin',require('./router/admin'));

http.createServer(app).listen(233);