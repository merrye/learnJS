const eventproxy = require('eventproxy'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    url = require('url'),
    cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
    .end((err,res)=>{
        if(err){
            return console.log(err);
        };
        let topicUrls = [],
            $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each((idx,ele)=>{
            let $ele = $(ele),
                href = url.resolve(cnodeUrl,$ele.attr('href'));
            topicUrls.push(href);
        });
        const ep = new eventproxy();
        ep.after('topic_html',topicUrls.length,(topics)=>{
            topics = topics.map((topicPair)=>{
                let topicUrl = topicPair[0],
                    topicHtml = topicPair[1],
                    $ = cheerio.load(topicHtml);
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment1: $('.reply_content').eq(0).text().trim()
                });
            });
            console.log('final:');
            console.log(topics);
        });
        topicUrls.forEach((topicUrl)=>{
            superagent.get(topicUrl)
                .end((err,res)=>{
                    console.log(`fetch ${topicUrl} successful`);
                    ep.emit('topic_html',[topicUrl,res.text]);
                });
        });
    });