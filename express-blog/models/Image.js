const db = require("../module/db");

module.exports = db.defineModel("images" , {
    article_id: db.INTEGER(11),
    url: db.STRING(255),
});