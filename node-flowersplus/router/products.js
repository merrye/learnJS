const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
    fs = require('fs');

router.get('/pro=:pNo&name=:name.html' , (req , res) => {
    let pNo = req.params.pNo,
        name = req.params.name,
        url = "./public/img/products/" + pNo,
        dirData = null;

    fs.readdir(url , (err , data) => {
         dirData = data;
    });
    sql("SELECT * FROM products WHERE pNo = ?" , [pNo] , (err , data) => {
        res.render("products" , {
            pNo,
            name,
            data,
            dirData,
        });
    });
});

module.exports = router;