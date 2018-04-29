const Koa = require('koa'),
    bodyparser = require('koa-bodyparser'),
    controller = require('./controller'),
    templating = require('./templating'),
    app = new Koa(),
    isProduction = process.env.NODE_ENV === 'production';

app.use(async(ctx,next)=>{
    let start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    ctx.response.set('X-Response-Time', `${execTime}ms`);
    console.log();
});

if(!isProduction){
    let staticFiles = require('./static-file');
    app.use(staticFiles('/static/',__dirname + '/static'));
};

app.use(bodyparser());

app.use(templating('views',{
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(controller());

app.listen(3000);

console.log('app started at port 3000...');