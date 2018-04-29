const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql');

router.get('/',(req,res)=>{
    // console.log(req.cookies);
    res.render('login');
});

router.post('/',(req,res)=>{
    const user = req.body.user,
        pwd = req.body.pwd;
    sql('SELECT * FROM user WHERE username = ?',[user],(err,data)=>{
        if(!data.length){
            res.send('用户名不存在');
            return;
        };
        if(data[0]['admin'] === 1){     // 会员
            
        };
        if(data[0]['pwd'] === pwd){
            // 名称   数据  过期时间
            res.cookie('login' , {
                name: user,
                pwd: pwd
            } , {
                maxAge: 1000 * 60 * 60 * 24
            });
            // 登录成功
            res.json({
                result: '登录成功'
            });
        }else{
            // 登录失败
            res.send('登录失败');
        };
    });
});

module.exports = router;