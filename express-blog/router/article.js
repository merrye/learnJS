const express = require("express"),
    Op = require("sequelize").Op,
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
            [tags , images , prevArticle , nextArticle] = await Promise.all([Tag.findAll({
                where: {
                    article_id: article.id
                }
            }), Image.findAll({
                where: {
                    article_id: article.id
                }
            }), Article.findOne({
                where: {
                    id: article.id - 1
                }
            }), Article.findOne({
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
router.post("/:year/:month" , (req, res) => {
    (async() => {
        console.log(req.params);
        const {year , month} = req.params,
            date = `${year}/${month}`,
            articles = await Article.findAll({
                where: {
                    href: {
                        [Op.like]: `/article/${date}%`
                    }
                }
            });
        console.log(articles);
        res.json(articles);
    })();
});

module.exports = router;