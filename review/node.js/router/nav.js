const express = require('express'),
    sql = require('../module/mysql'),
    router = express.Router();

let fn = function(d){
        return new Promise((resolve , reject) => {
            sql("SELECT * FROM nav WHERE level = 2 AND navid = ?" , d.navid , (err , data) => {
                d.child = data;
                resolve();
            });
        });
    };

router.get('/' , (req , res) => {
    sql("SELECT * FROM nav WHERE level = 1" , (err , data) => {
        let arr = [];
        for(let i in data){
            arr[i] = fn(data[i]);
            // sql("SELECT * FROM nav WHERE level = 2 AND navid = ?" , data[i].navid , (err , nData) => {
            //     data[i].child = nData;
            // });
        };
        Promise.all(arr).then(() => {
            navData = data;
            // res.render('nav' , {
            //     data
            // });
        });
        // res.render("" , {
        //     data
        // });
    });
});

// module.exports = router;

module.exports = function(callback){
    sql("SELECT * FROM nav WHERE level = 1" , (err , data) => {
        let arr = [];
        for(let i in data){
            arr[i] = fn(data[i]);
        };
        Promise.all(arr).then(() => {
            callback(data);
        });
    });
};