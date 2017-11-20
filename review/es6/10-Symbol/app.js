// 1.概述
{
    let s1 = Symbol('foo');
    // console.log(typeof s1 , s1.toString());
}

// 3.消除魔术字符串
{
    function getArea(shape , options){
        let area = 0;
        switch(shape){
            case 'Triangle':    // 魔术字符串
                area = .5 * options.width * options.height;
                break;
        };
        return area;
    };
    getArea('Triangle' , {width: 100 , height: 100});    // 魔术字符串

    let shapeType = {
        triangle: 'Triangle'
    };
    function getArea1(shape , options){
        let area = 0;
        switch(shape){
            case shape.triangle:
                area = .5 * options.width * options.height;
                break;
        };
        return area;
    };
    getArea1(shapeType.triangle , {width: 100 , height: 100});
}

// 4.属性名的遍历
{
    // Object.getOwnPropertySymbols()
    let obj = {},
        foo = Symbol('foo');
    Object.defineProperty(obj , foo , {
        value: "foobar"
    });
    for(let i in obj){
        // console.log(i);
    };
    // console.log(Object.getOwnPropertyNames(obj));
    // console.log(Object.getOwnPropertySymbols(obj));

    let o = {
        [Symbol('my_key')]: 1,
        enum: 2,
        nonEnum: 3
    };
    // console.log(Reflect.ownKeys(o));

    // 利用Symbol为对象定义非私有只供内部的方法
    const size = Symbol('size');
    class Collection{
        constructor() {
            this[size] = 0;
        }
        add(item){
            this[this[size]] = item;
            this[size] ++;
        }
        static sizeOf(instance){
            return instance[size];
        }
    }
    let x = new Collection();
    // console.log(Collection.sizeOf(x));
    x.add('foo');
    // console.log(Collection.sizeOf(x));
    // console.log(Object.keys(x));
    // console.log(Object.getOwnPropertyNames(x));
    // console.log(Object.getOwnPropertySymbols(x));
}

// Symbol.for() / Symbol.keyFor()
{
    // Symbol.for() 如果存在就返回这个Symbol值 , 否则就新建并返回一个以该字符串为名称的Symbol值
    let s1 = Symbol.for("foo"),
        s2 = Symbol.for("foo");

    // console.log(s1 === s2);

    // Symbol.keyFor()  返回一个已登记的Symbol类型值的key
    let s3 = Symbol.for('foo'); // 登记的值 return name
    // console.log(Symbol.keyFor(s3));

    let s4 = Symbol('foo');  // 未登记的值 return undefined
    // console.log(Symbol.keyFor(s4));
}

// 7.内置的Symbol值
{
    // hasInstance      判断是否为该对象实例时调用
    class Even{
        static [Symbol.hasInstance](obj) {
            return Number(obj) % 2 === 0;
        }
    }
    class MyClass{
        [Symbol.hasInstance](foo){
            return foo instanceof Array;
        }
    }
    // console.log([1 , 2 , 3] instanceof new MyClass());
    // console.log(1 instanceof Even , 12345 instanceof Even);

    // isConcatSpreadable   数组是否展开
    let arr1 = [3,4];
    // console.log([1,2].concat(arr1 , 5));
    // console.log(arr1[Symbol.isConcatSpreadable]);

    let arr2 = [3,4];
    arr2[Symbol.isConcatSpreadable] = false;
    // console.log([1,2].concat(arr2 , 5));

    class A1 extends Array{
        constructor(args){
            super(args);
            this[Symbol.isConcatSpreadable] = true;
        }
    }

    class A2 extends Array{
        constructor(args){
            super(args);
            this[Symbol.isConcatSpreadable] = false;
        }
    }
    let a1 = new A1(),
        a2 = new A2();
    a1[0] = 3;
    a1[1] = 4;
    a2[0] = 5;
    a2[1] = 6;
    // console.log([1,2].concat(a1).concat(a2));

    // species      创造实例时调用
    class MyArray extends Array{
        static get [Symbol.species](){
            return Array;
        }
    }
    let a = new MyArray(1,2,3),
        mapped = a.map(x => x * x);
    // console.log(mapped instanceof MyArray , mapped instanceof Array);

    // match
    class MyMatcher{
        [Symbol.match](string){
            return 'hello world'.indexOf(string);
        }
    }
    // console.log('e'.match(new MyMatcher()));

    // replace  接受2个参数  正在作用的对象 替换后的值
    const x = {};
    x[Symbol.replace] = (...s) => console.log(s);
    // 'Hello'.replace(x , 'world');

    // search
    class MySearch{
        constructor(value){
            this.value = value;
        }
        [Symbol.search](string) {
            return string.indexOf(this.value);
        }
    }
    // console.log('foobar'.search(new MySearch('foo')));

    // split
    class MySplitter{
        constructor(value){
            this.value = value;
        }
        [Symbol.split](string){
            let index = string.indexOf(this.value);
            if(index === -1){
                return string;
            };
            return [
                string.substr(0, index),
                string.substr(index + this.value.length)
            ]
        }
    }
    // console.log('foobar'.split(new MySplitter('foo')));

    // iterator
    let myIterable = {};
    myIterable[Symbol.iterator] = function* (){
        yield 1;
        yield 2;
        yield 3;
    };
    // console.log([...myIterable]);

    // toPrimitive
    let o = {
        [Symbol.toPrimitive](hint){
            switch(hint){
                case 'number':
                    return 123;
                case 'string':
                    return 'str';
                case 'default':
                    return 'default';
                default:
                    throw new Error();
            }
        }
    };
    // console.log(2 * o);
    // console.log(3 + o);
    // console.log(o == 'default');
    // console.log(String(o));

    // toStringTag
    class ToStringTagCollection{
        get [Symbol.toStringTag](){
            return 'xxx';
        }
    }
    const tag = new ToStringTagCollection();
    // console.log(Object.prototype.toString.call(tag));

    // unscopables
    class MyClass1{
        foo1(){
            return 1;
        }
    }
    let foo1 = function (){return 2;};
    with(MyClass1.prototype){
        console.log(foo1());
    }

    class MyClass2{
        foo2(){
            return 1;
        }
        get [Symbol.unscopables](){
            return {
                foo2: true
            }
        }
    }
    let foo2 = function (){return 2;};
    with(MyClass1.prototype){
        console.log(foo2());
    }
}