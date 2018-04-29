const add = require('./add.js'),
    expect = require('chai').expect;

describe('加法函数的测试' , () => {
    it('1 加 1 应该等于 2' , () => {
        expect(add(1,1)).to.be.equal(2);
    });
    it('3 加 -3 应该等于 0' , () => {
        expect(add(3,-3)).to.be.equal(0);
    });
});