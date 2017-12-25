const db = require("../module/db");

module.exports = db.defineModel("articles" , {
    content: db.TEXT,
    href: db.STRING(255),
    title: db.STRING(255),
    description: db.STRING(255),
});