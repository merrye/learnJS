const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql');

router.get('/' , (req,res) => {
    //res.render("userCenter");
});

router.get('/name=:name.html' , (req,res) => {
    let name = req.params.name;
    sql("SELECT * FROM users WHERE name = ?",[name] , (err,data) => {
        res.render('userCenter',{
            userInfo: data[0]
        });
    });
});

router.get("/userInfo/:name.html" , (req,res) => {
    let name = req.params.name;
    sql("SELECT * FROM users WHERE name = ?",[name] , (err,data) => {
        if(!data.length){
            return;
        }
        res.render('my/myInfo',{
            userInfo: data[0]
        });
    });
});

router.get('/userInfo/mobile/:name.html', (req,res) => {
    let name = req.params.name;
    sql("SELECT * FROM users WHERE name = ?",[name] , (err,data) => {
        res.render('my/mobilephone',{
            phoneNumber: data[0].phoneNumber
        });
    });
});

router.get('/userInfo/address/:name.html', (req,res) => {
    let name = req.params.name;
    sql("SELECT * FROM users WHERE name = ?",[name] , (err,data) => {
        sql("SELECT * FROM address WHERE users_id = ?" ,[data[0].id] , (aErr , eData) => {
            res.render('my/addresshistory',{
                data: eData,
                name
            });
        });
    });
});

router.get('/orders/:name&state=:state.html', (req,res) => {
    // state: 待付款 -->  1
    // state: 配送中 -->  2
    // state: 已完成 -->  3
    // state: 未评价 -->  4
    // state: 全部   -->  5
    const name = req.params.name,
        state = Number(req.params.state),
        stateArr = [];

    sql("SELECT * FROM users WHERE name = ?",[name] , (err,data) => {
        sql("SELECT products.name AS products_name , orders.price AS orders_price , orders.beginDate AS orders_beginDate,orders.totalNumber AS orders_total , orders.state AS orders_state , address.location AS address_location , address.name AS address_name , address.phoneNumber AS address_phoneNumber FROM products , orders , address where orders.users_id = ? AND orders.address_id = address.id AND orders.products_id = products.id" ,[data[0].id] , (aErr , eData) => {
            if(eData.length===0){
                return;
            };
            if(state === 5){
                res.render("my/orders" , {
                    data: eData,
                    state,
                    name
                });
                return;
            };
            for(let i = 0;i < eData.length ; i ++){
                if(eData[i].orders_state === state){
                    stateArr.push(eData[i]);
                };
            };
            res.render('my/orders',{
                data: stateArr,
                state,
                name
            });
        });
    });
});

router.get('/userInfo/jifen/:name.html' , (req , res) => {
    sql("SELECT jifen FROM users WHERE name = ?" , [req.params.name] , (err, data) => {
        res.render("my/jifen" , {
            data: data[0].jifen
        });
    });
});

router.post('/address/name=:name.html' , (req, res)=>{
    const name = req.params.name,
        userName = req.body.userName,
        phoneNumber = req.body.phoneNumber,
        location = req.body.location;

    sql("SELECT * FROM users WHERE name = ?", [name] , (err, data) => {
        let users_id = data[0].id;
        sql("INSERT INTO address(location , phoneNumber , name , users_id) VALUES(? , ? , ? , ?)" ,[location , phoneNumber , userName , users_id], (aErr , aData) => {
            sql("SELECT * FROM address WHERE users_id = ?" , [users_id] , (aaErr , aaData) => {
                res.json({
                    data: aaData
                });
            });
        });
    });
});

router.post('/address/delete/id=:id.html' , (req ,res)=>{
    const id = req.params.id;
    sql("DELETE FROM address where id = ?" ,[id], (err , data) => {
        if(data){
            res.json(data);
        };
    });
});

module.exports = router;