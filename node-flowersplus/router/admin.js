const express = require("express"),
    router = express.Router(),
    sql = require('../module/mysql');

router.get('/:name.html' , (req , res) => {
    const name = req.params.name;
    sql("SELECT admin FROM users WHERE name = ?", [name] ,(err , uData) => {
        const admin = uData[0].admin;
        sql("SELECT * FROM products", (err , data) => {
            res.render('products_admin', {
                data,
                admin,
                name
            });
        });
    });
});

router.post('/:name.html' , (req , res) =>{
    const pNo = req.body.pNo,
         name = req.body.name,
         type = req.body.type,
         price = req.body.price,
         num = req.body.num,
         description = req.body.dec;
    sql("INSERT INTO products(pNo,name,type,price,num,description) VALUES(?,?,?,?,?,?)", [pNo,name,type,price,num,description],(err,data) => {
        if(!err){
            res.json({
                id: data.insertId
            });
        };
    });
});

router.post('/update/:id.html' , (req , res) =>{
    const id = req.params.id,
        pNo = req.body.pNo,
        name = req.body.name,
        type = req.body.type,
        price = req.body.price,
        num = req.body.num,
        description = req.body.dec;
    sql("UPDATE products SET pNo = ? , name = ? , type = ? , price = ? , num = ? , description = ? WHERE id = ?", [pNo,name,type,price,num,description,id],(err,pData) => {
        if(!err){
            res.json({
                success: 'ok'
            });
        };
    });
});

router.post('/delete/:id.html' , (req , res) =>{
    sql("DELETE FROM products WHERE id = ?", [req.params.id] , (err , data) => {
        if(!err){
            res.json({
                success: 'ok'
            });
        };
    });
});

module.exports = router;