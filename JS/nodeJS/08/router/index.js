const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql');

router.get('/',(req,res)=>{
    res.locals.admin = req.session.admin;
    sql('SELECT *FROM article ORDER BY id DESC LIMIT 0,3',(err,data)=>{
        res.render('index',{data:data});
    });
});

router.get('/logout', (req,res)=>{
    res.clearCookie('login');
    // 网址重新定向
    res.redirect('/');
});

router.get('/nav',(req,res)=>{
    res.render('nav');
});

router.get('/article/list-:page.html',(req,res)=>{
    // console.log(req.params);
    sql('SELECT * FROM article ORDER BY id DESC LIMIT ?,2',[(req.params.page-1)*2],(err,data)=>{
        if(data.length === 0){
            res.send(err);
            return;
        };
        res.render('article_list',{data: data});
    });
});

router.get('/article/:id.html',(req,res)=>{
    // req.params   同时接收get / post / 其他 提交数据的形式
    // console.log(req.params);
    sql('SELECT * FROM article WHERE id = ?',[req.params.id],(err,data)=>{
        if(data.length === 0){
            res.status(404).render('404');
            return;
        };
        // console.log(Number(data[0].readAmount) + 1);
        res.cookie('article',{readAmount: true},{maxAge: 1000 * 60 * 60 * 24});
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