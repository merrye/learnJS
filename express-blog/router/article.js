const express = require("express"),
    model = require("../module/model"),
    {Article , Tag , Image} = model,
    router = express.Router();

router.get("/:year/:month/:day/:name.html" , (req , res) => {
    (async() => {
        const {year , month , day , name} = req.params,
            article = await Article.findOne({
                where: {
                    href: `/article/${year}/${month}/${day}/${name}.html`
                }
            }),
            [tags , images , prevArticle , nextArticle] = await Promise.all([await Tag.findAll({
                where: {
                    article_id: article.id
                }
            }), await Image.findAll({
                where: {
                    article_id: article.id
                }
            }), await Article.findOne({
                where: {
                    id: article.id - 1
                }
            }), await Article.findOne({
                where: {
                    id: article.id + 1
                }
            })]);
        article.tags = tags;
        article.images = images;
        res.render("article" , {
            article,
            prevArticle,
            nextArticle,
            title: `${article.title} | Merry's Blog`,
        });
    })();
});

module.exports = router;