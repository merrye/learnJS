const nunjucks = require('nunjucks');

function createEnv(path , opts){
    let autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined  = opts.throwOnUndefined  || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path , {
                noCache,
                watch
            }), {
                autoescape,
                throwOnUndefined
            }
        );
    if(opts.filters){
        for(let f in opts.filters){
            env.addFilter(f , opts.filters[f]);
        };
    };
    return env;
};

const env = createEnv('views' , {
    watch: true,
    filters: {
        hex: (n) => {
            return '0x' + n.toString(16);
        }
    }
});

// let s = env.render('hello.html' , {
//     name: 'Merry'
// });

// console.log(s);

// console.log(env.render('demo.html' , {
//     header: 'hello',
//     body: 'bla bla...'
// }));

console.log(env.render('fruits.html' , {
    fruits: ['apple' , 'orange' , 'banana']
}));