// summary
{
    // Proxy用于修改某些操作的默认行为
    let obj = new Proxy({} , {
        get: function (target , key , receiver){
            console.log(`getting ${key}!`);
            return Reflect.get(target , key , receiver);
        },
        set: function(target , key , value , receiver){
            console.log(`setting ${key}!`);
            return Reflect.set(target , key , value , receiver);
        }
    });
    // obj.count = 1;
    // ++ obj.count;

    let handler = {
        get: (target , name) => {
            if(name === 'prototype'){
                return Object.prototype;
            };
            return 'Hello , ' + name;
        },
        apply: (target , thisBinding , args) => {
            return args[0]
        },
        constructor: (target , args) => {
            return {
                value: args[1]
            }
        }
    },
    fproxy = new Proxy(function(x , y){
        return x + y;
    } , handler);
    // console.log(fproxy(1 , 2));
    // console.log(new fproxy(1 , 2));
    // console.log(fproxy.prototype === Object.prototype);
    // console.log(fproxy.foo);

    // get(target , propKey , receiver)
        // 拦截对象属性的读取     proxy.foo

    // set(target , propKey , value , receiver)
        // 拦截对象属性的设置     proxy.foo = 1

    // has(target , propKey)
        // 拦截propKey in proxy   return a boolean

    // deleteProperty(target , propKey)
        // 拦截delete proxy[propKey]   return a boolean

    // OwnKeys(target)
        // 拦截Object.getOWnPropertyNames(proxy) / getOwnPropertySymbols(proxy) / keys(proxy)     return a array

    // getOwnPropertyDescriptor( target , propKey)
        // 拦截Object.getOwnPropertyDescriptor(proxy , propKey)
    
    // defineProperty(target , propKey , propDesc)
        // Object.defineProperty(proxy , propKey , propDesc) / defineProperties(proxy , propKey , propDesc)

    // preventExtensions(target)
        // Object.prevetExtensions(proxy)

    // getPrototpeOf(target)
        // Object.getPrototpeOf(target)

    // isExtensible(target)
        // Object.isExtensible(target)
    
    // setPrototpeOf(target , proto)
        // Object.setPrototpeOf(target , proto)

    // apply(target , object , args)

    // constructor(target , args)
        // new Proxy(..srgs)
}

// Proxy 实例的方法
{
    // get
    /*const dom = new Proxy({} , {
        get(target , property){
            return function(attrs = {} , ...children){
                const el = document.createElement(property);
                for(let [k , v] of Object.entries(attrs)){
                    el.setAttribute(k , v);
                };
                for(let child of children){
                    if(typeof child === 'string'){
                        child = document.createTextNode(child);
                    };
                    el.appendChild(child);
                };
                return el;
            }
        }
    });
    const el = dom.div({},
        'Hello, my name is ',
        dom.a({href: '//example.com'} , 'Mark'),
        '. I like:',
        dom.ul({},
            dom.li({} , 'The web'),
            dom.li({} , 'Food'),
            dom.li({} , '....actually that\'s it')
        )
    );*/
    // console.log(el);

    // set
    let valiator = {
        set: function(obj , prop , value){
            if(prop === 'age'){
                if(!Number.isInteger(value)){
                    throw new TypeError('The age is not an integer');
                };
                if(value > 200){
                    throw new RangeError('The age seems invalid');
                };
            };
            obj[prop] = value;
        }
    };
    let person = new Proxy({} , valiator);
    person.age = 100;
    // console.log(person.age);
    // person.age = 'yound';

    // apply
    let target = function (){return 'I am the target';},
        handler = {
            apply: function(){
                return 'I am the proxy';
            }
        };
    let p = new Proxy(target , handler);
    // console.log(p());

    // has
    let hasHander = {
        has(target , key){
            if(key[0] === '_'){
                return false;
            };
            return key in target;
        }
    },
    hasTarget = {_prop: 'foo' , prop: 'foo'},
    hasProxy = new Proxy(hasTarget , hasHander);
    // console.log('_prop' in hasProxy);

    // construct
    const cP = new Proxy(function(){} , {
        construct: function(target , args){
            console.log(`called: ${args.join(', ')}`);
            return {
                value: args[0] * 10
            }
        }
    });
    // console.log((new cP(1 , 2 , 3)).value);

    // deleteProperty()

}

// Proxy.recocable()
{
    let target = {} , handler = {},
        { proxy , revoke } = Proxy.revocable(target , handler);
    proxy.foo = 123;
    // console.log(proxy.foo);
    revoke();
    // console.log(proxy.foo);
}