const db = require("../module/db");

module.exports = db.defineModel("tags" , {
    content: db.STRING(255),
    article_id: db.INTEGER(11),
});