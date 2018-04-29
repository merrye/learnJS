// 1.RegExp构造函数

// 3.u修饰符
{
    let s = '𠮷';
    // console.log(/^.$/.test(s) , /^.$/u.test(s));
}

// 4.y修饰符 / 念连
{
    let s = 'aaa_aa_a',
        r1 = /a+/g,
        r2 = /a+/y;
    // console.log(r1.exec(s));
    // console.log(r1.exec(s));
    // console.log(r2.exec(s));
    // console.log(r2.exec(s));

    // y修饰符确保匹配必须从剩余的第一个位置开始
}
// 5.sticky
{
    // 表示是否设置了y修饰符
    let r = /hello\d/y;
    // console.log(r.sticky);
}

// 6.flags属性
{
    let r = /abc/ig;
    // console.log(r.source , r.flags);
}

// 8.后行断言

{
    // let r = /^(?<word>[a-z]+)!\1$/;
    // console.log(r.exec('abc!ab'));
}