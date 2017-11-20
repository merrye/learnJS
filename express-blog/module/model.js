const fs = require('fs'),
    db = require('./db');

let files = fs.readdirSync(process.cwd() + '/models');

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
},files);

module.exports = {};

for(let f of js_files){
    let name = f.substring(0,f.length - 3);
    module.exports[name] = require(`${process.cwd()}/models/${f}`);
};

module.exports.sync = ()=>{
    db.sync();
};