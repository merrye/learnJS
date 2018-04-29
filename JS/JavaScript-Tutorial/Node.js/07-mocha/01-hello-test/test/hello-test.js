const assert = require('assert'),
    sum = require('../hello');

describe('#hello.js',()=>{
    describe('#sum()',()=>{
        before(()=>{
            console.log('before');
        });

        after(()=>{
            console.log('after');
        });

        beforeEach(()=>{
            console.log('    beforeEach');
        });

        afterEach(()=>{
            console.log('    afterEach');
        });

        it('sum() should rerun 0',()=>{
            assert.strictEqual(sum(),0);
        });
        it('sum(1) should rerun 0',()=>{
            assert.strictEqual(sum(1),1);
        });
        it('sum(1,2) should rerun 0',()=>{
            assert.strictEqual(sum(1,2),3);
        });
        it('sum(1,2,3) should rerun 6',()=>{
            assert.strictEqual(sum(1,2,3),6);
        });
    });
});

// describe('#hello.js',()=>{
//     describe('#sum()',()=>{
//         it('sum() should rerun 0',()=>{
//             assert.strictEqual(sum(),0);
//         });
//         it('sum(1) should rerun 0',()=>{
//             assert.strictEqual(sum(1),1);
//         });
//         it('sum(1,2) should rerun 0',()=>{
//             assert.strictEqual(sum(1,2),3);
//         });
//         it('sum(1,2,3) should rerun 6',()=>{
//             assert.strictEqual(sum(1,2,3),6);
//         });
//     });
// });