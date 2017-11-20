const express = require('express')
    router = express.Router();

router.get('/', (req, res) => {
    //直接响应数据
    //res.send('Hello World');

    //绝对路径  响应一个文件的方法
    res.send(`This is a file what is admin.js`);
});
router.get('/index', (req, res) => {
    //直接响应数据
    //res.send('Hello World');

    //绝对路径  响应一个文件的方法
    res.send(`This is a file under admin.js what is admin/index.js`);
});
module.exports = router;