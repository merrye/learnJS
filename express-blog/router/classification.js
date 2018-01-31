const express = require("express"),
    {Tag, User, Article, Classification} = require("../module/model"),
    {getSearchList, getArticlesBySearch} = require("../module/utils"),
    router = express.Router();

router.get("/", (req, res) => {
    (async () => {
        const classificationArr = await getSearchList(Classification);
        res.render("classification", {classificationArr, title:  "分类 | Merry's Blog"});
    })();
});

router.get("/:search", (req, res) => {
    (async () =>{
        const search = req.params.search,
            {con, count, articles_list} = await getArticlesBySearch(search, Classification);
        res.render("article_list", {con, count, articles_list, title: `${con} | Merry's Blog`});
    })();
});

module.exports = router;