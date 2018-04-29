let index = 0;
module.exports = {
    'GET /signin': async(ctx,next)=>{
        let names = '甲乙丙丁午己庚辛壬癸',
            name = names[index % 10];
        ctx.render('signin.html',{
            name: `路人${name}`
        });
    },
    'POST /signin': async(ctx,next)=>{
        index ++;
        let name = ctx.request.body.name || '路人甲',
            user = {
                id: index,
                name: name,
                image: index % 10
            },
            value = Buffer.from(JSON.stringify(user)).toString('base64');
        console.log(`Set cookie value: ${value}`);
        ctx.cookies.set('name',value);
        ctx.response.redirect('/');
    },
    'GET /signinout': async(ctx,next)=>{
        ctx.cookies.set('name','');
        ctx.response.redirect('/signin');
    }
};