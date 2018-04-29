const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql');

router.get('/',(req,res)=>{
    res.render('index');
});

router.get('/logout', (req,res)=>{
    res.clearCookie('login');
    // 网址重新定向
    res.redirect('/');
});

router.use('/reg',require('./reg'));

router.use('/login',require('./login'));

module.exports = router;