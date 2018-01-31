const express = require("express"),
    {Article, Tag} = require("../module/model"),
    {getSearchList, getArticlesBySearch} = require("../module/utils"),
    router = express.Router();

router.get("/", (req , res) => {
    (async () => {
        const tagArr = await getSearchList(Tag);
        res.render("tag_list", {tagArr, title:  "标签 | Merry's Blog"});
    })();
});

router.get("/:search", (req , res) => {
    ((async () => {
        const search = req.params.search,
            {con, count, articles_list} = await getArticlesBySearch(search, Tag);
        res.render("article_list", {con, count, articles_list, title: `${con} | Merry's Blog`});
    }))();
});    

module.exports = router;