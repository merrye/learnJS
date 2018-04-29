// Static Methods
{
    // get(target , name , receiver)
    let myObject = {
        foo: 1,
        bar: 2,
        get baz(){
            return this.foo + this.bar;
        }
    },
    myReceiverObject = {
        foo: 4,
        bar: 4
    };
    // console.log(Reflect.get(myObject , 'baz') , Reflect.get(myObject , 'baz' , myReceiverObject));

    // Reflect.set(target , name , value , receiver)
    let setObj = {
        foo: 4,
        set bar(value){
            return this.foo = value;
        }
    },
    setReceiverObj = {
        foo: 0
    };
    Reflect.set(setObj , 'foo' , 5 , setReceiverObj);
    // console.log(setObj.foo , setReceiverObj.foo);

    // Reflect.has(obj , name)
    let hasObj = {
        foo: 1
    };
    // console.log(Reflect.has(hasObj , 'foo'));

    // Reflect.deleteProperty(obj , name)
    const deleteObj = {
        foo: 'bar'
    };
    // console.log(Reflect.deleteProperty(deleteObj , 'foo'));

    // Reflect.construct(target , args)
    function Greeting(name){
        this.name = name;
    };
    const instance = Reflect.construct(Greeting , ['Merry']);
    // console.log(instance);

    // Reflect.getPrototypeOf(obj)
}

// use Proxy to implement observer mode
{
    const person = observable({
        name: 'Merry',
        age: 21
    });
    const queuedObservers = new Set(),
        observe = fn => queuedObservers.add(fn),
        observable = obj => new Proxy(obj , {set});

    function set(target , key , value , receiver){
        const result = Reflect.set(target , key , value , receiver);
        queuedObservers.forEach(observer => observer());
        return result;
    };
    observe(set);
    person.name = 'Merrye';
}