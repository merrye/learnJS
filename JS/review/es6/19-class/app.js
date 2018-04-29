// 简介
{
    function Point(x , y){
        this.x = x;
        this.y = y;
    };
    Point.prototype.toString = function(){
        return `(${this.x} , ${this.y})`;
    };
    const p = new Point(1 , 2);
    // console.log(p.toString());

    class Point1{
        constructor(x , y){
            this.x = x;
            this.y = y;
        }
        toString(){
            return `(${this.x} , ${this.y})`;
        }
    };
    const p1 = new Point(3 , 4);
    console.log(p1.toString());
}

// 类的实例对象
{
    
}