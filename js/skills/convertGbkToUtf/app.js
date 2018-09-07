const path = require('path')
const express = require('express')
const iconvLite = require('iconv-lite')
const http = require('http')
const fs = require('fs')
const app = express()
const url = 'http://sznbs.imwork.net/erpIndexAction.do?act=getCard&keyword=1808110004'

// mode one
http.get(url, res => {
	res.pipe(iconvLite.decodeStream('gbk')).collect(function(err, data) {
	    console.log(`mode one: ${data}`)
  	});
})

// mode two
http.get(url, res => {
	const chunks = []
	res.on('data', chunk => chunks.push(chunk))
	res.on('end', () => {
    	const data = iconvLite.decode(Buffer.concat(chunks), 'gbk');
		console.log(`mode two: ${data}`)
	})
})

app.listen(3000, () => console.log('app start at port 3000...'))
