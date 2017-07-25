const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
    crypto = require('crypto');

router.get('/' , (req , res) => {
    res.render('reg');
});

router.post('/' , (req , res) => {
    const name = req.body.name,
        password = req.body.password,
        md5 = crypto.createHash('md5');

    sql("SELECT * FROM users WHERE name = ?" , [name] , (err , data) => {
        if(data.length === 0){
            const pwd = md5.update(password).digest('hex'); // 加密
            sql("INSERT INTO users (id , name , pwd , admin) VALUES(0 , ? , ? , 0)" , [name , pwd] , (err , data) =>{
                if(err){
                    res.render('err');
                    return;
                };
                res.locals.result = 'ok';
                res.render('reg');
            });
        }else{
            res.render('err');
        };
    });
});

module.exports = router;