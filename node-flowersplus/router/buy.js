const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
    fs = require('fs');

let fn = function(mysql , params){
    return new Promise(function(resolve , reject){
        sql(mysql , params , (err , data) => {
            resolve(data);
        });
    });
};

router.get('/name=:name&pNo=:pNo&num=:num.html' , (req, res) => {
    let pArr = [],
        dirData = null,
        src,
        pNo = req.params.pNo,
        num = req.params.num,
        name = req.params.name,
        url = "./public/img/products/" + pNo;

    fs.readdir(url , (err , data) => {
        dirData = data;
    });
    console.log(dirData);
    sql("SELECT * FROM users WHERE name = ? ",[name] ,(err,data) => {
        if(data.length !== 0){
            pArr.push(fn("SELECT * FROM address WHERE users_id = ?" , [data[0].id]));
            pArr.push(fn("SELECT * FROM products WHERE pNo = ?" ,[pNo]));
            Promise.all(pArr).then(function(pdata){
                res.render('buy',{
                    num,
                    src,
                    pNo,
                    name,
                    aData: pdata[0],
                    pData: pdata[1],
                });
            });
        };
    });
});

router.post('/name=:name.html' , (req, res) => {
    let name = req.params.name;

    sql("SELECT * FROM users WHERE name = ? ",[name] , (err , data) => {
        sql("SELECT * FROM address WHERE users_id = ?" , [data[0].id] , (err , aData) => {
            res.json({
                data: aData
            });
        });
    });
});

module.exports = router;