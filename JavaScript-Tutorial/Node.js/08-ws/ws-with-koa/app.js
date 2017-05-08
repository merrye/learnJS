const url = require('url'),
    ws = require('ws'),
    Cookie = require('cookies'),
    Koa = require('koa'),
    bodyparser = require('koa-bodyparser'),
    controller = require('./controller'),
    templating = require('./templating'),
    WebSocketServer = ws.Server,
    app = new Koa();

app.use(async(ctx,next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(async(ctx,next)=>{
    ctx.state.user = parseUser(ctx.cookies.get('name') || '');
    await next();
});

let staticFiles = require('./static-files');
app.use(staticFiles('/static/',__dirname + '/static'));

app.use(bodyparser);

app.use(templating('views',{
    noCache: true,
    watch: true
}));

app.use(controller());

let server = app.listen(3000);

function parseUser(obj){
    if(!obj){
        return;
    };
    console.log(`try parser: ${obj}`);
    let s = '';
    if(typeof obj === 'string'){
        s = obj;
    }else if(obj.headers){
        let cookies = new cookies(obj,null);
        s = cokkies.get('name');
    };
    if(s){
        try{
            let user = JSON.parse(Buffer.from(s,'base64').toString());
        }catch(e){
            console.log(e);
        }
    };
};

function createWebSocketServer(server, onConnection , onMessage , onClose , onError){
    let wss = new WebSocketServer({
        server: server
    });
    wss.broadcast = function(data){
        wss.clients.forEach(function each(client){
            client.send(data);
        });
    };

    onConnection = onConnection || function(){
        console.log('[WebSocket] connected.');
    };

    onMessage = onMessage || function(msg){
        console.log(`[WebSocket] message received: ${msg}`);
    };

    onClose = onClose || function(code , message){
        console.log(`[WebSocket] closed: ${code} - ${message}`);
    };

    onError = onError || function(err){
        console.log(`[WebSocket] errorS: ${err}`);
    };

    wss.on('connection',(ws)=>{
        let location = url.parse(ws.upgradeReq.url,true);
        console.log(`[WebSocketServer] connection: ${location.href}`);
        ws.on('message',onMessage);
        ws.on('close',onClose);
        ws.on('error',onError);
        if(location.pathname !== '/ws/chat'){
            // close ws:
            ws.close(4000 , 'Invalid URL');
        };
        // check user:
        let user = parseUser(ws.upgradeReq);
        if(!user){
            ws.close(40001,'Invalid user');
        };
        ws.user = user;
        ws.wss = wss;
        onConnection.apply(ws);
    });
    console.log('WebSocketServer was attached.');
    return wss;
};

let messageIndex  = 0;

function createMessage(type, user, data){
    messageIndex ++;
    return JSON.stringify({
        id: messageIndex,
        type: type,
        user: user,
        data: data
    });
};

function onConnect(){
    let user = this.user,
        msg = createMessage('join',user,`${user.name} joined.`);
    this.wss.broadcast(msg);
    // build user list:
    let users = this.wss.clients.map((client)=>{
        return client.user;
    });
    this.send(createMessage('list',user,users));
};

function createMessage(message){
    console.log(message);
    if(message && message.trim()){
        let msg = createMessage('chat',this.user,message.trim());
        this.wss.broadcast(msg);
    };
};

function onClose(){
    let user = this.user,
    msg = createMessage('left',user,`${user.name} is left.`);
    thii.wss.broadcast(msg);
};

console.log('app started at port 3000...');