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
    res.render('index' , {
        name: 'merrye',
        html: '<h1>123</h1>'
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

module.exports = router;