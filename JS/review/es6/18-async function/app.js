// basic usage
{
    async function timeout(ms){
        await new Promise((resolve) => {
            setTimeout(resolve , ms);
        });
    };
    async function asyncPrint(value , ms){
        await timeout(ms);
        console.log(value);
    };
    // asyncPrint('Hello world', 50);
}

// grammer
{
    // return Promise Object
    async function f(){
        return 'Hello world';
    };
    // f().then(v => console.log(v));
}

// async function implement
{
    // async function fn(args){};
    // 等同于
    // function fn(args){
        // return spawn(function* (){

        // })
    // };

    function spawn(genF){
        return new Promise(function(resolve , reject){
            let gen = genF();
            function step(nextF){
                try{
                    let next = nextF();
                } catch(e){
                    return reject(e);
                };
                if(next.done){
                    return resolve(next.value);
                };
                Promise.resolve(next.value).then(function(v){
                    step(function(){return gen.next(v);});
                }, function(e){
                    step(function(){return gen.throw(e);});
                });
            };
            step(function(){return gen.next(undefined);});
        });
    };
}

// Async Iterator
{
    // async generator function
    // async function* asyncGenerator(){
    //     console.log('Start');
    //     const result = await doSomethingAsync();
    //     yield 'Result: ' + result;
    //     console.log('Done');
    // };
    // const ag = asyncGenerator();
    // ag.next().then(({value , done}) => {
    //     conole.log(value , done);
    // });
}