const fs = require("fs"),
    express = require("express"),
    upload = require("../module/multer"),
    {Article, Tag, Image} = require("../module/model"),
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

router.post("/upload/article", upload.single("file"), (req, res) => {
    const {title, description, classification, content, tag} = req.body,
        filename = req.file.filename;
    
});

module.exports = router;