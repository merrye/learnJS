const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql');

// router.get('/' , (req , res) => {
//     res.send('Hi');
// });

// router.all() / router.use()

router.get('/' , (req , res) => {
    // res.render();
    // res.sendFile(process.cwd() + '/views/index.html');   // 绝对路径
    res.locals.admin = req.session.admin;
    // LIMIT 从第几开始搜索多少条记录
    // ORDER IN DESC    根据id排序 
    sql("SELECT * FROM articles ORDER BY id DESC LIMIT 0,6" , (err , data) => {
        res.render('index' , {
            name: 'merrye',
            html: '<h1>123</h1>',
            data
        });
    });
});

router.get('/article/list-:page.html' , (req , res) => {
    sql("SELECT * FROM articles ORDER BY id DESC LIMIT ? , 2" , [(req.params.page - 1) * 2] , (err , data) => {
        if(data.length === 0){
            res.render('err');
            return;
        };
        sql("SELECT COUNT(*) AS number FROM articles" , (e , d) => {
            res.render('article-list' , {
                data,
                n: d[0]['number']
            });
        });
    });
});

router.get('/article/:id.html' , (req , res) => {
    const id = req.params.id;

    sql("SELECT * FROM articles WHERE id = ?" , [id] , (err , data) => {
        if(err){
            res.render("err");
            return;
        };
        sql("SELECT * FROM comments WHERE article_id = ?" , [id] ,(err , cdata) => {
            res.render('article',{
                data: data[0],
                comments: cdata
            });
        });
    });
});

router.post('/article/:id.html' , (req , res) => {
    const id = req.params.id,
        comment = req.body.comment;

    sql("INSERT INTO comments (user_id , article_id , content) VALUES(41 , ? , ?)" , [id , comment] , (err , data) => {
        if(err){
            res.render("err");
            return;
        };
        sql("SELECT * FROM comments WHERE article_id = ?" , [id] ,(err , cdata) => {
            res.render('article',{
                //data: data[0],
                comments: cdata
            });
        });
    });
});

// router.get('/reg' , (req , res) => {
//     // get方式提交的内容
//     // console.log(req.query);
//     sql('INSERT INTO `users` (`id` , `name` , `pwd`) VALUES(0, ? , ?)', [req.query.name , req.query.password] , (err , data) => {
//         res.json({
//             data: 'ok'
//         });
//     });
// });

// router.post('/reg' , (req ,res) => {
//     console.log(req.body);  // 用来接收post方法的数据
// });

router.get('/logout' , (req , res) => {
    res.clearCookie('login');
    res.redirect('/');  // 网址重定向
});

router.use('/admin' , require('./admin'))

router.use('/login' , require('./login'));

router.use('/reg' , require('./reg'));

// router.use('/nav' , require('./nav'));
router.get('/nav' , (req , res) => {
    console.log(res.locals.data)
    res.render('nav');
});

module.exports = router;