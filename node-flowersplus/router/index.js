const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql');

router.get('/' , (req, res) => {
    res.locals.flowersPlusAdministrator = req.session.flowersPlusAdministrator;
    res.render('index',{
        data: "",
        admin: req.session.flowersPlusAdministrator
    });
});

router.get('/logout',(req,res) => {
    res.clearCookie('flowersPlusUserName');
    res.render('index',{
        data: ''
    });
});

router.use('/buy', require("./buy"));

router.use('/admin', require("./admin"));

router.use('/login', require("./login"));

router.use('/reg', require("./register"));

router.use('/products', require("./products"));

router.use('/userCenter', require("./userCenter"));

module.exports = router;