const fs = require('fs');

function addMapping(router , mapping){
    for(let url in mapping){
        if(url.startsWith('GET ')){
            let path = url.substring(4);
            router.get(path , mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        }else if(url.startsWith('POST ')){
            let path = url.substring(5);
            router.post(path , mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        };
    };
};

function addControllers(router , dir){
    const files = fs.readdirSync(__dirname + '/controllers'),
        js_files = files.filter( f => {
            return f.endsWith('.js');
        });

    for(let f of js_files){
        console.log(`process controller: ${f}...`);
        let mapping = require(`${__dirname}/controllers/${f}`);
        addMapping(router , mapping);
    };
};

module.exports = (dir) => {
    const controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router , controllers_dir);
    return router.routes();
}