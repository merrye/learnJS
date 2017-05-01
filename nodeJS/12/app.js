const http = require('http'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    ws = require('socket.io');

module.exports = app;

app.set('views' , __dirname + '/views');
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser('Merry'));
app.use(session({
    secret: 'Merry'
}));
// 没有暴露出去任何内容   引入所有代码
require('./module/configData');
let fs = require('fs');
app.post('/fs',(req,res)=>{
    /**
     * 前端 canvas 把图片利用base64转码
     * 后台 接收还原
    */
    const imgData = req.body.data,
        data = imgData.replace(/^data:image\/\w+;base64,/,''),
        dataBuffer = Buffer.from(data,'base64'),
        fileName = Date.now();
    fs.writeFile(`./${fileName}.png`,dataBuffer,(err,data)=>{
        res.json({
            uploadImage: fileName
        });
    });
});
app.use('/ueditor/ue',require('./ue'));
app.use('/',require('./router/index'));

let server = http.createServer(app).listen(3000);
let io = ws(server);
let userList = {},
    userNum = 0;
// 监听事件
// 当打开前端页面的时候触发     监听websocket连接
io.on('connection',socket =>{
    // 接收前端发送过来的聊天内容
    socket.on('msg',(data)=>{
        // console.log(data);
        // 把内容广播出去
        io.emit('liaotian', data);
    });
    socket.on('login',(data)=>{
        userList[data.userId] = data.name;
        socket.name = data.name;
        socket.userId = data.userId;
        userNum ++;
        data.userNum = userNum;
        // console.log(data.userNum,userNum)
        // 当有用户加入的时候 把加入的用户广播出去
        io.emit('login', {
            data: data,
            userList: userList
        });
    });
    // 退出触发的事件
    socket.on('disconnect',()=>{
        if(socket.name){
            userNum --;
            delete userList[socket.userId];
            // console.log('当前退出的用户是：' + socket.name);
            io.emit('logout', {
                name: socket.name,
                iNum: userNum,
                userList: userList
            });
        }
    });
    // console.log(socket);

    // 发送消息的方法  1.发送名称 2.内容
    // io.emit('merry',{
    //     name: 'Merry',
    //     age: 18
    // });
    // socket.on('thank',(data)=>{
    //     console.log(data);
    // });

});