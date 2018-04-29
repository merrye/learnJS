// 方法的 name 属性
{
    const person = {
        sayName() {
            console.log('hello');
        },
        get foo(){},
        set foo(x){}
    },
    descriptor = Object.getOwnPropertyDescriptor(person , 'foo');
    // console.log(person.sayName.name);
    // console.log(descriptor.get.name);
    // console.log(descriptor.set.name);
}

// Object.is()
{
    // 同值相等算法
}

// Object.assign()
{
    // 对象的合并
}

// 6.数据的可枚举性
{
    // Object.getOwnPropertyDescriptor()
    // 获取该属性的描述对象
}

// 7.属性的遍历
{
    let obj = {
        "name": "Merry",
        "age": 21,
        "birth": "02-24"
    };

    // for...in 循环遍历对象自身的和可继承的可枚举性
    for(let o in obj){
        // console.log(o);
    };

    // Object.keys()
    for(let k of Object.keys(obj)){
        // console.log(k);
    };

    // Object.getOwnPropertyNames()
    // console.log(Object.getOwnPropertyNames(obj));

    // Object.getOwnPropertySymbols()
    // console.log(Object.getOwnPropertySymbols(obj));

    // Reflect.ownkeys()      返回包含对象自身的所有属性 
    // console.log(Reflect.ownKeys(obj));
}

// 8.__proto__属性 / Object.setPrototypeOf() / Object.getPrototypeOf()
{
    // __proto__属性

    // Object.setPrototypeOf()
    let proto = {},
        obj = { x: 10};
    Object.setPrototypeOf(obj , proto);
    proto.y = 20;
    proto.z = 40;
    // console.log(obj.x , obj.y , obj.z);

    // Object.getPrototypeOf()
    // console.log(Object.getPrototypeOf(obj));
}

// 10.对象的扩展运算符
{
    // 1.解构赋值
    // let { x, y, ...z } = { x : 1 , y : 2 , a : 3 , b : 4};
    // console.log(x , y , z);
}

// 11.Object.getOwnPropertyDescriptos()
{
    const source = {
        set foo(val){
            console.log(val);
        }
    },
    target = {};
    Object.defineProperties(target , Object.getOwnPropertyDescriptors(source));
    // console.log(Object.getOwnPropertyDescriptor(target , 'foo'));
}