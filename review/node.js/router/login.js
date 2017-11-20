const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
    crypto = require('crypto');

router.get('/' , (req , res) => {
    // if(req.cookies.login){
    //     res.locals.login = req.cookies.login.name;
    // };
    res.render('login');
});

router.post('/' , (req , res) => {
    const name = req.body.name,
        password = req.body.password,
        md5 = crypto.createHash('md5');
    sql("SELECT * FROM users WHERE name = ?" , [name] , (err , data) => {
        if(data.length === 0){
            return;
        };
        const pwd = md5.update(password).digest('hex');
        if(data[0].pwd === pwd){
            // 1. name  2.data  3.time  
            res.cookie('login' , {
                name
            } , {
                maxAge: 1000 * 60 * 60 * 24
            });
            // session 所有后台页面可以访问到
            req.session.admin = data[0].admin;
            res.render('login');
        }else{
            res.render('err');
        };
    });
});

module.exports = router;