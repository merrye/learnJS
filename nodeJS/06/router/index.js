const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql');

router.get('/',(req,res)=>{
    res.locals.admin = req.session.admin;
    // LIMIT 查询第几条到第几条数据
    // order id desc -> 根据id排序 降序
    sql('SELECT *FROM article ORDER BY id DESC LIMIT 0,3',(err,data)=>{
        console
        res.render('index',{data:data});
    });
});

router.get('/logout', (req,res)=>{
    res.clearCookie('login');
    // 网址重新定向
    res.redirect('/');
});

router.get('/article/:id.html',(req,res)=>{
    // req.params   同时接收get / post / 其他 提交数据的形式
    // console.log(req.params);
    sql('SELECT * FROM article WHERE id = ?',[req.params.id],(err,data)=>{
        if(data.length === 0){
            res.status(404).render('404');
            return;
        };
        res.render('article',{
            data: data
        });
    });
});

router.use('/admin',require('./admin'));

router.use('/reg',require('./reg'));

router.use('/login',require('./login'));

module.exports = router;