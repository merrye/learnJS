const db = require("../module/db").exp;

module.exports = db.defineModel("articles" , {
    title: db.STRING(255),
    description: db.STRING(255),
    classification: db.STRING(255),
    content: db.TEXT
});