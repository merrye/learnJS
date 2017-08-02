const Koa = require('koa'),
    rest = require('./rest'),
    controller = require('./controller'),
    templating = require('./templating'),
    bodyParser = require('koa-bodyparser'),
    staticFiles = require('./static-files'),
    app = new Koa();

app.use(async (ctx , next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(staticFiles('/static' , __dirname + '/static/'));

app.use(bodyParser());

app.use(templating('views' , {
    noCache: true,
    watch: true
}));

app.use(rest.restify());

app.use(controller());

app.listen(3000);