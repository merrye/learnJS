const db = require("../module/db").exp;

module.exports = db.defineModel("tags" , {
    article_id: db.INTEGER(11),
    content: db.STRING(255),
});