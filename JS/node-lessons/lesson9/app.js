// let web_development = "python php ruby javascript jsonp perhapsphpisoutdated";;
// let reg = /[a-zA-Z]*p([a-g]|[i-z])*/g;

// console.log(web_development.match(reg));

// reg
// (?=exp)  
// 零宽度正预测先行断言 / 匹配exp前面的位置
let str1 = `I'm singing while you're dancing.`,  
    reg1 = /\b\w+(?=ing\b)/g;
// console.log(str1.match(reg1));

// (?<=exp)
// 零宽度正回顾后发断言 / 匹配exp后面的位置
// let str2 = 'reading a book',
//     reg2 = /(?<=re)\w+/g;
// console.log(str2.match(reg2));

// (?!exp)
// 零宽度负预测先行断言 / 匹配后面跟的不是exp的位置
let str3 = 'the has a word abcd',
    reg3 = /\b((?!abc)\w)+\b/g;
// console.log(str3.match(reg3));

// (?<!exp)
// 零宽度负预测先行断言 / 匹配前面跟的不是exp的位置
// let str4 = 'a123 b234 d345 d 234',
//     reg4 = /(?<![a-z])\d{3}/g;
// console.log(str4.match(reg4));

// 设：有字符串 var s = 'aaalllsss0tAAAnnn999';
// 问：请找出所有在 3个连续相同字符 前的相邻 3个连续相同字符
let str5 = 'aaalllsss0tAAAnnn999',
    reg5 = /(\w)\1{2}(?=(\w)\2{2})/g;
console.log(str5.match(reg5));