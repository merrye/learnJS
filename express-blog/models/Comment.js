const db = require("../module/db");

module.exports = db.defineModel("comments" , {
    content: db.STRING(255),
    user_id: db.INTEGER(11),
    article_id: db.INTEGER(11)
});