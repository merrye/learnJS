const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql');

router.use((req , res , next) => {
    if(req.session.admin){
        next();
    }else{
        res.send("请用管理员账号登录");
    };  
});

router.get('/' , (req , res) => {
    res.render('admin/admin');
});

router.get('/user' , (req , res) => {
    sql("SELECT * FROM users" , (err , data) => {
        res.render('admin/user' , {
            data
        });
    });
})

module.exports = router;