const mysql = require('mysql');
let config = mysql.createConnection({
    // 数据库地址
    host: "localhost",
    user: "root",
    password: "",
    // 数据库端口
    port: '3306',
    // 使用的数据库
    database: "node"
});
// 开始连接
config.connect();
// 进行数据库操作  1.数据库代码 2.回调
config.query('SELECT * FROM user',(err,data)=>{
    console.log(err,data);
});
// 结束连接
config.end();