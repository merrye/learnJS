// brief
{
    class Point{
        constructor(x , y){
            this.x = x;
            this.y = y;
        }
    }
    class ColorPoint extends Point{
        constructor(x , y , color){
            super(x , y);
            this.color = color;
        }
    }
    // 只有调用了super() 才能使用this关键字
}

// super
{
    class A{
        constructor(){
            console.log(new.target.name);
            this.x = 1;
        }
        print(){
            console.log(this.x);
        }
    }
    class B extends A{
        constructor(){
            super();
            this.x = 2;
        }
        m(){
            super.print();  // super调用父类的方法时，super会绑定子类的this
        }
    }
    // new A();
    // new B();
    // let b = new B();
    // b.m();

    class Parent{
        static method(msg){
            console.log('static' , msg);
        }
        method(msg){
            console.log('instance' , msg);
        }
    }
    class Child extends Parent{
        static method(msg){
            super.method(msg);
        }
        method(msg){
            super.method(msg);
        }
    }
    // Child.method(1);
    // let child = new Child();
    // child.method(2);
}

// prototype and __proto__
{
    class A{}
    class B extends A{}
    // console.log(B.__proto__ === A);
    // console.log(B.prototype.__proto__ === A.prototype);
}

// 原生构造函数的继承
{
    class VersionedArray extends Array{
        constructor(){
            super();
            this.history = [[]];
        }
        commit() {
            this.history.push(this.slice());
        }
        revert(){
            this.splice(0 , this.length, ...this.history[this.history.length - 1]);
        }
    }
    let x = new VersionedArray();
    x.push(1);
    x.push(2);
    console.log(x);
    console.log(x.history);
    x.commit();
    console.log(x.history);

    x.push(3);
    console.log(x);
    console.log(x.history);

    x.revert();
    console.log(x);
}