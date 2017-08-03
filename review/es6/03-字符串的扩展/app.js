// 1.字符的Unicode表示法
{
    // console.log('\u{20BB7}');
}

// 2.codePointAt
{
    let s = '𠮷a';
    for(let i of s){
        // console.log(i.codePointAt(0));
    };
}

// 3.String.fromCodePoint()
{

    // console.log(String.fromCodePoint(0x20BB7));
}

// 4.字符串的遍历接口
{
    // 字符串可以被for...of循环遍历
}

// 5.at()
// 只是题案

// 6.normalize()
{

}

// 7.includes() , startsWith() , endsWith()
{
    let s = 'Hello world!';
    // console.log(s.startsWith('Hello') + '\n' +
    //     s.endsWith('!') + '\n' +
    //     s.includes('Hello'));
}

// 8.repeat()
{
    // console.log('x'.repeat(3));
}

// 9.padStart() , padEnd()
{
    // console.log('x'.padStart(5 , 'ab'));
    // console.log('x'.padEnd(5 , 'ab'));
}

// 11.实例 : 模板编译 *
{
    let template = `
        <ul>
            <% for(let i = 0;i < data.supplies.length;i ++){ %>
                <li><%= data.supplies[i] %></li>
            <% } %>
        </ul>
    `,
    parse = eval(compile(template));
    parse({ supplies: ["broom" , "mop" , "cleaner"] });
    function compile(template){
        const evalExpr = /<%=(.+?)%>/g,
            expr = /<%([\s\S]+?)%>/g;
        template = template
            .replace(evalExpr , '`); \n echo( $1 ); \n echo(`')
            .replace(expr , '`); \n $1 \n echo(`');
        template = 'echo(`' + template + '`);';
        let script = 
        `(function parse(data){
            let output = "";
            function echo(html){
                output += html;
            }
            ${template}
            return output;
        })`;
        return script;
    };
}

// 标签模板 *
{
    let total = 30, 
        msg = passthru`The total is ${total} (${total * 1.05} with tax)`;
    // function passthru(literals ){
    //     var result = '';
    //     var i = 0;

    //     while (i < literals.length) {
    //         result += literals[i++];
    //         if (i < arguments.length) {
    //         result += arguments[i];
    //         }
    //     }
    //     return result;
    // };

    function passthru(literals , ...values){
        let output = "";
        for(var index = 0; index < values.length;index ++){
            output += literals[index] + values[index];
        };
        output += literals[index];
        return output;
    };
}

{
    console.log(String.raw({
        raw: 'test'
    } , 0 , 1, 2));
}