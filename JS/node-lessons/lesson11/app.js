// var parent = function(){
//     var name = 'parent_name',
//         age = 13,
//         child = function(){
//             var name = 'child_name',
//                 childAge = 0.3;
//             console.log(name,age,childAge);
//         };
//         child();
           // will throw Error
           // ReferenceError: childAge is not defined    
//         console.log(name, age , childAge);
// };
// parent();

// 闭包的样例
// 例子1:闭包中局部变量是引用而非拷贝
function say667(){
    // Local variable that ends up within closure
    var num = 666;
    var sayAlert = function(){
        console.log(num);
    }; 
    num ++;
    return sayAlert;
};
var sayAlert = say667();
// sayAlert();

// 例子2:多个函数绑定同一个闭包，因为他们定义在同一个函数内
function setupSomeGlobals(){
    // Local variable that ends up within closure
    var num = 666;
    // Store some references to function as global variables
    gAlertNumber = function(){
        console.log(num);
    };
    gIncreaseNumber = function(){
        num ++;
    };
    gSetNumber = function(x){
        num = x;
    };
};
// setupSomeGlobals(); // 为三个全局彪了赋值
// gAlertNumber();
// gIncreaseNumber();
// gAlertNumber();
// gSetNumber(12);
// gAlertNumber();

function buildList(list){
    var result = [];
    for(var i = 0;i < list.length;i ++){
        var item = 'item' + list[i];
        result.push(function(){
            console.log(`item: ${item},list[i]: ${list[i]}`);
        });
    };
    return result;
};
function testList(){
    var fnList = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for(var j = 0;j < fnList.length;j ++){
        fnList[j]();
    };
};
// testList();

// 例子4：外部函数所有局部变量都在闭包内，即使这个变量声明在内部函数定义之后
function sayAlice(){
    var sayAlert = function(){
        console.log(alice);
    };
    // Local varibale that ends up within closure
    var alice = 'Hello Alice';
    return sayAlert;
};
var helloAlice = sayAlice();
// helloAlice();

// 例子5：每次函数调用的时候创建一个新的闭包
function newClosure(someNum, someRef){
    // Local varibale that ends up within closure
    var num = someNum,
        anArray = [1,2,3],
        ref = someRef;
    return function(x){
        num += x;
        anArray.push(num);
        console.log(`num: ${num}\nanArray: ${anArray.toString()}\nref.someVar: ${ref.someVar}`);
    };
};
closure1 = newClosure(40,{someVar: 'closure 1'});
closure2 = newClosure(1000,{someVar: 'closure 2'});
// closure1(5);    // num:45 anArray[1,2,3,45] ref: 'someVar closure1'
// closure1(-10);  // num:990 anArray[1,2,3,990] ref: 'someVar closure2'

// 闭包的应用
// Singleton单件：
var singleton = function () {
    var privateVariable = 0;
    function privateFunction(x) {
        privateVariable = x;
    }
 
    return {
        firstMethod: function (a, b) {
            privateVariable += a;
            privateVariable += a;
            return privateVariable;
        },
        secondMethod: function (c) {
            privateFunction(c);
        }
    };
}();
console.log(singleton.firstMethod(1,2));