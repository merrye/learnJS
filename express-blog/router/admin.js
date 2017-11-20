const express = require("express"),
    router = express.Router();

router.get("/" , (req , res) => {
    res.render("admin" , {
        title: "Administrator | Merry's Blog",
        userName: res.locals.name
    });
});

module.exports = router;