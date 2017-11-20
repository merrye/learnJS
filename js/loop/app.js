let arr = [1,2,3,4,5],
    obj = {
        name: 'Merry',
        age: 21,
        birth: 97
    };

// 1.for...in
//      输出的是键名
// for(let i in arr){
//     console.log(i);     
// };

// for(let i in obj){
//     console.log(i);
// };

// 2.for...of
//      输出的是键值
// for(let i of arr){
//     console.log(i);
// };

// Object.keys()
    // 键名
// for(let i of Object.keys(obj)){
//     console.log(i);
// };

// Object.values()
    // 键值
// for(let i of Object.values(obj)){
//     console.log(i);
// };

// Object.entries()
    // 键值 / 键名
// for(let [i,j] of Object.entries(obj)){
//     console.log(i,j);
// };

// map
// let neqArr = arr.map(x => x*x);
// console.log(neqArr);

// filter
// let newArr = arr.filter((x)=>{
//     return x > 3
// });
// console.log(newArr);

// reduce
let addArr = arr.reduce((x,y)=>{
    return x + y
});
let mulArr = arr.reduce((x,y)=>{
    return x * y
});
// console.log(addArr,mulArr);
var arraa = ['1', '2', '3'];
var r;
r = arraa.map(parseInt);
console.log('[' + r[0] + ', ' + r[1] + ', ' + r[2] + ']');
