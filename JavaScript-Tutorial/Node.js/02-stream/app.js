const fs = require('fs');

// 以流的形式读取文件
// let rs = fs.createReadStream('sample.txt','utf-8');

// rs.on('data',(chunk)=>{
//     console.log('data');
//     console.log(chunk);
// });

// rs.on('end',()=>{
//     console.log('end');
// });

// rs.on('error',(err)=>{
//     console.log(err);
// });

// 以流的形式写入文件
let ws = fs.createWriteStream('output.txt','utf-8');
ws.write('使用Stream写入文本数据...\n');
ws.write('END');
ws.end();

let ws2 = fs.createWriteStream('output2.txt');
ws2.write(new Buffer('使用Stream写入二进制数据...\n','utf-8'));
ws2.write(new Buffer('END','utf-8'));
ws2.end();

// 使用pipe把读取到的内容写入目标文件中
// let rs = fs.createReadStream('sample.txt');
// let ws = fs.createWriteStream('copied.txt');

// rs.pipe(ws);