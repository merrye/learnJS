const express = require('express'),
    app = express();

app.get('/',(req,res)=>{
    res.send('<h1>Hello, World!</h1>');
});

app.listen(3000);

console.log('apo started at port 3000...');