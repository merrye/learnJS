const http = require('http'),
    url = require('url'),
    path = require('path');

// let server = http.createServer((req,res)=>{
//     console.log(req.method + ' : ' + req.url);
//     res.writeHead(200,{
//         'Content-Type': 'text/html'
//     });
//     res.end('<h1>Hello world!</h1>');
// });

// server.listen(3000);

// console.log('Server is running at http://127.0.0.1:3000/');

// 解析url
// console.log(url.parse('http://user:pass@host.com:8080/path/tofile?query=string#hash'));

// 构造目录

// 解析当前目录
// let workDir = path.resolve('.');
// console.log(workDir);
// let filePath = path.join(workDir,'pub','index.html');
// console.log(filePath);