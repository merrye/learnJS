const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
    crypto = require('crypto');

router.post('/' , (req,res) => {
    const name = req.body.name,
        password = req.body.password,
        md5 = crypto.createHash('md5'),
        newPwd = md5.update(password).digest('hex');

    sql("SELECT * FROM users WHERE name = ?",[name] , (err,data) => {
        if(!data.length){
            sql("INSERT INTO users(name , password , admin) VALUES(? , ? , ?)" , [name , newPwd , 0],(err,data)=>{
                if(err){
                    res.render('index');
                    return;
                };
                res.cookie('flowersPlusUserName' , {
                    name: name
                }, {
                    maxAge: 1000 * 60 * 60 * 24
                });
                req.session.flowersPlusAdministrator = data[0]['admin'];
                res.locals.result = "success";
                res.json({
                    id: data.insertId,
                    name: name,
                    admin: data[0].admin
                });
            });
        }else{
            res.send("名称重复");
        };
    });
});

module.exports = router;