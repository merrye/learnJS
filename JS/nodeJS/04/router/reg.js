const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql');

router.get('/',(req,res)=>{
    res.render('reg');
});

router.post('/',(req,res)=>{
    const user = req.body.user,
        pwd = req.body.pwd;
    // where    查询条件
    sql('SELECT * FROM user WHERE username = ?',[user],(err,data)=>{
        // console.log(data);
        if(!data.length){
            //  可以注册
            // console.log('可以注册');
            sql('INSERT INTO user (id,username,pwd) VALUES (NULL , ? , ?)',[user,pwd],(err,data)=>{
                console.log(err);
                if(err){
                    res.render('err');
                    return;
                };
                res.locals.result = '成功';
                res.render('reg');
            });
        }else{
            //  不可以注册
            // console.log('不可以注册');
            res.render('err');
        };
    });
});

module.exports = router;