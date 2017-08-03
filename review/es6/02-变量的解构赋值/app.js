// 1.数组的解构赋值
{
    let [a ,b ,c] = [1 ,2 ,3];
    // console.log(`a: ${a} , b: ${b} , c: ${c}`);

    function* fibs(){
        let [a , b] = [0 , 1];
        while(true){
            yield a;
            [a , b] = [b , a + b];
        };
    };

    let [first , second , third , fourth , fifith , sixth] = fibs();
    // console.log(sixth);

    // 默认值
    let [foo = true] = [];
    // console.log(foo);
    // 数组成员不严格等于undefined , 默认值是不会生效的
}

// 2.对象的解构赋值
{
    let {foo , bar} = {foo: 'aaa' , bar: 'bbb'};
    // console.log(foo , bar);
}

// 3.字符的解构赋值
{
    const [a ,b ,c ,d ,e] = 'hello';
    // console.log(a,b,c,d,e);
}

// 4.数值和布尔值的解构赋值
{
    // 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象 
}

// 5.函数参数的解构赋值
{
    function move({ x = 0 , y = 0} = {}){
        return [x,y];
    };
    /*console.log(move());
    console.log(move({x: 3 , y : 3}))*/
}