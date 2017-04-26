const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
    upload = require('../module/multer');
// get post 任何形式的访问都会走这一条路由
router.use((req,res,next)=>{
    if(req.session.admin){
        next();
    }else{
        res.send('请用管理员账户登录');   
    };
});

router.get('/',(req,res)=>{
    res.render('admin/admin');
});

router.get('/user',(req,res)=>{
    sql('SELECT * FROM user',(err,data)=>{
        res.render('admin/user',{data:data});
    });
});

router.post('/user',(req,res)=>{
    // sql('SELECT * FROM user',(err,data)=>{
    //     res.render('admin/user',{data:data});
    // });
    let id = req.body.id;
    sql('DELETE FROM user WHERE id = ?',[id],(err,data)=>{});
    // res.render('admin/user');
});

router.get('/user/update',(req,res)=>{
    sql('SELECT * FROM user WHERE id = ?',[req.query.id],(err,data)=>{
        res.render('admin/update',{data:data});
    });
});

router.post('/user/update',(req,res)=>{
    const name = req.body.name,
        admin = req.body.admin,
        id = req.body.id;
    sql('UPDATE user SET username = ? ,admin = ? WHERE id = ?',[name , admin , id],(err,data)=>{
        if(!err){
            // sql('SELECT * FROM user WHERE id = ?',[id],(err,data)=>{
            //     res.render('admin/update',{data:data});
            // });
            res.json({
                result: 'update success'
            });
        }else{
            res.send("update failed");   
            return;
        };
    });
    // sql('SELECT * FROM user WHERE id = ?',[req.query.id],(err,data)=>{
    //     res.render('admin/update',{data:data});
    // });
});

router.get('/article',(req,res)=>{
    sql('SELECT * FROM article',(err,data)=>{
        res.render('admin/article',{
            data: data
        });
    });
});
// upload.single('merry') ----> 用来接收一个文件
// upload.array('merry' , iNum )    ----> 用来接收多个文件  参数2为限制最大接收文件个数
// upload.fields([{name: 'merry',maxCount: 10},{name: 'merrye',maxCount: 10}]   ----> 用来接收多个文件地方上传文件上传
router.post('/article',upload.fields([{
    name: 'merry',
    maxCount: 10
},{
    name: 'merrye',
    maxCount: 10
}]),(req,res)=>{
    // console.log(req.files);  限制上传 --> {}  上传失败
    // console.log(req.file);
    // res.send(req.file.filename);
    // const tag = req.body.tag,
    //     title = req.body.title,
    //     author = req.body.author,
    //     content = req.body.content,
    //     time = new Date().toLocaleString(),
    //     img = '/uploadImage/' + req.file.filename;
    // sql('INSERT INTO article (id,title,author,tag,content,time,image) VALUES (NULL,?,?,?,?,?,?)',[title,author,tag,content,time,img],(err,data)=>{
    //     if(err){
    //         res.send("保存失败");
    //         return;
    //     };
    //     res.json({
    //         result: 'success'
    //     });
    // });
});

module.exports = router;