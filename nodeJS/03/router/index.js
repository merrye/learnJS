const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql');

router.get('/',(req,res)=>{
    sql('SELECT * FROM `userinfo`',(err,data)=>{
        res.render('index.ejs',{data: data});
    });
});

router.get('/reg',(req,res)=>{
    // get方式提交的内容
    // console.log(req.query);

    // ? -> 动态数据
    sql('INSERT INTO `userinfo` (`id` , `username` , `pass`) VALUES (0, ?, ?)',[req.query.name,req.query.pwd],(err,data)=>{
        res.json({
            data: req.query
        });
    });
});

router.get('/qingrenjie',(req,res)=>{
    res.render('post.ejs');
});

router.post('/reg',(req,res)=>{
    // req.body --> 用来接收post方式提交的数据
    // console.log(req.body);
    sql('INSERT INTO `userinfo` (`id` , `username` , `pass`) VALUES (0, ?, ?)',[req.body.name,req.body.pwd],(err,data)=>{
        res.json({
            data: req.body
        });
    });
});

module.exports = router;