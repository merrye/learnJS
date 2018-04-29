const app = require('./../app'),
    sql = require('./mysql');

app.use((req , res, next) => {
   if(req.cookies.flowersPlusUserName){
        res.locals.flowersPlusUserName = req.cookies.flowersPlusUserName.name;
    };
    if(req.cookies.login && !req.session.admin){
        sql('SELECT * FROM users WHERE name = ?',[res.locals.flowersPlusUserName],(err,data)=>{
            data.length && (req.session.flowersPlusAdministrator = data[0].admin);
            next();
        });
    }else{
        next();
    };
});