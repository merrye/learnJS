const http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    app = express(),    // 初始化
    sql = require('./module/mysql');

module.exports = app;

// config 没有暴露出去任何内容 引入所有代码
require('./module/config');

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

// cookie 密钥
app.use(cookieParser('Merry'));

app.use(session({
    secret: 'Merry' 
}));

// use / get / post 
// app.use((req , res , next) => {
//     if(req.cookies.login){
//         res.locals.login = req.cookies.login.name;
//     };
//     if(!req.session.admin && res.locals.login){
//         sql('SELECT * FROM users WHERE name = ?' , [res.locals.login] , (err , data) => {
//             data.length && (req.session.admin = data[0].admin);
//             next();
//         });
//     }else{
//         next();
//     };
//     // next();     // 继续往下执行
// });

// // 响应浏览器的方法
// app.get('/' , (req , res) => {
    // res.send('hello , wolrd!');
    // res.sendFile(process.cwd() + '/views/index.html');
// });

// 访问当前路径
//     可以用正则匹配路径
app.use('/' , require('./router/index'));

// app.use('/admin' , require('./router/admin'));

http.createServer(app).listen(3000 , (err , data) => {
    console.log("app start at port 3000...");
});