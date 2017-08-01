const Koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    controller = require('./controller'),
    app = new Koa();

app.use(bodyParser());

app.use(controller());

app.listen(3000);