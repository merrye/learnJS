const mysql = require('mysql');

module.exports = function(sql,val,callback){ // sql -> sql语句  val -> 动态值  callback -> 回调函数
    let config = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'node'
    });
    config.connect();
    config.query(sql,val,(err,data)=>{
       callback(err,data);
    });
    config.end();
};
