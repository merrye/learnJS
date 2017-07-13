const mysql = require('mysql');

module.exports = (sql , val , callback) => {
    const config = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        port: "3306",
        database: "flowersplus"
    });
    config.connect();
    config.query(sql, val , (err, data) => {
        callback && callback(err , data);
    });
    config.end();
};