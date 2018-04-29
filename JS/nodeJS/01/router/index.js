const express = require('express')
    router = express.Router();

router.get('/', (req, res) => {
    //直接响应数据
    //res.send('Hello World');

    //绝对路径  响应一个文件的方法
    res.sendFile(process.cwd()+'/views/index.html');
});

router.get('/a+b+/',(req,res)=>{
    res.send(`this is a+b+`);
});
module.exports = router;