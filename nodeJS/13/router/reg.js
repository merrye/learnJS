const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
    crypto = require('crypto');

router.get('/',(req,res)=>{
    res.render('reg');
});

router.post('/',(req,res)=>{
    const user = req.body.user,
        pwd = req.body.pwd,
        md5 = crypto.createHash('md5');
    // where    查询条件
    sql('SELECT * FROM user WHERE username = ?',[user],(err,data)=>{
        if(!data.length){
            // 加密
            let newPwd = md5.update(pwd).digest('hex');
            sql('INSERT INTO user (id,username,pwd,admin) VALUES (NULL , ? , ? , 0)',[user,newPwd],(err,data)=>{
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