const express = require("express"),
    model = require("../module/model"),
    {Article , Tag} = model,
    router = express.Router();

router.get("/" , (req , res) => {
    
});

router.get("/:tag" , (req , res) => {
    ((async () => {
        const tag = req.params.tag,
            tags = await Tag.findAll({
                where: {
                    content: tag
                }
            }),
            pArr = [];
        [...tags].forEach(ele => {
            pArr.push((async (ele) => {
                return await Article.findById(ele.article_id);
            })(ele));
        });
        const articles = await Promise.all(pArr),
            dateSet = new Set(),
            articles_list = [];
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
        res.render("tag" , {
            tag,
            articles_list,
            length: articles.length,
            title: `${tag} | Merry's Blog`,
        });
    }))();
});    

module.exports = router;