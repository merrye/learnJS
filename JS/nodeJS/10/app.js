const http = require('http'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

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

http.createServer(app).listen(3000);