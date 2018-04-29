const express = require('express'),
    router = express.Router();

router.get('/',(req,res)=>{
    // 用来响应模板引擎文件
    let obj = {
        name: 'Merry',
        kecheng: 'node',
        month:  'Apirl' 
    };
    // res.render('index',{
    //     name: '<h1>Hello World<h1>'
    // });
    res.render('index',{data:obj});
});

module.exports = router;