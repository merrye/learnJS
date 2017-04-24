const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql');

router.get('/',(req,res)=>{
    res.locals.admin = req.session.admin;
    // LIMIT 查询第几条到第几条数据
    // order id desc -> 根据id排序 降序
    sql('SELECT *FROM article ORDER BY id DESC LIMIT 0,3',(err,data)=>{
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
        sql('SELECT * FROM articlecomment WHERE articleId = ?',[req.params.id],(err,cData)=>{
            res.render('article',{
                data: data,
                comment: cData
            });
        });
    });
});

router.post('/article/:id.html',(req,res)=>{
    // console.log(req.params);
    // console.log(req.body);
    const time = new Date().toLocaleString();
    sql('INSERT INTO articlecomment (id,userId,articleId,content,time) VALUES (null,0,?,?,time)',[req.params.id,req.body.content]);
    res.send("成功");
});

router.use('/admin',require('./admin'));

router.use('/reg',require('./reg'));

router.use('/login',require('./login'));

module.exports = router;