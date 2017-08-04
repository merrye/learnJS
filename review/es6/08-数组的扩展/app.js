// 1.扩展运算符
{
    function add(x , y){
        return x + y;
    };
    let numbers = [4 , 38];
    // console.log(add(...numbers));

    // 实现Iterator接口的对象
        // 对象要具有Iterator接口
}

// 2.Array.from()
{
    // 将类数组对象和可遍历的对象转为真正的数组

    // /Array.from(arrayLike  , x => x * x);
    // 等同于
    // Array.from(arrayLike).map(x => x * x);
}

// Array.of()
{
    // 将一组值转换为数组

    // console.log([].slice.call([1,2,3]));
}

// 数组实例的 copyWithin
{
    // three parameter : target start end

    // console.log([1,2,3,4,5].copyWithin(0 , 3));

    // 将三号位复制到-号位
    console.log([].copyWithin.call({length: 5 , 3: 1} , 0 , 3));
}

// find() / findIndex()
{
    // find()
        // return elements

    // findAll()
        // return index
}

