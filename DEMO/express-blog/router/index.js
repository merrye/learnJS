const express = require("express"),
    {aseEncrypt, aesDecrypt} = require("../module/encrypt"),
    {Tag, User, Article, Classification} = require("../module/model"),
    {getUploadImageData, getSortArticlesList} = require("../module/utils"),
    router = express.Router();

router.get("/", (req, res) => res.render("index", {title: "Merry's Blog"}));

router.get("/home", (req, res) => {
    (async() => {
        const currentIndex = 1,
            {article_list, count} = await getSortArticlesList(currentIndex),
            tagArr = [], pArr = [];
        [...article_list].forEach(element => pArr.push((async element => await Tag.findAll({where: {article_id: element.id}}))(element)));
        const tags = await Promise.all(pArr);
        [...tags].forEach((element, index) => article_list[index].tags = element);
        res.render("home", {article_list, currentIndex, title: "Home | Merry's Blog", count: Math.ceil(count / 10)});
    })();
});

router.get("/page/:pageNumber", (req , res) => {
    (async () => {
        const currentIndex = Number(req.params.pageNumber),
            {article_list, count} = await getSortArticlesList(currentIndex);
        res.render("home", {article_list, currentIndex, title: "Home | Merry's Blog", count: Math.ceil(count / 10)});
    })();
});

router.get("/about", (req , res) => res.render("about", {title: "About | Merry's Blog"}));

router.get("/login", (req , res) => res.render("login", {title: "Login | Merry's Blog"}));

router.post("/login", (req , res) => {
    (async() => {
        const {name, password} = req.body,
            user = await User.findOne({where: {name, password: aseEncrypt(password)}}),
            msg = user ? "ok" : "此用户未注册。";
        if(user) {
            const {admin} = user;
            req.session.name  = name;
            req.session.admin = admin;
            res.cookie("login", {name, admin}, {maxAge: 1000 * 60 * 60 * 24});
        };
        res.json({msg});
    })();
});

router.get("/reg", (req , res) => res.render("reg", {title: "Register | Merry's Blog"}));

router.post("/reg", (req , res) => {
    (async () => {
        const {name, password} = req.body,
            count = await User.count({where: {name}});
        if(count === 0) {
            User.create({name, password: aseEncrypt(password), admin: "user"}).then(result => {
                const {name , admin} = result;
                req.session.name = name;
                req.session.admin = admin;
                res.cookie("login", {name, admin}, {maxAge: 1000 * 60 * 60 * 24});
                res.json({msg: "ok", result});
            });
        }else{
            res.json({msg: "用户名已存在"});
        };
    })();
});

router.get("/logout", (req , res) => {
    res.clearCookie("login");
    res.redirect("/");
});

router.post("/upload-image", (req, res) => {
    (async () => {
        const data = await getUploadImageData(req);
        res.json(data);
    })();
});

router.get("/upload-file", (req, res) => {
    res.render("upload-file");
});
const fs = require("fs"),
    path = require("path");

router.post("/upload-file", (req, res) => {
    // console.log(req.body.fileData);
    const {fileData, fileName} = req.body;
        storePath = path.resolve(process.cwd(), "static/file");
    if(!fs.existsSync(storePath)) {
        fs.mkdirSync(storePath);
    };
    // console.log(fileData);
    res.json(fileData);
    // const readStream = fs.createReadStream(fileName),
    //     writeStream = fs.createWriteStream(`./static/file/${fileName}`);

    // readStream.pipe(writeStream);
    // readStream.on("end", () => {
    //     fs.unlinkSync(path.join(storePath, fileName));
    // });
});

router.use("/tag", require("./tag"));

router.use("/admin", require("./admin"));

router.use("/article", require("./article"));

router.use("/archives", require("./archives"));

router.use("/comments", require("./comments"));

router.use("/classification", require("./classification"));

module.exports = router;