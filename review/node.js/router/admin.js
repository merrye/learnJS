const express = require('express'),
    router = express.Router(),
    // multer = require('multer'),
    // path = require('path'),
    upload = require("../module/multer"),
    sql = require('../module/mysql'),
    fs = require('fs');

// let storage = multer.diskStorage({  // 上传路径处理   重命名处理
//         // 上传路径设置
//         destination: path.join(process.cwd() , 'public'),
//         filename: (req , file , callback) => {
//             let filename = (file.originalname).split(".")，
//             name = filename[filename.length - 1];
//             // 重命名
//             callback(null , `${Date.now()}.${name}`);
//         }
//     }),
//     upload = multer({
//         storage
//     });

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
                        // 接收单个文件   upload.single(name)
                        // 多个文件       upload.array(name , num)
                        // 文件组         upload.fields([{name , maxCount} , {name , maxCount}])
router.post('/article' , upload.single('file') , (req , res) => {
    // console.log(req.file);

    // const title = req.body.title,
    //     tag = req.body.tag,
    //     author = req.body.author,
    //     content = req.body.content,
    //     img = '/upload/' + req.file.filename;
    //     time = new Date().toLocaleString();
    //     console.log(req.body)

    // sql("INSERT INTO articles (title , tag , author , content , time , img) VALUES(? , ? , ? , ? , ? , ?)" , [title , tag , author , content , time , img] , (err , data) => {
    //     if(err){
    //         res.send("fail");
    //     };
    //     res.json({
    //         result: 'ok'
    //     });
    // });
});

router.get('/nav' , (req , res) => {
    sql("SELECT * FROM nav WHERE level = 1" , (err , data) => {
        res.render("admin/nav" , {
            data
        });
    });
});

router.post('/nav' , (req , res) => {
    sql("INSERT INTO nav (title , navid , level , url) VALUES(? , ? , 1 , ?)",[] , (err , data) => {
        res.render("admin/nav");
    });
});

router.get('/views' , (req , res) => {
    let dir = fs.readdirSync(`${process.cwd()}/views`);
    res.render('views' , {
        dir
    });
});

router.post('/views' , (req , res) => {
    const dirname = req.body.dirname,
        dirtype = req.body.dirtype,
        val = req.body.val;

    if(dirtype === "1"){
        // console.log(`${process.cwd()}/views/${dirname}`)
        fs.readFile(`${process.cwd()}/views/${dirname}` , 'utf-8' , (err , data) => {
            res.json({
                data,
                type: 1,
                name: dirname
            });
        });
    }else if(dirtype === '2'){
        fs.readdir(`${process.cwd()}/views/${dirname}` , (err , data) => {
            res.json({
                data,
                type: 2,
                name: dirname
            });
        });
    }else if(dirtype === '3'){
        fs.writeFile(`${process.cwd()}/views/${dirname}` ,val , (err , data) => {
            res.json({
                result: 'ok'
            });
        });
    };

    // 在后台把所有的一起读取出来 返回给前台
    let dir = fs.readdirSync(`${process.cwd()}/views`);
    // for(let i in dir){
        
    // };
});

module.exports = router;