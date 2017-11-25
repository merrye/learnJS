const model = require("../module/model"),
    {Tag , Image , Article} = model;

async function getArticleCount(){
    return await Article.count();
};

async function getSortArticlesList(currentIndex){
    const arr = [],
        article_list = await Article.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 10,
            offset: 10 * (currentIndex - 1),
        });
    [...article_list].forEach((ele) => {
        arr.push((async ele => await Tag.findAll({where: {article_id: ele.id}}))(ele));
    });
    const [r , count] = await Promise.all([arr , getArticleCount()]);
    [...article_list].forEach((ele , index) => {
        ele.tags = r[index];
    });
    return {article_list,count};
};

async function getDateSortArticlesList(currentIndex){
    const articles_list = [],
        dateSet = new Set(),
        {article_list , count} = await getSortArticlesList(currentIndex);
    [...article_list].forEach(currentValue => {
        dateSet.add(currentValue.createdAt.split("/")[0]);
    });
    [...dateSet].forEach((currentValue , index) => {
        articles_list.push({
            [currentValue]: []
        });
        article_list.forEach(article => {
            article.createdAt.includes(currentValue) && articles_list[index][currentValue].push(article);
        });
    });
    return {articles_list , count};
};

module.exports = {
    getSortArticlesList,
    getDateSortArticlesList
};