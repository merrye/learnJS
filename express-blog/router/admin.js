const fs = require("fs"),
    express = require("express"),
    {Article, Tag} = require("../module/model"),
    router = express.Router();

router.get("/", (req, res) => {
    const {name , admin} = req.session;
    // if(admin !== "admin"){
    //     res.redirect("/home");
    //     res.end();
    // }else{
        res.render("admin" , {
            name: "Merry",
            title: "Administrator | Merry's Blog",
        });
    // };
});

router.get("/upload/article", (req, res) => {
    res.render("articleUpload");
});

module.exports = router;