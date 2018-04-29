const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql');

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
    let name = req.body.name,
        admin = req.body.admin,
        id = req.body.id;
    sql('UPDATE user SET username = ? ,admin = ? WHERE id = ?',[name , admin = 1 , id],(err,data)=>{
        if(!err){
            sql('SELECT * FROM user WHERE id = ?',[id],(err,data)=>{
                res.render('admin/update',{data:data});
            });
        };
    });
    // sql('SELECT * FROM user WHERE id = ?',[req.query.id],(err,data)=>{
    //     res.render('admin/update',{data:data});
    // });
});

module.exports = router;