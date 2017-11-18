const db = require("../module/db");

module.exports = db.defineModel("tags" , {
    article_id: db.INT(11),
    content: db.STRING(255),
});