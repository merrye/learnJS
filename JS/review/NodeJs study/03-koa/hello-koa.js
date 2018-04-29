const Koa = require('koa'),
    app = new Koa();

app.use(async (ctx , next) => {
    await next();
    ctx.response.type = "text/html";
    ctx.response.body = '<h1>Hello , world!</h1>';
});

app.listen(3000);