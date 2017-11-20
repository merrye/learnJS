const express = require('express'),
    fibonacci = function(n){
        if(typeof n !== 'number' || isNaN(n)){
            throw Error('n should be a Number');
        }
        if(n < 0){
            throw Error('n should >= 0');
        }
        if(n > 10){
            throw Error('n should <= 10');
        }
        if(n === 0){
            return 0;
        }
        if(n === 1){
            return 1;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    };

const app = express();

app.get('/fib',(req,res)=>{
    let n = Number(req.query.n);
    try{
        res.send(String(fibonacci(n)));
    }catch(e){
        res.status(500).send(e.message);
    }
});

module.exports = app;

app.listen(3000,()=>{
    console.log('app started at port 3000...');
});