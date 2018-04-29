const app = require('../app'),
    supertest = require('supertest'),
    request = supertest(app),
    should  = require('should');

describe('test/app.test.js',()=>{
    it('should return 55 when n is 10',(done)=>{
        request.get('/fib')
            .query({
                n: 10
            })
            .end((err,res)=>{
                res.text.should.equal('55');
                done(err);
            });
    });

    let testFib = function(n , statusCode , expect , done){
        request.get('/fib')
            .query({n: 10})
            .expect(statusCode)
            .end((err,res)=>{
                res.text.should.equal(expect);
                done(err);
            });
    };

    it('should return 0 when n is 0',(done)=>{
        testFib(0,200,'0',done);
    });

    it('should return 1 when n is 1',(done)=>{
        testFib(1,200,'1',done);
    });
    it('should return 55 when n is 10',(done)=>{
        testFib(10,200,'55',done);
    });
    it('should throw when n > 10',(done)=>{
        testFib(11,500,'n should <= 10',done);
    });

    it('should throw when n < 0',(done)=>{
        testFib(-1,500,'n should >= 0',done);
    });

    it('should throw when n isnt Number',(done)=>{
        testFib('good',500,'n should be a Number',done);
    });

    it('should status 500 when error',(done)=>{
        request.get('/fib')
            .query({n: 10})
            .expect(500)
            .end((err,res)=>{
                done(err);
            });
    });
});