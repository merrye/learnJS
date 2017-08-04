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