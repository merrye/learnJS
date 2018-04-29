const defaultConfig = './config-default.js',
    overrideConfig = './config-override.js',
    testConfig = './config-test.js',
    fs = require('fs');

let config = null;

if(process.env.NODE_ENV === 'test'){
    console.log(`Load ${testConfig}...`);
    config = require(testConfig);
}else{
    console.log(`Load ${defaultConfig}...`);
    config = require(defaultConfig);
    try{
        if(fs.statSync(overrideConfig).isFile()){
            console.log(`Load ${overrideConfig}...`);
            config = Object.assign(config,require(defaultConfig));
        };
    }catch(err){
        console.log(`Cannot load ${overrideConfig}.`);
    }
};

module.exports = config;