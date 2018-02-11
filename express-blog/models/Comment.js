const db = require("../module/db");

module.exports = db.defineModel("comments", {
    content: db.STRING(255),
    // user_id: db.INTEGER(11),
    name: db.STRING(255),
    time: db.STRING(255),
    href: {
        type: db.STRING(255),
        allowNull: true   
    },
    article_id: db.INTEGER(11)
});