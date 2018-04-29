const app = require('./../app'),
    sql = require('./mysql'),
    navData = require('./nav');

app.use((req,res,next)=>{
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

app.use((req,res,next)=>{
    if(!res.locals.oneData){
        navData((oneData)=>{
            res.locals.oneData = oneData;
            next();
        });
    }else{
        next();
    };
});