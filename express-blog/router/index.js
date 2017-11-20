const express = require("express"),
    {aseEncrypt, aesDecrypt} = require("../module/encrypt"),
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
        const [article_list] = await Promise.all([getArtilce()]);
        let arr = [];
        [...article_list].forEach((ele) => {
            arr.push((async (ele) => {
                return await Tag.findAll({
                    where: {
                        article_id: ele.id
                    }
                });
            })(ele));
        });
        const r = await Promise.all(arr);
        [...article_list].forEach((ele , index) => {
            ele.tags = r[index];
        });
        res.render("home" , {
            title: "Home | Merry's Blog",
            article_list
        });

        async function getArtilce(){
            return await Article.findAll({
                order: [
                    ['createdAt', 'DESC']
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

router.use("/article" , require("./article"));

router.use("/tag" , require("./tag"));

module.exports = router;