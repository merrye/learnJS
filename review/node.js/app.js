const http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser');
    app = express();    // 初始化

// 设置模板引擎目录
app.set('views' , __dirname + '/views');
// 设置使用的模板引擎
app.set('view engine' , 'ejs');
// 设置静态资源目录
app.use(express.static(__dirname + '/public'));
// app.use('/abc' , express.static(__dirname + '/public'))

// 用来接收json的数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true     // 接收任何数据类型的数据
}));

// // 响应浏览器的方法
// app.get('/' , (req , res) => {
    // res.send('hello , wolrd!');
    // res.sendFile(process.cwd() + '/views/index.html');
// });

// 访问当前路径
//     可以用正则匹配路径
app.use('/' , require('./router/index'));

// app.use('/admin' , require('./router/admin'));

http.createServer(app).listen(3000);