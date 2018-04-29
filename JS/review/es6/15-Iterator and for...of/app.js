// 默认 Iterator 接口
{
    // 数组原生具备Iterator接口
    let arr = ['a' , 'b' , 'c']
        iter = arr[Symbol.iterator]();
    // console.log(iter.next());
    // console.log(iter.next());
    // console.log(iter.next());
    // console.log(iter.next());
}

// 调用 Iterator 接口的场合
{
    // 解构赋值

    // ...扩展运算符

    // yield*
    let generator = function* (){
        yield 1;
        yield* [2,3,4];
        yield 5;
    },
    iterator = generator();
    // console.log(iterator.next());
    // console.log(iterator.next());
    // console.log(iterator.next());
    // console.log(iterator.next());
    // console.log(iterator.next());
    // console.log(iterator.next());
}

// string Iterator interface
{
    let str = 'Hello',
        iterator = str[Symbol.iterator]();
    // console.log(iterator.next());
    // console.log(iterator.next());
    // console.log(iterator.next());
    // console.log(iterator.next());
    // console.log(iterator.next());
    // console.log(iterator.next());
}