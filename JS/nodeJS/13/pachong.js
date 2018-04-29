const http = require('http'),
    https = require('https'),
    fs = require('fs');

// 向外发起http get请求
// http.get('http://nodejs.cn/',(res)=>{
//     let html = '';
//     // 当请求有数据的时候触发
//     res.on('data',function(data){
//         html += data;
//     });
//     // 当请求完成的时候触发
//     res.on('end',function(){
//         console.log(html);
//     });
// });

let options = {
    hostname: 'www.cnblogs.com',
    path: '/',
    // port: '80', https的端口为443
    headers: {
        // 设置编码格式
        // 'Content-Length': 'utf-8'
    }
};
// http.get(options,(res)=>{
//     let html = '';
//     // 当请求有数据的时候触发
//     res.on('data',function(data){
//         html += data;
//     });
//     // 当请求完成的时候触发
//     res.on('end',function(){
//         console.log(html);
//     });
// });

https.get('https://lendgiant.cn/plat/pcindex/images/banner.png',(res)=>{
    // 请求图片的时候设置编码格式为二进制
    res.setEncoding('binary');
    let img = '';
    // 当请求有数据的时候触发
    res.on('data',function(data){
        img += data;
    });
    // 当请求完成的时候触发
    res.on('end',function(){
        fs.writeFile('./1.png',img,'binary');
    });
});