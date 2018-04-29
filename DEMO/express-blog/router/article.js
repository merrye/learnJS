const express = require("express"),
    Op = require("sequelize").Op,
    {getTimeString, createModelArray} = require("../module/utils"),
    {Tag, User, Comment, Article, Classification} = require("../module/model"),
    router = express.Router();

router.get("/:year", (req, res) => {
    (async () => {
        const articles = await Article.findAll({order: [['createdAt', 'DESC']], where: {href: {[Op.like]: `${req.originalUrl}%`}}});
        res.json(articles);
    })();
});

router.get("/:year/:month", (req, res) => {
    (async() => {
        const articles = await Article.findAll({order: [['createdAt', 'DESC']], where: {href: {[Op.like]: `${req.originalUrl}%`}}});
        res.json(articles);
    })();
});

router.get("/:id/comments", (req, res) => {
    
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

router.get("/:year/:month/:day/:name.html", (req , res) => {
    (async() => {
        const article = await Article.findOne({where: {href: req.originalUrl}}),
            [tags, comments, prevArticle, nextArticle] = await Promise.all([
                Tag.findAll({where: {article_id: article.id}}),
                Comment.findAll({order: [['createdAt', 'ASC']],where: {article_id: article.id}}),
                Article.findOne({order: [['id', 'DESC']], attributes: ["title", "href"], where: {id: {[Op.lt]: article.id}}}),
                Article.findOne({order: [['id', 'ASC']], attributes: ["title", "href"], where: {id: {[Op.gt]: article.id}}})
            ]);
        article.tags = tags;
        article.content = article.content.replace(/-\$-/g, "&");
        res.render("article", {article, comments, prevArticle, nextArticle, title: `${article.title} | Merry's Blog`});
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

router.post("/:id/comment", (req, res) => {
    (async () => {
        const date = new Date(),
            article_id = req.params.id,
            {name, email, website, content} = req.body,
            href = website ? (website.startsWith("http://") ? website : `http://${website}`) : "#",
            comment = await Comment.create({href, name, time: getTimeString(date), content: content.replace(/\n/g, "<br />"), article_id});
        res.json({
            msg: comment ? "success" : "fail"
        });
    })();
});

module.exports = router;