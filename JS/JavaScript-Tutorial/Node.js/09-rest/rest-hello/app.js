const Koa = require('koa'),
    bodyparser = require('koa-bodyparser'),
    controller = require('./controller'),
    app = new Koa();

app.use(bodyparser());

app.use(controller());

app.listen(3000);

console.log('app started at port 3000...');