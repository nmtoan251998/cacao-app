//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Public routes', () => {
    describe('Get all users', () => {
        it('Should return 200 when users array is returned', (done) => {
            chai.request(server)
                .get('/api/users/all')
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body.users).to.be.a('array');                    
                    expect(res.body.success).to.be.equal(true);
                    done();
                })
                .catch(err => done(err));
        });        

        it('Should return 404 when no users found', (done) => {
            chai.request(server)
                .get('/api/users/all')
                .then((res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.a('object');
                    expect(res.body.error).to.be.a('object'); 
                    expect(res.body.error.length).to.not.equal(0); 
                    expect(res.body.error.noUsers).to.be.equal('No users found'); 
                    done();
                })
                .catch(err => done(err));
        });        
    })
})

// describe('Private routes', () => {   
//     let token;

//     beforeEach((done) => {
//         chai.request(server)
//             .post('/auth/login')
//             .send({
//                 accountname: 'nmtoan',
//                 password: '123456'
//             })
//             .end((err, res) => {
//                 token = res.body.token;                
//                 done();
//             })
//     });    

//     describe('GET /api/users/all', () => {
//         it('it should get all current users', (done) => {
//             chai.request(server)
//                 .get('/api/users/all')
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('array');

//                     done();
//                 })
//         })
//     });

//     describe('GET /api/users', () => {
//         // token not being sent - should respond with a 401
//         it('It should require authorization', (done) => {
//             chai.request(server)
//                     .get('/api/users')
//                     .end((err, res) => {
//                         res.statusCode.should.eql(401);
//                         done();
//                     })
//         })
//     })        
// })


