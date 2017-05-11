// 变量的解构赋值

// 1.数组的解构赋值
// let [a,[b],d] = [1,[2,3],4];
// console.log(a,b,d);

// function* fibs(){
//     let a = 0,
//         b = 1;
//     while(true){
//         yield a;
//         [a,b] = [b,a + b];
//     };
// };
// let [first,second,third,fourth,fifth] = fibs();
// console.log(fifth);

// 默认值
// let [x = 1] = [undefined],
//     [y = 1] = [null];

// console.log(`x: ${x},y: ${y}`);

// 2.对象的解构赋值
// let obj = {
//     p: [
//         'Hello',
//         {
//             y: 'World'
//         }
//     ]
// };
// let { p: [ x , { y }] } = obj;
// console.log(`x: ${x},y: ${y}`);

// 3.字符串的解构赋值
// const [a,b,c,d,e] = 'hello';
// console.log(`a: ${a},b: ${b},c: ${c},d: ${d},e: ${e}`);

// 4.数值和布尔值的解构赋值

// 5.函数参数的解构赋值 
// function move({x = 0,y= 0} = {}){
//     return [x,y];
// };
// console.log(`
// ${move({x: 3,y: 8})}
// ${move({x: 3})}
// ${move({})}
// ${move()}
// `);

// 7.用途
// (1) 交换变量的值
// let x= 1,y = 2;
// [x,y] = [y,x];
// console.log(x,y);

// (2)从函数返回多个值
// function example(){
//     return [1,2,3];
// };
// let [a,b,c] = example();
// console.log(a,b,c);

// (3)函数参数的定义
// function f([x,y,z]){};
// f([1,2,3]);

// (4)提取JSON数据
// let jsonData = {
//     id: 42,
//     status: 'ok',
//     data: [1,2]
// };
// let {id,status,data:number} = jsonData;
// console.log(id,status,number);

// （5）函数参数的默认值
// jQuery.ajax = function (url, {
//   async = true,
//   beforeSend = function () {},
//   cache = true,
//   complete = function () {},
//   crossDomain = false,
//   global = true,
//   // ... more config
// }) {
//   // ... do stuff
// };

// (7)遍历Map结构
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}