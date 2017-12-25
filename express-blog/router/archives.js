const express = require("express"),
    getDateSortArticlesList = require("../module/utils").getDateSortArticlesList,
    router = express.Router();

router.get("/" , (req , res) => {
    (async () => {
        const currentIndex = 1,
            {articles_list , count} = await getDateSortArticlesList(currentIndex);
        res.render("archives" , {
            sum: count,
            currentIndex,
            articles_list,
            title: "归档 | Merry's Blog",
            count: Math.ceil(count / 10),
        });
    })();
});

router.get("/page/:pageNumber" , (req , res) => {
    (async () => {
        const currentIndex = Number(req.params.pageNumber),
            {articles_list , count} = await getDateSortArticlesList(currentIndex);
        res.render("archives" , {
            sum: count,
            currentIndex,
            articles_list,
            title: "归档 | Merry's Blog",
            count: Math.ceil(count / 10),
        });
    })();
});

module.exports = router;