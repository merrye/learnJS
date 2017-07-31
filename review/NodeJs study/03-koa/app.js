const Koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    isProduction = process.env.NODE_ENV === 'production',
    controller = require('./controller'),
    templating = require('./templating'),
    app = new Koa();

// 记录URL以及页面执行的时间
app.use(async (ctx , next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    let start = new Date().getTime(),
        exeTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time' , `${execTime}`);
});

// 处理静态文件
if(!isProduction){
    let staticFiles = require('./static-files.js');
    app.use(staticFiles('/static/' , __dirname + '/static'));
};

// 处理POST请求
app.use(bodyParser());

// templatimg
app.use(templating('views' , {
    noCache: !isProduction,
    wathc: !isProduction,
}));

// router
app.use(controller());

app.listen(3000);