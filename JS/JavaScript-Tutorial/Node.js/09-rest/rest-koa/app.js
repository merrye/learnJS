const Koa = require('koa'),
    bodyparser = require('koa-bodyparser'),
    controller = require('./controller'),
    templating = require('./templating'),
    rest = require('./rest'),
    app = new Koa();

// log request URL:
app.use(async(ctx, next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// static file support:
let staticFiles = require('./static-files');
app.use(staticFiles('/static/',__dirname + '/static'));

// parser request body
app.use(bodyparser());

// add nunjucks as view:
 app.use(templating('views',{
     noCache: true,
     watch: true
 }));

//  bind .rest() for ctx:
app.use(rest.restify());

app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');