const mysql = require('mysql');

module.exports = (sql , params , callback) => {
    const conn = mysql.createConnection({
        host: 'localhost',   // 数据库地址
        port: "3306",
        user: 'root',
        password: '598921631',
        database: 'nodecourse',
    })
    conn.connect();
    conn.query(sql , params , (err , data) => {
        callback && callback(err , data);
    });
    conn.end();
};