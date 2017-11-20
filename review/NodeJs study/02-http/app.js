const fs = require('fs'),
    url = require('url'),
    http = require('http'),
    path = require('path');

// let server = http.createServer((req , res) => {
//     console.log(req.method + ' : ' + req.url);
//     res.writeHead(200 , {
//         'Content-Type': 'text/html'
//     });
//     res.end('<h1>Hello , World.</h1>');
// });
// server.listen(3000);

// 解析url
// console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

let root = path.resolve(process.argv[2] || '.');
console.log('Static root dir: ' + root);
let server = http.createServer((req , res) => {
    let pathname = url.parse(req.url).pathname,
        filepath = path.join(root , 'static' , pathname);

    fs.stat(filepath , (err , data) => {
        console.log(filepath);
        if(!err && data.isFile()){
            console.log('200 ' + req.url);
            res.writeHead(200);
            fs.createReadStream(filepath).pipe(res);
        }else{
            console.log('404 ' + req.url);
            res.writeHead(404);
            res.end('404 Not Found.');
        };
    });
});
server.listen(3000);