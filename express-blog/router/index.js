const express = require("express"),
    model = require("../module/model"),
    {Tag , User , Image , Article} = model,
    getSortArticlesList = require("../module/tools").getSortArticlesList,
    {aseEncrypt, aesDecrypt} = require("../module/encrypt"),
    router = express.Router();

router.get("/" , (req , res) => {
    res.render("index" , {
        title: "Merry's Blog"
    });
});

router.get("/home" , (req , res) => {
    (async() => {
        const currentIndex = 1,
        {article_list , count} = await getSortArticlesList(currentIndex);
        res.render("home" , {
            article_list,
            currentIndex,
            title: "Home | Merry's Blog",
            count: Math.ceil(count / 10),
        });
    })();
});

router.get("/page/:pageNumber" , (req , res) => {
    (async () => {
        const currentIndex = Number(req.params.pageNumber),
            {article_list , count} = await getSortArticlesList(currentIndex);
        res.render("home" , {
            article_list,
            currentIndex,
            title: "Home | Merry's Blog",
            count: Math.ceil(count / 10),
        });
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
    (async() => {
        const {name , password} = req.body,
            user = await User.findOne({
                where: {
                    name,
                    password: aseEncrypt(password)
                }
            }),
            msg = user ? "ok" : "此用户未注册。";
        if(user){
            const {admin} = user;
            req.session.name  = name;
            req.session.admin = admin;
            res.cookie("login" , {
                name,
                admin
            } , {
                maxAge: 1000 * 60 * 60 * 24
            });
        };
        res.json({
            msg
        });
    })();
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
                req.session.name = name;
                req.session.admin = admin;
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
    res.clearCookie("login");
    res.redirect("/");
});

router.use("/admin" , require("./admin"));

router.use("/article" , require("./article"));

router.use("/archives" , require("./archives"));

router.use("/tag" , require("./tag"));

module.exports = router;