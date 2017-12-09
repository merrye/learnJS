const express = require("express"),
    router = express.Router();

router.get("/" , (req , res) => {
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

router.get("/upload/article" , (req , res) => {
    res.render("articleUpload");
});

router.post("/upload/article" , (req , res) => {
    console.log(req.body);
});

module.exports = router;