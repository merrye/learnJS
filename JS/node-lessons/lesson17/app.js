// promise的基本概念
const Q = require('q'),
    fs = require('fs'),
    defer = Q.defer();
/**
 * 获取初始promise
 * @private
 */
function getInitialPromise(){
    return defer.promise;
};
/**
 * 为promise设置三种状态的回调函数
 */
// getInitialPromise().then((success)=>{
//     console.log(success);
// },(error)=>{
//     console.log(error);
// },(process)=>{
//     console.log(process);
// });
// defer.notify('in process');
// defer.resolve('resolve');
// defer.reject('reject');

// promise的传递

/**
 * 当inputPromise状态由未完成变成fulfil时，调用function(fulfilled)
 * 当inputPromise状态由未完成变成rejected时，调用function(rejected)
 * 将then返回的promise赋给outputPromise
 * function(fulfilled) 和 function(rejected) 通过返回字符串将outputPromise的状态由
 * 未完成改变为fulfilled
 * @private
 */

// var outputPromise = getInitialPromise().then((fulfilled)=>{
//     return 'fulfilled';
// },(rejected)=>{
//    return 'rejected';
// });

/**
 * 当outputPromise状态由未完成变成fulfil时，调用function(fulfilled)，控制台打印'fulfilled: fulfilled'。
 * 当outputPromise状态由未完成变成rejected, 调用function(rejected), 控制台打印'rejected: rejected'。
 */
// outputPromise.then((fulfilled)=>{
//     console.log(`fulfilled: ${fulfilled}`);
// },(rejected)=>{
//     console.log(`rejected: ${rejected}`);
// });

/**
 * 将inputPromise的状态由未完成变成rejected
 */
// defer.reject();

/**
 * 将inputPromise的状态由未完成变成fulfilled
 */
//defer.resolve(); //输出 fulfilled: fulfilled

// 方法传递
// var outputPromise = getInitialPromise().then((fulfilled)=>{
//     return 'fulfilled';
// });
var outputPromise = getInitialPromise().then(null,(rejected)=>{
    return 'rejected';
});

outputPromise.then((fulfilled)=>{
    console.log(`fulfilled: ${fulfilled}`);
},(rejected)=>{
    console.log(`rejected: ${rejected}`);
});

/**
 * 将inputPromise的状态由未完成变成rejected
 */
// defer.reject('inputpromise rejected'); //控制台打印rejected: inputpromise rejected

/**
 * 将inputPromise的状态由未完成变成fulfilled
 */
// defer.resolve();

// defer.reject();
// defer.resolve('inputpromise rejected')