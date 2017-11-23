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
    (async() => {
        const currentIndex = 1,
        {article_list , count} = await Template(currentIndex);
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
            {article_list , count} = await Template(currentIndex);
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

router.use("/archives" , require("./archives"));

router.use("/tag" , require("./tag"));

async function Template(currentIndex){
    const arr = [],
        article_list = await Article.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 10,
            offset: 10 * (currentIndex - 1),
        });
    [...article_list].forEach((ele) => {
        arr.push((async ele => await Tag.findAll({where: {article_id: ele.id}}))(ele));
    });
    const [r , count] = await Promise.all([arr , getCount()]);
    [...article_list].forEach((ele , index) => {
        ele.tags = r[index];
    });
    return {article_list,count};
    async function getCount(){
        return await Article.count();
    };
};

module.exports = router;