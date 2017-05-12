const cheerio = require('cheerio'),
    superagent = require('superagent'),
    express = require('express'),
    app = express();

app.get('/',(req,res,next)=>{
    // 用 superagent 去抓取 https://cnodejs.org/ 的内容
    superagent.get('https://cnodejs.org/')
        .end((err,sres)=>{
            if(err){
                return next(err);
            };
            let $ = cheerio.load(sres.text),
                items = [];
            $('#topic_list .topic_title').each((idx,element)=>{
                let $element = $(element);
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href'),
                });
            });
            $('#topic_list .user_avatar').each((idx,ele)=>{
                let $ele = $(ele);
                    author = $ele.attr('href').split('/')[2];
                items[idx].author = author;
            });
            res.send(items);
        });
});

app.listen(3000,(req,res)=>{
    console.log('app started at port 3000...');
});