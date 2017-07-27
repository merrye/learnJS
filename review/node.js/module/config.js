const app = require('../app'),
    sql = require('./mysql'),
    navdata = require('./nav');

app.use((req , res , next) => {
    if(req.cookies.login){
        res.locals.login = req.cookies.login.name;
    };
    if(!req.session.admin && res.locals.login){
        sql('SELECT * FROM users WHERE name = ?' , [res.locals.login] , (err , data) => {
            data.length && (req.session.admin = data[0].admin);
            next();
        });
    }else{
        next();
    };
});

app.use((req , res , next) => {
    if(!req.session.navdata){
        navdata(data => {
            req.session.navdata = data;
            next();
        });
    }else{
        next();
    };
});