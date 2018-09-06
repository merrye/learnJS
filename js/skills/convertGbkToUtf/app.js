const path = require('path')
const express = require('express')
const axios = require('axios')
const iconv = require('iconv-lite')
const http = require('http')
const fs = require('fs')
const app = express()

http.get('http://sznbs.imwork.net/erpIndexAction.do?act=getCard&keyword=1808110004', res => {
	// var chunks = []
	// res.on('data', chunk => {
	// 	chunks.push(chunk)
	// })
	// res.on('end', () => {
 //    	var data = iconv.decode(Buffer.concat(chunks), 'gbk');
	// 	console.log(data)
	// })
	res.pipe(iconv.decodeStream('gbk')).collect(function(err, decodedBody) {
	    console.log(decodedBody);
  	});
})

axios.interceptors.response.use(function (response) {
	// Do something with response data
	console.log(response)
	return response;
}, function (error) {
	// Do something with response error
	return Promise.reject(error);
});

// createGBKString()
// function createGBKString () {
// 	// const str = Buffer.from('this is test string', 'gbk')
// 	const str = Buffer.from('7468697320697320612074c3a97374', 'hex');
// 	// return str
// 	console.log(str)
// }

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if (req.method=="OPTIONS") {
    	res.send(200)
   	} else {
   		next();
   	}
});

app.get('/test', async (req, res) => {
	const { data } = await getCard(1808110004)
	res.json({ data })
})

// getCard()
function getCard () {
	axios.get('http://sznbs.imwork.net/erpIndexAction.do?act=getCard&keyword=1808110004')
		.then(({ data }) => {
			var html = iconv.decode(new Buffer(data), 'gbk')
			// console.log(html)
			// console.log(iconv.decode(data, 'gbk'))
			// fs.writeFile('output.txt', data, (err, d) => {
			// 	readFile()
			// })
		})
}

function readFile() {
	fs.readFile(path.join(__dirname + '/output.txt'), 'utf-8', (err, data) => {
		var buf = Buffer.from(data, 'utf-8');
		console.log(buf.toString('utf-8'))
	})
}

// async function getCard (card) {
// 	return axios.get('http://sznbs.imwork.net/erpIndexAction.do?act=getCard&keyword=' + card)
// }

app.listen(4000, () => console.log('app start at port 4000...'))