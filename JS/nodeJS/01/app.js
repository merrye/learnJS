// JavaScript source code
//用来创建http服务器的
const http = require('http');
http.createServer(function (request,response) {
    //request   请求对象    浏览器请求服务器所有的内容保存在这个对象里
    //response  响应对象    服务器响应到浏览器所有的方法
    response.writeHead(200, { 'Content-Type': 'text/html' });
    //结束响应  同时发送Hello World
    response.end('Hello World!');
}).listen(233);
//  .listen 监听端口
//如果开启了node服务 修改完之后的代码 要重启node服务器后才能生效