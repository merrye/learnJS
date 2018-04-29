// Thunk function
{
    let thunk = function (){
        return x + 5;
    };
    // function f(thunk){
    //     return thunk() * 2;
    // };

    // Thynk 转换器
    const Thunk = function(fn){
        return function(...args){
            return function(callback){
                return fn.call(this , ...args , callback);
            };
        };
    };
    function f(a , cb){
        cb(a);
    };
    const ft = Thunk(f);
    // ft(1)(console.log);

    // Thunkify module
    function thunkify(fn){
        return function(){
            let args = new Array(arguments.length),
                ctx = this;
            for(let i = 0;i < args.length;++ i){
                args[i] = arguments[i];
            };
            return function(done){
                let called;
                args.push(function(){
                    if(called) return;
                    called = true;
                    done.apply(null , arguments);
                });
                try{
                    fn.apply(ctx , args);
                }catch(err){
                    done(err);
                };
            };
        };
    };
    function f3(a ,b ,callback){
        let sum = a + b;
        callback(sum);
        callback(sum);
    };
    let fty = thunkify(f3),
        print = console.log.bind(console);
    // fty(1 , 2)(print);
}

// co module
{
    
}