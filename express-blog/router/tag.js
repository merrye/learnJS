const express = require("express"),
    model = require("../module/model"),
    {Article , Tag} = model,
    router = express.Router();

router.get("/" , (req , res) => {
    (async () => {
        const pArr = [],
            tagArr = []
            tag_set = new Set(),
            tags = await Tag.findAll({attributes: ["content"]});
        tags.forEach(ele => tag_set.add(ele.content));
        [...tag_set].forEach(ele => {
            tagArr.push({
                content: ele
            });
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
            tag = req.params.tag,
            tags = await Tag.findAll({
                where: {
                    content: tag
                }
            });
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
            [...dateSet].forEach((date , index) => {
                articles_list.push({
                    [date]: []
                });
                articles.forEach(article => {
                    if(article.createdAt.includes(date)){
                        articles_list[index][date].push(article);
                    };
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