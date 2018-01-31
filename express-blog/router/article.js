const express = require("express"),
    Op = require("sequelize").Op,
    {createModelArray} = require("../module/utils"),
    {Tag, Article, Classification} = require("../module/model"),
    router = express.Router();

router.get("/:year/:month/:day/:name.html", (req , res) => {
    (async() => {
        const {day, name, month, year} = req.params,
            article = await Article.findOne({where: {href: `/article/${year}/${month}/${day}/${name}.html`}}),
            [tags, prevArticle, nextArticle] = await Promise.all([
                Tag.findAll({where: {article_id: article.id}}),
                Article.findOne({order: [['id', 'DESC']], attributes: ["title", "href"], where: {id: {[Op.lt]: article.id}}}),
                Article.findOne({order: [['id', 'ASC']], attributes: ["title", "href"], where: {id: {[Op.gt]: article.id}}})
            ]);
        article.tags = tags;

        res.render("article", {article, prevArticle, nextArticle, title: `${article.title} | Merry's Blog`});
    })();
});

router.get("/update/id/:id", (req, res) => {
    (async () => {
        const {id} = req.params,
            [article, tags, classifications] = await Promise.all([
                Article.findOne({where: {id}}),
                Tag.findAll({where: {article_id: id}}),
                Classification.findAll({where: {article_id: id}})
            ]);
        res.json({tags, article, classifications});
    })();
});

router.get("/:year", (req, res) => {
    (async () => {
        const {year} = req.params,
            articles = await Article.findAll({order: [['createdAt', 'DESC']], where: {href: {[Op.like]: `/article/${year}%`}}});
        res.json(articles);
    })();
});

router.get("/:year/:month", (req, res) => {
    (async() => {
        const {year, month} = req.params,
            date = `${year}/${month}`,
            articles = await Article.findAll({order: [['createdAt', 'DESC']], where: {href: {[Op.like]: `/article/${date}%`}}});
        res.json(articles);
    })();
});

router.post("/", (req, res) => {
    (async () => {
        const reg = /^\w+$/g,
            date = new Date().toLocaleDateString().replace(/-/g, "/"),
            {tags, title, eng_title, content, description, classifications} = req.body,
            article = await Article.create({title, content, eng_title, description, href: `/article/${date}/${eng_title}.html`}),
            article_id = article.null,
            [tagArr, classificationArr] = await Promise.all([
                createModelArray(tags, Tag, {article_id}),
                createModelArray(classifications, Classification, {article_id})
            ]);
        res.json({result: "ok"});
    })();
});

router.post("/:id", (req, res) => {
    (async () => {
        const article_id = req.params.id,
            {tags, title, eng_title, content, description, classifications} = req.body,
            article = await Article.findById(article_id),
            newArticle = await article.update({title, eng_title, content, description}),
            [tagArr, classificationArr] = await Promise.all([
                createModelArray(tags, Tag, {article_id}),
                createModelArray(classifications, Classification, {article_id})
            ]);
        res.json({result: "ok"});
    })();
});

module.exports = router;