// 简介
{
    // yield 表达式
    let arr = [1 , [[2 , 3] , 4] , [5 , 6]],
    flat = function* (a){
        let length = a.length;
        for(let i = 0;i < length;i ++){
            let item = a[i];
            if(typeof item !== 'number'){
                yield* flat(item);
            }else{
                yield item;
            };
        };
    };
    for(let f of flat(arr)){
        // console.log(f);
    };

    // 与Iterator 接口的关系
    let obj = {};
    obj[Symbol.iterator] = function* (){
        yield 1;
        yield 2;
        yield 3;
    };
    // console.log([...obj]);
}

// next 方法的参数
{
    function* foo(x){
        let y = 2 * (yield (x + 1)),
            z = yield (y / 3);
        return (x + y + z);
    };

    let a = foo(5);
    // console.log(a.next());
    // console.log(a.next());
    // console.log(a.next());

    let b = foo(5);
    // console.log(b.next());
    // console.log(b.next(12));
    // console.log(b.next(13));
}

// for...of 循环
{
    function* foo(){
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
        return 6;
    };
    for(let f of foo()){
        // console.log(f);
    };
}

// Generator.prototype.retutn()
{
    function* gen(){
        yield 1;
        yield 2;
        yield 3;
    };
    let g = gen();
    // console.log(g.next());
    // console.log(g.return('foo'));    // use return method,reutrn the method argument,else return undefined
    // console.log(g.next());

    function* numbers(){
        yield 1;
        try{
            yield 2;
            yield 3;
        }finally{
            yield 4;
            yield 5;
        }
        yield 6;
    };
    let n = numbers();
    // console.log(n.next());
    // console.log(n.next());
    // console.log(n.return(7));
    // console.log(n.next());
    // console.log(n.next());
}

// yield* 表达式
{
    function* inner(){
        yield 'hello';
    };
    function* outer1(){
        yield 'open'
        yield inner();
        yield 'close';
    };
    function* outer2(){
        yield 'open'
        yield* inner();
        yield 'close';
    };
    let gen = outer1(),
        gen2 = outer2();
    // console.log(gen.next());
    // console.log(gen.next());
    // console.log(gen.next());
    // console.log(gen2.next());
    // console.log(gen2.next());
    // console.log(gen2.next());

    // yield 遍历完全二叉树
    // 二叉树的构造函数
    // Three argumens: 左树 当前节点 右树
    function Tree(left , label , right){
        this.left = left;
        this.label = label;
        this.right = right;
    };
    // 中序遍历函数
    function* inorder(t){
        if(t){
            yield* inorder(t.left);
            yield t.label;
            yield* inorder(t.right);
        };
    };
    // 生成二叉树
    function make(array){
        // 判断是否为叶节点
        if(array.length === 1){
            return new Tree(null , array[0] , null);
        };
        return new Tree(make(array[0]) , array[1] , make(array[2]));
    };
    let tree = make([[['a'] , 'b' , ['c']] , 'd', [['e'] , 'f' , ['g']]]);
    let result = [];
    for(let node of inorder(tree)){
        result.push(node);
    };
    // console.log(result);
}

// 作为对象属性的Generator函数
{
    let obj = {
        * foo(){
            // some code
        }
    };
}

// this of generator function
{
    function* F(){
        this.a = 1;
        yield this.b = 2;
        yield this.c = 3;
    };
    let f = F.call(F.prototype);
    // console.log(f.next());
    // console.log(f.next());
    // console.log(f.next());
    // console.log(f.a);
    // console.log(f.b);
    // console.log(f.c);

    function* gen(){
        this.a = 1;
        yield this.b = 2;
        yield this.c = 3;
    };

    function G(){
        return gen.call(gen.prototype);
    };
    let g = new G();
    // console.log(f.next());
    // console.log(f.next());
    // console.log(f.next());
    // console.log(f.a);
    // console.log(f.b);
    // console.log(f.c);
}

// 9.含义
{
    // Generator and 这台机
    
}

// 应用
{
    
}