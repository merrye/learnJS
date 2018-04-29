const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
    crypto = require('crypto');

router.get('/',(req,res)=>{
    // console.log(req.cookies);
    res.render('login');
});

router.post('/',(req,res)=>{
    const user = req.body.user,
        pwd = req.body.pwd,
        md5  = crypto.createHash('md5');
    sql('SELECT * FROM user WHERE username = ?',[user],(err,data)=>{
        if(!data.length){
            res.send('用户名不存在');
            return;
        };
        let newPwd = md5.update(pwd).digest('hex');
        if(data[0]['pwd'] === newPwd){
            // 名称   数据  过期时间
            res.cookie('login' , {
                name: user
            } , {
                maxAge: 1000 * 60 * 60 * 24
            });
            // 保存状态 所有后台页面通用
            // session 在关闭页面的时候 session下面保存的所有数据会被清空
            req.session.admin = data[0]['admin'];
            /*res.json({
                result: '登录成功'
            });*/
            res.render('index.ejs' , {
                data: data[0]['username']
            });
        }else{
            // 登录失败
            res.send('登录失败');
        };
    });
});

module.exports = router;