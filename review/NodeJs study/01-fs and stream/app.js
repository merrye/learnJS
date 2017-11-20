const fs = require('fs');

// 读取文件
// fs.readFile('sample.txt' , 'utf-8' , (err , data) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     };
// });

// fs.readFile('demo.png' , (err , data) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//         // console.log(data.length + 'bytes');
//     };
// });

// Buffer ---> String
// let txt = data.toString('utf-8');
// console.log(txt);

// String ---> Buffer
// let buf = new Buffer('text' , 'utf-8');
// console.log(buf);

// 写文件
// let data = 'Hello , Node.js';
// fs.writeFile('output.txt' , data , (err) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log('ok');
//     };
// });

// stat
// fs.stat('sample.txt' , (err , data) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log('isFile: ' + data.isFile());
//         console.log('isDirectory: ' + data.isDirectory());
//         // console.log(data);
//         if(data.isFile()){
//             console.log('size: ' + data.size);
//             console.log('birth time: ' + data.birthtime);
//             console.log('modified time: ' + data.mtime);
//         };
//     };
// });

// 以流的形式读取文本内容
// let rs = fs.createReadStream('sample.txt' , 'utf-8');
// rs.on('data' , (chunk) => {
//     console.log(chunk);   
// });

// rs.on('end' , () => {
//     console.log('end');
// });

// rs.on('error' , (err) => {
//     console.log('Error: ' + err);
// });

// 以流的形式把内容写入文件
// let ws1 = fs.createWriteStream('output.txt' , 'utf-8');
// ws1.write("use stream to write txt...\n");
// ws1.write('end');
// ws1.end();

// let ws2 = fs.createWriteStream('output1.txt' , 'utf-8');
// ws2.write(new Buffer("use stream to write binary content...\n") , 'utf-8');
// ws2.write(new Buffer('end') , 'utf-8');
// ws2.end();

// pipe
let rs = fs.createReadStream('sample.txt'),
    ws = fs.createWriteStream("copied.txt");

rs.pipe(ws);