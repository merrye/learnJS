const express = require("express"),
    model = require("../module/model"),
    {Article , Tag} = model,
    router = express.Router();

router.get("/" , (req , res) => {
    (async () => {
        const pArr = [], tagArr = [],
            tagSet = new Set(),
            tags = await Tag.findAll({
                attributes: ["content", "href"],
                order: [
                    ['content']
                ],
            });
        let hrefSet = new Set();
        tags.forEach(ele => {
            tagSet.add(ele.content);
            hrefSet.add(ele.href);
        });
        hrefSet = [...hrefSet];
        [...tagSet].forEach((ele, index) => {
            tagArr.push({content: ele, href: hrefSet[index]});
            pArr.push((async ele => await Tag.count({where: {content: ele}}))(ele));
        });
        const countArr = await Promise.all(pArr);
        countArr.forEach((ele,index) => tagArr[index].count = ele);
        res.render("tag_list" , {
            tagArr,
            title:  "标签 | Merry's Blog"
        });
    })();
});

router.get("/:tag" , (req , res) => {
    ((async () => {
        const pArr = [],
            href = req.params.tag,
            tags = await Tag.findAll({
                where: {
                    href
                }
            });
        const tag = tags[0].content;
        [...tags].forEach(ele => {
            pArr.push((async ele => await Article.findById(ele.article_id))(ele));
        });
        const articles = await Promise.all(pArr),
            length = articles.length;
            dateSet = new Set(),
            articles_list = [];
        if(length){
            articles.sort((x , y) => {
                const xTime = new Date(x.createdAt).getTime();
                return new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime();
            }).forEach(ele => {
                dateSet.add(ele.createdAt.split("/")[0]);
            });
            [...dateSet].forEach((currentValue , index) => {
                articles_list.push({[currentValue]: []});
                articles.forEach(article => {
                    article.createdAt.includes(currentValue) && articles_list[index][currentValue].push(article);
                });
            });
        };
        res.render("tag" , {
            tag,
            length,
            articles_list,
            title: `${tag} | Merry's Blog`,
        });
    }))();
});    

module.exports = router;