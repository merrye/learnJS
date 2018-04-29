// Promise.all()
{
    // p2 自定义了catch method 所以被rejected 不会触发Promise.all()的catch method
    const p1 = new Promise((resolve , reject) => {
            resolve('hello');
        }).then(result => result).catch(e => e),
        p2 = new Promise((resolve , reject) => {
            // throw new Error('报错了');
        }).then(result => result).catch(e => e);

    // Promise.all([p1 , p2]).then(result => console.log(result)).catch(e => console.log(e));

    // 第二个promise没有自己的catch method 所以会调用Promise.all()的catch method
    const p3 = new Promise((resolve , reject) => {
            resolve('hello');
        }).then(result => result),
        p4 = new Promise((resolve , reject) => {
            // throw new Error('报错了');
            // resolve('World');
        }).then(result => result);
    // Promise.all([p3 , p4]).then(result => console.log(result)).catch(e => console.log(e));
}

// Promise.resolve()
{
    // setTimeout(() => console.log(3) , 0);
    // Promise.resolve().then(() => console.log(2));
    // console.log(1);

    // setTimeout在下轮"事件循环"开始时执行     Promise在本轮事件"循环结束"时执行 console.log()则是立即执行
}

// 附加方法
{
    // done
    Promise.prototype.done = function(onFulfilled , onRejected) {
        this.then(onFulfilled , onRejected)
            .catch(reason => {
                setTimeout(() => {
                    throw reason;
                },0);
            });
    };

    // finally()
    Promise.prototype.finally = function(callback){
        let P = this.constructor;
        return this.then(
            value => P.resolve(callback()).then(() => value),
            reason => P.resolve(callback()).then(() => {throw reason})
        );
    };
}

// 应用
{
    // Generator and Promise
    function getFoo(){
        return new Promise((resolve , reject) => {
            resolve('foo');
        });
    };
    let g = function* (){
        try{
            let foo = yield getFoo();
            console.log(foo);
        } catch(e){
            console.log(e);
        }
    };
    function run(generator){
        let it = generator();
        function go(result){
            if(result.done){
                return result.value;
            };
            return result.value.then((value) => {
                return go(it.next(value));
            } , (error) => {
                return go(it,thrwo(error));
            });
        };
        go(it.next());
    }
    run(g);
}