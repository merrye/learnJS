const Benchmark = require('benchmark'),
    suite = new Benchmark.Suite,
    int1 = (str)=>{
       return +str;
    },
    int2 = (str)=>{
        return parseInt(str,10);   
    },
    int3 = (str)=>{
        return Number(str);
    },
    number = '100';

suite
.add('+',()=>{
    int1(number);
})
.add('parseInt',()=>{
    int2(number);
})
.add('Number',()=>{
    int3(number);
})
.on('cycle',(event)=>{
    console.log(String(event.target));
})
.on('complete',()=>{
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({
    'async': true
});