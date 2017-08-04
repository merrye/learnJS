// 1.函数参数的默认值
{
    // 基本用法
    // 1.函数中不能用 let/const 再次声明
    // 2.不能有同名参数
    function log(x , y = 'World'){
        console.log(x , y);
    };
    // log('hello');

    // 与解构赋值默认值结合使用
    function log({x , y} = {y: 'World'}){
        return [x , y];
    };
}

// 4.name
{
    function foo(){};
    // console.log(foo.name);
}

// 5.箭头函数
{   
    const pipeline = (...funcs) =>
            val => funcs.reduce((a , b) => b(a) , val),
        plus1 = a => a + 1,
        mult2 = a => a * 2,
        addThenMult = pipeline(plus1 , mult2);
    // console.log(addThenMult(5));
}

// 7.尾调用优化
{
    function Fibonacci(n){
        return n <= 1 ? 1 : (Fibonacci(n - 1) + Fibonacci(n - 2));
    };
    // console.log(Fibonacci(100));     // stack overflow
    function Fib(n , ac1 = 1, ac2 = 1){
        return n <= 1 ? ac2 : Fib(n - 1 , ac2 , ac1 + ac2);
    };
    // console.log(Fib(100));
    function f(n){
        return n === 1 ? 1 : n * f(n - 1)
    };
    function F(n , total = 1){
        return n === 1 ? total : F(n - 1 , total * n)
    };
    // console.time(1)
    // console.log(f(20));
    // console.timeEnd(1)
    // console.time(1)
    // console.log(F(20));
    // console.timeEnd(1)
   
    // 尾递归优化的实现
    // 蹦床函数
    function tco(f){
        let value,
            active = false,
            accumulated = [];
        return function accumulator(){
            accumulated.push(arguments);
            if(!active){
                active = true;
                while(accumulated.length){
                    value = f.apply(this,accumulated.shift());
                };
                active = false;
                return value;
            };
        };
    };

    let sum = tco(function(x , y){
        return y > 0 ? sum(x + 1,y -1) : x;
    });
    console.log(sum(1 , 5));
}