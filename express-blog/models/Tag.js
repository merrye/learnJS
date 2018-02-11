const db = require("../module/db");

module.exports = db.defineModel("tags", {
    href: db.STRING(255),
    content: db.STRING(255),
    article_id: db.INTEGER(11),
});