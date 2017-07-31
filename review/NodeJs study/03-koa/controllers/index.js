const fn_index = async (ctx , next) => {
        ctx.response.body = `<h1>Index</h1>
            <form action='/signin' method="post">
                <p>Name: <input name="name" value="koa"></p>
                <p>Password: <input name="Password" type="password"></p>
                <p><input type="submit" value="submit"></p>
            <form>
        `;
    },
    fn_signin = async (ctx , next) => {
        const name = ctx.request.body.name || '',
            password = ctx.request.body.Password || '';
        console.log(`signin with name: ${name} , password: ${password}`);
        if(name === 'koa' && password === '12345'){
            ctx.response.body = `<h1>Welcome , ${name}</h1>`;
        }else{
            ctx.response.body = `<h1>Login faileds!</h1>
                <p><a href="/">Try again</a></p>
            `;
        };
    };

module.exports = {
    'GET /': fn_index,
    "POST /signin": fn_signin
};