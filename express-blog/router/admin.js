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

module.exports = router;