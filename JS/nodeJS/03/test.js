let arr = [{name: 'Merry',age: 14},{name: 'Merrye',age: 10},{name: 'Merrypc',age: 12}];
let newArr = [1,3,4,6];
let nArr = [1,2,3];
for(let [key,value] of arr.entries()){
    for(let [key,val] of Object.entries(value)){
        console.log(`${key} : ${val} \n aa`);
    };
};