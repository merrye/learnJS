const express = require("express"),
    {Tag , User , Image , Article, Classification} = require("../module/model"),
    {getUploadImageData, getSortArticlesList} = require("../module/utils"),
    router = express.Router();

router.get("/", (req, res) => {
    (async () => {
        const set = new Set(),classificationArr = [], pArr = [],
            classifications = await Classification.findAll({
                attributes: ["content", "href"],
            });
        let hrefSet = new Set();
        classifications.forEach(element => {
            console.log(element);
            console.log(element.href);
            set.add(element.content);
            hrefSet.add(element.href);
        });
        console.log(hrefSet);
        hrefSet = [...hrefSet];
        [...set].forEach((element, index) => {
            classificationArr.push({content: element, href: hrefSet[index]});
            pArr.push((async element => await Classification.count({where: {content: element}}))(element));
        });
        console.log(classificationArr);
        const countArr = await Promise.all(pArr);
        countArr.forEach((ele,index) => classificationArr[index].count = ele);
        res.render("classification", {
            classificationArr,
            title:  "分类 | Merry's Blog"
        });
    })();
});


module.exports = router;