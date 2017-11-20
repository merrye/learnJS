const express = require('express'),
    utility = require('utility'),
    app = express();

app.get('/',(req,res)=>{
    let q = req.query.q;
    let md5 = utility.md5(q);
    res.send(md5);
});

app.listen(3000,(req,res)=>{
    console.log('app started at port 3000...');
});