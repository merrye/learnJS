const fs = require('fs');

// 异步读文件
// fs.readFile('sample.txt','utf-8',(err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//         console.log(data.length + 'bytes');
//     };
// });

// fs.readFile('sample.png',(err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//         console.log(data.length + 'bytes'); // 文件大小
//     };
// });

// let text = 'I am a string';
// let buf = new Buffer(text,'utf-8');
// String -> Buffer
// console.log(buf);
// Buffer -> String
// console.log(buf.toString('utf-8'));

// 写文件
// let data = 'Hello, Node.js';
// fs.writeFile('output.txt',data,(err,data)=>{
//     console.log(err?err:'OK');
// });

// 在文件后面追加内容
// fs.appendFile('./output.txt','\nI ama new content.',(err,data)=>{
//     console.log(data);
// });

// 读取文件信息
// fs.stat('sample.txt',(err,stat)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(stat);
//         console.log('isFile: ' + stat.isFile());
//         console.log('isDirectory: ' + stat.isDirectory());
//         if(stat.isFile()){
//             console.log('size: ' + stat.size);
//             console.log('birth time: ' + stat.birthtime);
//             console.log('modified time: ' + stat.mtime);
//         };
//     };
// });

// 打开 / 删除文件
// fs.open('./output.txt','utf-8',(err,data)=>{  // 假若文件不存在会创建
//     console.log(data);
// });    
// fs.unlink('./sample.jpg');

// 创建 / 删除 文件夹
// fs.mkdir('./Merry'); 
// fs.rmdir('./Merry');

// 读取文件夹
// fs.readdir('./.vscode',(err,data)=>{
//     console.log(data);
// });

// 文件的重命名
fs.rename('./output.txt','out.txt');