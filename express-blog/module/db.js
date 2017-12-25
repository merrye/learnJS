const Sequelize = require('sequelize'),
    config = require('../config');

let sequelize = new Sequelize(config.database, config.username, config.password,{
        host: config.localhost,
        dialect: config.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });
    
function defineModel(name,attributes){
    let attrs = {};
    for(let key in attributes){
        let value = attributes[key];
        if(typeof value === 'object' && value['type']){
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        }else{
            attrs[key] = {
                type: value,
                allowNull: false
            };
        };
    };
    attrs.id = {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    };
    attrs.createdAt = {
        type: Sequelize.STRING(255),
        allowNull: false
    };
    attrs.updatedAt = {
        type: Sequelize.STRING(255),
        allowNull: false
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    return sequelize.define(name,attrs,{
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function(obj){
                let now = new Date().toLocaleDateString().replace(/-/g, "/");
                if(obj.isNewRecord){
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                }else{
                    obj.updatedAt = now;
                    obj.version ++;
                };
            }
        }
    });
};

const TYPES = ['STRING' , 'INTEGER' , 'BIGINT' , 'TEXT' , 'DOUBLE' , 'DATEONLY' ,'BOOLEAN' ];

let exp = {
    defineModel: defineModel,
    sync:()=>{
        if(process.env.NODE_ENV !== 'production'){
            sequelize.sync({force: true});
        }else{
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        };
    }
}

for(let type of TYPES){
    exp[type] = Sequelize[type];
};

module.exports = exp;