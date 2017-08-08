// Set
{
    // 基本语法
    // 类似于数组 没有重复的值
    let s = new Set([1,2,3]);
    // console.log(s , typeof s);

    // Attributes and Methods
    // Attributes
        // construcotr
        // size

    // Methods
        let set = new Set();
        set.add(1).add(2).add(2);
        // console.log(set.size
        // , set.has(1)
        // , set.has(2));
        // set.delete(2);
        // console.log(set.has(2))

    // loop
    // Object.keys() / Object.values() / Object.entries() / for...of
    
    let setLoop = new Set([1,2,3]);
    // setLoop.forEach((v , k) => console.log(v * 2));

    // 遍历的应用
    let a = new Set([1,2,3]),
        b = new Set([4,3,2]);
    // Union 并集
    let unionSet = new Set([...a , ...b]),
    // Intersect 交集
        intersectSet = new Set([...a].filter(x => b.has(x))),
    // Difference 差集
        diffSet = new Set([...a].filter(x => !b.has(x)));
    // console.log(unionSet , intersectSet , diffSet);
}

// WeakSet
{
    // 含义   值只能是对象

}

// Map
{
    // size / set / get / has / delete / clear
    const map = new Map()
        .set('foo' , true)
        .set('bar' , false);
    // console.log(map.size);
    // console.log(map.get('foo'));
    // console.log(map.has('bar'));
    map.delete('foo');
    // console.log(map.has('foo'));
    map.clear();
    // console.log(map.size);

    // keys() / values() / entries()
    let loopMap = new Map().set(1 , 'a').set('2' , 'b'),
        reporter = {
            report: function(key , value){
                console.log("Key: %s , Value: %s" , key , value);
            }
        };
    // loopMap.forEach((value , key , map) => {
    //     console.log("Key: %s , Value: %s" , key , value);
    // });
    loopMap.forEach(function(value , key , map){
        // this.report(key , value);
    } , reporter);

    // Map to Object    // Map的键都是字符串
    function strMaptoObj(strMap){
        let obj = Object.create(null);
        for(let [k,v] of strMap){
            obj[k] = v;
        };
        return obj;
    };
    const strMap = new Map().set('yes' , true).set('no' , false);
    // console.log(strMaptoObj(strMap));

    // Object to Map
    function objTostrMap(obj){
        let map = new Map();
        for(let [k,v] of Object.entries(obj)){
            map.set(k , v);
        };
        return map;
    };
    const obj = {
        "name": 'Merry',
        "age": 21
    };
    // console.log(objTostrMap(obj));

    // Map to JSOn
    // str JSON
    function strMaptoJSON(strMap){
        return JSON.stringify(strMaptoObj(strMap));
    };
    const strMap2 = new Map().set('yes' , true).set('no' , false);
    // console.log(strMaptoJSON(strMap2));

    // array JSON
    function maptoArrayJSON(map){
        return JSON.stringify([...map]);
    };
    const arrayMap = new Map().set(true , 7).set({foo: 3} , ['abc']);
    // console.log(maptoArrayJSON(arrayMap));

    // str json to map
    function JSONtoStrMap(json){
        return objTostrMap(JSON.parse(json));
    };
    // console.log(JSONtoStrMap('{"yes" : true , "no" : false}'));

    // array json to map
    function jsonToMap(json){
        return new Map(JSON.parse(json));
    };
    // console.log(jsonToMap('[[true , 7] , [{"foo":3} , ["abc"]]]'));
}

// WeakMap
{
    // 只接受对象作为键名    null除外

    // WeakMap 的用途
    const _counter = new WeakMap(),
        _action = new WeakMap();
    class Countdown{
        constructor(counter , action){
            _counter.set(this , counter);
            _action.set(this , action);
        }
        dec() {
            let  counter = _counter.get(this);
            if(counter < 1) return;
            counter --;
            _counter.set(this , counter);
            if(counter === 0){
                _action.get(this)();
            };
        }
    }
    const c = new Countdown(2 , () => console.log('DONE'));
    c.dec();
    c.dec();
}