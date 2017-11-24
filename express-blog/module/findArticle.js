const model = require("../module/model"),
    {Tag , Image , Article} = model;

async function getCount(){
    return await Article.count();
};

async function Template(currentIndex){
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
    const [r , count] = await Promise.all([arr , getCount()]);
    [...article_list].forEach((ele , index) => {
        ele.tags = r[index];
    });
    return {article_list,count};
};

module.exports = Template;