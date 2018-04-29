let fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

// 从命令行参数获取root目录
let root = path.resolve(process.argv[2] || '.');
console.log(`Static root dir: ${root}`);

// 创建服务器
let server = http.createServer((req,res)=>{
    // 获取url的path，类似‘/css/bootstrap.css
    let pathName = url.parse(req.url).pathname;
    // 获得对应的本地文件路径
    let filePath = path.join(root,pathName);
    fs.stat(filePath,(err,stats)=>{
        if(err){
            console.log(`Error: ${err}`);
            res.writeHead(404);
            res.end(`Error: ${err}`);
        }else{
            if(stats.isFile()){
                // 没有出错并且文件存在
                console.log('200 ' + req.url);
                // 发送200响应
                res.writeHead(200,{
                    'Content-Type': 'text/html'
                });
                // 将文件流向res
                fs.createReadStream(filePath).pipe(res);
            }else if(stats.isDirectory()){
                fs.readdir(filePath,(err,data)=>{
                    if(err){
                        console.log(`Error: ${err}`);
                        res.writeHead(404);
                        res.end(`Error: ${err}`);
                    }else{
                        let d = data.find((value,index)=>{
                            return value === 'index.html' || value === 'default.html';
                        });
                        if(d){
                            let filepath = path.join(filePath,d);
                            fs.createReadStream(filepath).pipe(res);
                        }else{
                            res.writeHead(404);
                            res.end('404 Not Found');
                        };
                    };
                });
            }else{
                console.log('404 ' + req.url);
                res.writeHead(404);
                res.end('404 Not Found');
            };
        };
    });
});

server.listen(3000,function(){
    console.log('Server is running at http://127.0.0.1:3000/');
});