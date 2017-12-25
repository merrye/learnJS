const express = require("express"),
    Op = require("sequelize").Op,
    {createModelArray} = require("../module/utils"),
    {Article , Tag , Image, Classification} = require("../module/model"),
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

router.get("/:year/:month" , (req, res) => {
    (async() => {
        const {year , month} = req.params,
            date = `${year}/${month}`,
            articles = await Article.findAll({
                where: {
                    href: {
                        [Op.like]: `/article/${date}%`
                    }
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            });
        res.json(articles);
    })();
});

router.get("/:year" , (req , res) => {
    (async () => {
        const {year} = req.params,
            articles = await Article.findAll({
                where: {
                    href: {
                        [Op.like]: `/article/${year}%`
                    }
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            });
        res.json(articles);
    })();
});

router.post("/", (req, res) => {
    (async () => {
        const date = new Date().toLocaleDateString().replace(/-/g, "/"),
            {tags, title, eng_title, content, description, classifications} = req.body,
            article = await Article.create({
                title,
                content,
                description,
                href: `/article/${date}/eng_title.html`
            }),
            article_id = article.null,
            [tagArr, classificationArr] = await Promise.all([
                createModelArray(tags, Tag, {article_id}),
                createModelArray(classifications, Classification, {article_id})
            ]);
        [tagData, classificationData] = await Promise.all([tagArr, classificationArr]);

        res.json({
            result: "ok"
        });
    })();
});

module.exports = router;