const express = require("express"),
    {aseEncrypt, aesDecrypt} = require("../module/encrypt"),
    sequelize = require("../module/db").sequelize,
    model = require("../module/model"),
    {Tag , User , Image , Article} = model,
    router = express.Router();

router.get("/" , (req , res) => {
    res.render("index" , {
        title: "Merry's Blog"
    });
});
router.get("/home" , (req , res) => {
    (async () => {
        const result = await sequelize.query("SELECT a.*, t.content as tag FROM articles a LEFT JOIN tags t ON a.id = t.article_id");
        // const [article_list ,tag_list ] = await Promise.all([getArtilce() , getTag()]);
        // const result = await Article.findAll({
        //     // limit: 10,
        //     // order: [
        //     //     ['createdAt', 'DESC']
        //     // ],
        //     include: [{
        //         model: Tag
        //     }]
        // });
        res.json({
            // article_list,tag_list
            result
        });
        // res.render("home" , {
        //     title: "Home | Merry's Blog",
        //     article_list
        // });

        async function getArtilce(){
            return await Article.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                limit: 10
            });
        };
        
        async function getTag(){
            return await Tag.findAll({
                order: [
                    ['id', 'DESC']
                ],
                limit: 10
            });
        };
    })();
});

router.get("/about" , (req , res) => {
    res.render("about" , {
        title: "About | Merry's Blog"
    });
});

router.get("/login" , (req , res) => {
    res.render("login" , {
        title: "Login | Merry's Blog"
    });
});

router.post("/login" , (req , res) => {
    
});

router.get("/reg" , (req , res) => {
    res.render("reg" , {
        title: "Register | Merry's Blog"
    });
});

router.post("/reg" , (req , res) => {
    (async function(){
        const {name, password} = req.body,
            count = await User.count({
                where: {
                    name
                }
            });
        if(count === 0){
            User.create({
                name,
                password: aseEncrypt(password),
                admin: "user"
            }).then(result => {
                const {name , admin} = result;
                req.session.name = res.locals.name = name;
                req.session.admin = res.locals.admin = admin;
                res.cookie("login" , {
                    name,
                    admin
                } , {
                    maxAge: 1000 * 60 * 60 * 24
                });
                res.json({
                    msg: "ok",
                    result
                });
            });
        }else{
            res.json({
                msg: "用户名已存在"
            });
        };
    })();
});

router.get("/logout" , (req , res) => {
    req.clearCookie("login");
    res.redirect("/");
});

router.use("/admin" , require("./admin"));

module.exports = router;