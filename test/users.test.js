//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

let token;

describe('Protected routes', () => {
    beforeEach((done) => {
        chai.request(server)
            .post('/auth/login')
            .send({
                accountname: 'nmtoan',
                password: '123456'
            })
            .end((err, res) => {
                token = res.body.token;                
                done();
            })
    });    

    describe('GET /api/users/all', () => {
        it('it should get all current users', (done) => {
            chai.request(server)
                .get('/api/users/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');

                    done();
                })
        })
    });

    describe('GET /api/users', () => {
        // token not being sent - should respond with a 401
        it('It should require authorization', (done) => {
            chai.request(server)
                    .get('/api/users')
                    .end((err, res) => {
                        res.statusCode.should.eql(401);
                        done();
                    })
        })
    })    

        // it('It should respond with JSON when token is set', (done) => {
        //     chai.request(server)                    
        //             .get('/api/users')    
        //             .set('Authorization', `Bearer ${token}`)
        //             .end((err, res) => {
        //                 res.statusCode.should.eql(200);
        //                 // res.type.should.eql('application/json');                        

        //                 done();
        //             })
        // })
})


