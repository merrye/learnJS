const http = require('http'),
    https = require('https'),
    fs = require('fs'), 
    option = {
        // hostname: 'nodejs.cn',
        // path: '/api/',
        hostname: 'www.cnblogs.com',
        path: '/',
        port: 80,
        headers: {
            // 设置编码格式
            "content-Length": 'utf-8'
        }
    };
//  https port 443 

// 向外发起http get请求
http.get(option, (res) => {
    let html = '';
    // 请求返回数据时触发
    res.on('data' , (d) => {
        html += d;
    });

    // 请求结束时触发
    res.on('end' , () => {
        console.log(html)
    });
});

https.get('https://www.lendgiant.cn//plat/pcindex/images/banner.png' , (res) => {
    // 请求图片设置二进制数据
    res.setEncoding('binary');
    let img = '';
    res.on('data' , (d) => {
        img += d;
    });
    
    res.on('end' , () => {
        // img = Buffer.from(img , 'utf-8');
        fs.writeFile('./1.png' , img , 'binary');
    })
});