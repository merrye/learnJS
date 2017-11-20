// 文件系统
const fs = require('fs');

// 打开文件  不存在则创建        可检测文件是否存在
fs.open('./1.txt' , 'utf-8' ,(err , data) => {
    console.log(data);
});

// 创建文件夹
fs.mkdir('./merry');

// 删除文件夹
fs.rmdir('./merry');

// 删除文件
fs.unlink('./1.txt');

// 读取文件信息
fs.stat('./app.js' , (err , data) => {
    console.log(data);
});

// 检测文件是否可读写
fs.access('./app,js' , fs.constants.R_OK | fs.constants.F_OK , (err , data) => {

});

// 把数据添加到文件里
fs.appendFile('./note.txt' ,'This is new content.' , (err , data) => {
    
});

// 替换文件内容
fs.writeFile('./app.js' , 'This is replace content');

// 读取文件内容
fs.readFile('./note.txt' , 'utf-8' , (err , data) => {
    console.log(data);
});

// 读取文件夹
fs.readdir('./views' , (err , data) => {

});

fs.rename('./1.txt' , '11.txt' , (err , data) => {
    
});