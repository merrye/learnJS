const express = require("express"),
    model = require("../module/model"),
    {Article , Tag} = model,
    Template = require("../module/findArticle"),
    router = express.Router();

router.get("/" , (req , res) => {
    (async () => {
        const currentIndex = 1,
        {article_list , count} = await Template(currentIndex);
        res.render("archives" , {
            article_list,
            currentIndex,
            title: "归档 | Merry's Blog",
            count: Math.ceil(count / 10),
        });
    })();
});

router.get("/page/:pageNumber" , (req , res) => {
    (async () => {
        const currentIndex = Number(req.params.pageNumber),
            {article_list , count} = await Template(currentIndex);
        res.render("archives" , {
            article_list,
            currentIndex,
            title: "归档 | Merry's Blog",
            count: Math.ceil(count / 10),
        });
    })();
});

module.exports = router;