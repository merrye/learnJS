const sql = require('./mysql');

let fn = function(oneDate,i){
    return new Promise((resolve,reject)=>{
        sql('SELECT * FROM nav WHERE level = 2 and navId = ?',[oneDate[i].navId],(err,twoData)=>{
            oneDate[i].child = twoData;
            resolve();
        });
    });
};

module.exports = function(callback){
    let data;
    sql('SELECT * FROM nav WHERE level = 1',(err,oneData)=>{
        let arr = [];
        for(let i in oneData){
            arr[i] = fn(oneData,i);
        };
        Promise.all(arr).then(()=>{
            callback(oneData);
        });
    });
};