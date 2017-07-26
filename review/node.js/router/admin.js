const express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    sql = require('../module/mysql');

let storage = multer.diskStorage({  // 上传路径处理   重命名处理
        // 上传路径设置
        destination: `${process.cwd()}/public`,
        filename: (req , file , callback) => {
            console.log(req , file)
        }
    }),
    upload = multer({
        storage
    });

router.use((req , res , next) => {
    if(req.session.admin){
        next();
    }else{
        res.send("请用管理员账号登录");
    };  
});

router.get('/' , (req , res) => {
    res.render('admin/admin');
});

router.get('/user' , (req , res) => {
    sql("SELECT * FROM users" , (err , data) => {
        res.render('admin/user' , {
            data
        });
    });
});

router.post('/user' , (req , res) => {
    const id = req.body.id;

    sql("DELETE FROM users WHERE id = ?" , [id] , (req , res) => {
        res.render('admin/user');
    });
});

router.get('/user/update', (req , res) => {
    const id = req.query.id;
    
    sql("SELECT * FROM users WHERE id = ?" , [id] , (err , data) => {
        res.render('admin/update'  ,{
            data
        });
    });
});

router.post('/user/update', (req , res) => {
    const id = req.body.id,
        name = req.body.name,
        admin = req.body.admin;

    sql("UPDATE users SET name = ? , admin = ? WHERE id = ?" , [name ,admin , id] ,(err , data) => {
        if(!err){
            res.json({
                result: 'ok'
            });
        };
    });
});

router.get('/article' , (req , res) => {
    res.render('admin/article');
});

router.post('/article' , upload.single('file') , (req , res) => {

    // const title = req.body.title,
    //     tag = req.body.tag,
    //     author = req.body.author,
    //     content = req.body.content,
    //     time = new Date().toLocaleString();

    // sql("INSERT INTO articles (title , tag , author , content , time) VALUES(? , ? , ? , ? , ?)" , [title , tag , author , content , time] , (err , data) => {
    //     if(err){
    //         res.send("fail");
    //     };
    //     res.json({
    //         result: 'ok'
    //     });
    // });
});

module.exports = router;