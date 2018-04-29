const mysql = require('mysql');

module.exports = function(sql,val,callback){
    let config = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'node'
    });
    config.connect();
    config.query(sql,val,(err,data)=>{
        callback && callback(err,data);
    });
    config.end();
};