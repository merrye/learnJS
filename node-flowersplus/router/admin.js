const express = require("express"),
    router = express.Router(),
    sql = require('../module/mysql');

// router.use((req , res , next) => {
//     next();
// });

router.get('/:name.html' , (req , res) => {
    const name = req.params.name;
    sql("SELECT admin FROM users WHERE name = ?", [name] ,(err , uData) => {
        const admin = uData[0].admin;
        sql("SELECT * FROM products", (err , data) => {
            res.render('products_admin', {
                data,
                admin
            });
        });
    });
});

module.exports = router;