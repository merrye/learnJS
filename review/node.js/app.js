const http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    app = express(),    // 初始化
    sql = require('./module/mysql'),
    ws = require('socket.io');

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

const fs = require('fs');
app.post('/fs' , (req , res) => {
    const data = req.body.data,
        d = data.replace(/^data:image\/\w+;base64,/,""),
        db = Buffer.from(d , 'base64'),
        filename = Date.now();
    console.log(req.body, d);
    fs.writeFile(`./${filename}.png` , db , (err , data) => {
        res.json({
            success: filename
        });
    });
})

let server = http.createServer(app).listen(3000 , (err , data) => {
    console.log("app start at port 3000...");
});

let io = ws(server),
    userList = {},
    userNum = 0;

// 监听事件 
// connection 打开前端页面触发
// socket 是独立的
io.on('connection' , socket => {
    // console.log(socket)

    // 发送消息的方法  name content
    io.emit('Merry' , {
       c: 'welcome'
    });

    socket.on('thanks' , (d) => {
        console.log(d)
    });

    // 接收前台返回回来的内容
    socket.on('ms' , (d) => {
        console.log(d)

        // 把内容广播出去
        io.emit('chat' , {
            txt: d.txt,
            name: socket.name
        });
    });

    socket.on('login' , (d) => {
        userList[d.userid] = d.name;
        socket.name = d.name;
        socket.userid = d.userid;
        userNum ++;
        io.emit('login' , {
            name: d.name,
            userid: d.userid,
            userNum,
            userList
        });
    });

    // disconnect 退出时触发的事件
    socket.on('disconnect' , () => {
        console.log("用户" + socket.name + "退出聊天室。")
        delete userList[socket.userid];
        userNum --;
        io.emit('logout' , {
            name: socket.name,
            userNum,
            userList
        })
    });

    socket.on('chatroom' , (d) => {
        // 加入房间的方法
        socket.join('cr');
        io.sockets.in('cr').emit('hello' , {
            d: 'welcome'
        });
    });

    socket.on('outcr' , (d) => {
        socket.leave('cr');
        io.sockets.in('cr').emit('hello' , {
            d: 'leave'
        });
    });

    socket.on('meetroom' , (d) => {
        socket.join('mr');
    });
});