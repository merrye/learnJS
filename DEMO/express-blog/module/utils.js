const fs = require("fs"),
    path = require("path"),
    crypto = require("crypto"),
    fetch = require("node-fetch"),
    formidable = require("formidable"),
    {Tag , Image , Article} = require("../module/model"),
    appid = "2015063000000001",
    key = "12345678",
    from = "zh",
    to = "en",
    getTranslateUrl = "http://api.fanyi.baidu.com/api/trans/vip/translate?";

function addZero(num) {
    return (Number(num) < 10 ? "0" : "") + num; 
};

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

function getTimeString(date) {
    return `${date.toLocaleDateString().split("-").map(addZero).join("/")} ${date.getHours()}:${addZero(date.getMinutes())}`;
};

async function getArticleCount() {
    return await Article.count();
};

async function getSearchList(model) {
    const set = new Set(),
        pArr = [], list = [],
        tags = await model.findAll({order: [['content']]});
    let hrefSet = new Set();
    tags.forEach(ele => {
        set.add(ele.content);
        hrefSet.add(ele.href);
    });
    hrefSet = [...hrefSet];
    [...set].forEach((ele, index) => {
        list.push({content: ele, href: hrefSet[index]});
        pArr.push((async ele => await model.count({where: {content: ele}}))(ele));
    });
    const countArr = await Promise.all(pArr);
    countArr.forEach((ele,index) => list[index].count = ele);
    return list;
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
                    fileType = file.name.slice(file.name.lastIndexOf(".")),
                    date = new Date(),
                    fileName = date.getTime().toString(),
                    fullFileName = path.join(storePath, fileName) + fileType,
                    readStream = fs.createReadStream(tempFilePath),
                    writeStream = fs.createWriteStream(fullFileName);
                readStream.pipe(writeStream);
                readStream.on("end", function() {
                    fs.unlinkSync(tempFilePath);
                });
                imgLinks.push(fullFileName.replace(/^.+static\\/, ""));
            });
            resolve({
                errno: 0,
                data: imgLinks
            });
        });
    });
};

async function getSortArticlesList(currentIndex) {
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

async function getArticlesBySearch(search, model) {
    const pArr = [],
        articles_list = new Map(),
        models = await model.findAll({where: {href: search}});
    const con = models[0].content;
    [...models].forEach(ele => pArr.push((async ele => await Article.findById(ele.article_id))(ele)));
    const articles = await Promise.all(pArr),
        count = articles.length;
    articles.sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt)).forEach(element => {
        const year = element.createdAt.split("/")[0];
        articles_list.has(year) ? articles_list.get(year).push(element) : articles_list.set(year, [element]);
    });
    return {
        con,
        count,
        articles_list: [...articles_list]
    };
};

async function getDateSortArticlesList(currentIndex) {
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

async function createModelArray(str, model, options) {
    const arr = [],
        spaceReg = /\s+/g,
        contentReg = /^\w+$/g,
        splitReg = /，|；|,|;/g;
    str.split(splitReg).forEach(element => {
        (async () => {
            const content = element.trim();
            if(content) {
                const tag = await Tag.findOne({where: {content}});
                let href = "";
                if(!tag) {
                    if(contentReg.test(content)) {
                        href = content;
                    }else{
                        const salt = (new Date).getTime(),
                            query = content,
                            str = appid + query + salt + key,
                            sign = crypto.createHash("md5").update(str).digest("hex"),
                            {trans_result} = await fetch(`${getTranslateUrl}q=${encodeURI(query)}&appid=${appid}&salt=${salt}&from=${from}&to=${to}&sign=${sign}`).then(res => res.json());
                        href = trans_result[0].dst;
                    };
                    href = href.replace(spaceReg, "-").toLowerCase();
                }else{
                    href = tag.href;
                };
                arr.push((async element => await model.create(Object.assign({}, {href, content}, options)))(element));
            };
        })();
    });
    return arr;
};

module.exports = {
    getTimeString,
    getSearchList,
    createModelArray,
    getUploadImageData,
    getSortArticlesList,
    getArticlesBySearch,
    getDateSortArticlesList,
};