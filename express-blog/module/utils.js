const fs = require("fs"),
    path = require("path"),
    formidable = require("formidable"),
    {Tag , Image , Article} = require("../module/model");

function objForEach(obj, fn) {
    let result;
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            result = fn.call(obj, key, obj[key]);
            if(result === false) {
                break;
            };
        };
    };
};

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

async function getUploadImageData(req) {
    const imgLinks = [],
        form = new formidable.IncomingForm();
    return await new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
            if(err) {
                reject(err);
            };
            const storePath = path.resolve(process.cwd(), "static/images/upload/articles-image");
            if(!fs.existsSync(storePath)) {
                fs.mkdirSync(storePath);
            };
            objForEach(files, (name, file) => {
                const tempFilePath = file.path,
                    date = new Date(),
                    fileName = date.getTime(),
                    fullFileName = path.join(storePath, fileName),
                    readStream = fs.createReadStream(tempFilePath),
                    writeStream = fs.createWriteStream(fullFileName);
                readStream.pipe(writeStream);
                readStream.on("end", function() {
                    fs.unlinkSync(tempFilePath);
                });
                imgLinks.push(`/images/upload/articles-image/${date.toLocaleDateString}/${fileName}`);
            });
            resolve({
                errno: 0,
                data: imgLinks
            });
        });
    });
};

async function createModelArray(obj, model, options) {
    const arr = [];
    obj.split(";").forEach(element => {
        if(element !== "") {
            arr.push((async element => await model.create(Object.assign({}, {content: element}, options)))(element));
        };
    });
    return arr;
};

module.exports = {
    createModelArray,
    getUploadImageData,
    getSortArticlesList,
    getDateSortArticlesList
};