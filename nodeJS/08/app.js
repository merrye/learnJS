const http = require('http'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    sql = require('./module/mysql'),
    navData = require('./nav');

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
app.use(function(req,res,next){
    if(!res.locals.oneData){
        navData(req,res,(oneData)=>{
            res.locals.oneData = oneData;
        });
    };
    if(req.cookies.login){
        res.locals.login = req.cookies.login.name;
    };
    if(req.cookies.login && !req.session.admin){
        sql('SELECT * FROM user WHERE username = ?',[res.locals.login],(err,data)=>{
            data.length && (req.session.admin = data[0].admin);
            next();
        });
    }else{
        next();
    };
});
app.use('/',require('./router/index'));

http.createServer(app).listen(3000);