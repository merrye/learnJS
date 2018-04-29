// fs -> file system 文件系统 操作文件
 const fs = require('fs');

// 打开文件 文件不存在会创建这个文件    可以检测文件是否存在
// fs.open('./package.json','wx',(err,data)=>{
//     console.log(data);
// });

// 删除文件
// fs.unlink('./3.txt');

// 创建文件夹
// fs.mkdir('./merry');

// 删除文件夹
// fs.rmdir('./merry');

// 读取文件信息
// fs.stat('./app.js',(err,data)=>{
//     console.log(data);
// });

// 检测文件是否可读 / 可写
// fs.access('./app.js',fs.constants.R_OK | fs.constants.W_OK,(err,data)=>{
//     console.log(err);
//     console.log(data);
// });

// 把数据追加到文件里
// fs.appendFile('./app.js','new content',(err,data)=>{
//     console.log(data);
// });

// 把原有的替换掉
// fs.writeFile('./app.js','new content',(err,data)=>{
// });

// 读取文件内容
// fs.readFile('./app.js','utf-8',(err,data)=>{
//     console.log(data);
// });

// 读取文件夹    readdir     readdirSync -> 加Sync表示同步
// fs.readdir('./public',(err,data)=>{
//     console.log(data);
// });

// let data = fs.readdirSync('./public');
// console.log(data);

// 文件重命名
// fs.rename('./aapp.js','app.js',(err,data)=>{
//     console.log(data);
// });