// Number 对象
{
    Number.isFinite()
    Number.isNaN()
    Number.parseInt()
    Number.parseFloat()
    Number.isInteger()
    Number.EPSILON  // 一个极小的常量
    // console.log(0.1 + 0.2 - 0.3 < Number.EPSILON);
    Number.isSafeInteger()  // 在 -2^53 - 2^53 之间
    Number.MAX_SAFE_INTEGER === 2 ^ 53
    Number.MIN_SAFE_INTEGER === -2 ^ 53
}

// Math对象的扩展
{
    Math.trunc()
    //      去除一个数的小数部分 返回整数部分

    Math.sign()
    // returns the value of five type
    // positive number   return +1
    // negative number   return -1
    // zero              return 0
    // -zero             return -0
    // other number      return NaN

    Math.cbrt()  // 计算一个数的立方根

    Math.clz32() // count leading zero bits in 32-bit binary representations of a number
    // console.log(Math.clz32(0) , Math.clz32(100));

    Math.imul()  // 返回两个数以32位带符号整数形式相乘的结果

    Math.fround()   // 返回一个数单精度浮点数形式
 
    Math.hypot()    // 返回所有参数的平方和平方根
    // console.log(Math.hypot(1 ,2 ,3 ,4));

    // 对数方法
    Math.expm1()    // return e^x - 1   即Math.exp(x) - 1

    Math.log1p()    // return 1 + x的自然对数    即Math.log(1 + x)

    Math.log10()    // return以10为底的x的对数

    Math.log2()     // return以2为底的x的对数

    // Math.signbit()  // 判断一个数的符号位是否设置了

    // 指数运算符
    // console.log(2 ** 2);

    // Integer 数据类型
    // 此类型下的数据必须使用后缀n表示
}