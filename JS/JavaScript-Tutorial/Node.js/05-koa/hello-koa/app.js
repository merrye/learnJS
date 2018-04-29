const koa = require('koa'),
    app = new koa();

// app.use(async(ctx,next)=>{
//     await next();
//     ctx.response.type = 'text/html';
//     ctx.response.body = '<h1>Hello, Koa2!</h1>';
// });

// app.listen(3000);
// console.log('app started at port 3000...');

app.use(async (ctx,next)=>{
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
});

app.use(async(ctx,next)=>{
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`Time: ${ms}ms`);
    ctx.response.set('X-Response-Time',`${ms}ms`);
});

app.use(async(ctx,next)=>{
    await next();
    ctx.response.type = 'text/html',
    ctx.response.body = '<h1>Hello, Koa2!</h1>'
});

app.listen(3000);
console.log('app started at port 3000...');