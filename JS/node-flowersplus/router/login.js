const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
    crypto = require('crypto');

router.get('/' , (req,res) => {
    res.render('index');
});

router.post('/' , (req,res) => {
    const name = req.body.name,
        pwd = req.body.password,
        md5 = crypto.createHash('md5');

        sql("SELECT * FROM users WHERE name = ?",[name] , (err , data)=>{
            if(!data.length){
                res.send( "用户名不存在");
                return;
            };
            let newPwd = md5.update(pwd).digest('hex');
            if(data[0]['password'] === newPwd){
                res.cookie('flowersPlusUserName' , {
                    name: name
                }, {
                    maxAge: 1000 * 60 * 60 * 24
                });
                req.session.flowersPlusAdministrator = data[0]['admin'];
                res.json({
                    name: name,
                    id: data[0]['id'],
                    admin: data[0].admin
                });
            }else{
                res.send( "密码错误");
            };
        });
});

module.exports = router;