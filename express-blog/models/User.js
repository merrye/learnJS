const db = require("../module/db").exp;

module.exports = db.defineModel("users" , {
    name: db.STRING(255),
    password: db.STRING(255),
    admin: db.STRING(255)
});