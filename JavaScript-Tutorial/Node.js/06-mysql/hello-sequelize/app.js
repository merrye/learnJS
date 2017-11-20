const config = require('./config'),
    Sequelize = require('sequelize');

console.log('init sequelize...');

let sequelize = new Sequelize(config.database , config.username ,config.password,{
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

let Pet = sequelize.define('pet',{
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
},{
    timestamps: false
});

let now = Date.now();

Pet.create({
    id: 'g-' + now,
    name: 'Gaffey',
    gender: false,
    birth: '2007-07-07',
    createdAt: now,
    updatedAt: now,
    version: 0
}).then((p)=>{
    console.log(`created. ${JSON.stringify(p)}`);
}).catch((err)=>{
    console.log(`failed: ${err}`);
});

(async ()=>{
    let dog = await Pet.create({
        id: 'd-' + now,
        name: 'Odie',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log(`created. ${JSON.stringify(dog)}`);
})();

(async ()=>{
    let pets = await Pet.findAll({
        where: {
            name: 'Gaffey'
        }
    });
    console.log(`find ${pets.length} pets:`);
    for(let pet of pets){
        console.log(JSON.stringify(pet));
        console.log('update pet...');
        pet.gender = true;
        pet.updatedAt = Date.now();
        pet.version ++;
        await pet.save();
        if(pet.version === 3){
            await p.destroy();
            console.log(`${pet.name} was destroyed.`);
        };
    };
})();