//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

const User = require('../model/users.model');


describe('Public routes', () => {        
    describe('Get all users', () => {
        it('Should return 200 when users array is returned', (done) => {
            chai.request(server)
                .get('/api/users/all')
                .then(res => {                    
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body.users).to.be.a('array'); 
                    expect(res.body.success).to.be.equal(true);
                done();
            }).catch(err => done(err));
        }); 
    
        it('Should return 404 when no users found', (done) => {
            chai.request(server)
                .get('/api/users/all')
                .then((res) => {                    
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.equal(false); 
                    expect(res.body.error).to.be.a('object'); 
                    expect(res.body.error.length).to.not.equal(0); 
                    expect(res.body.error.noUsers).to.be.equal('No users found'); 
                    done();
                }).catch(err => done(err));
            }); 
    })

    describe('Get user by user id', () => {                                                        
        it('Should return 200 when user is returned', (done) => {                        
            User.findOne({ accountname: 'test' })
            .then(user => {
                const validId = user._id.toString();

                chai.request(server)
                    .get(`/api/users/${validId}`)
                    .then(res => {                                                    
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('object');
                        expect(res.body.success).to.be.equal(true);
                        expect(res.body.username).to.be.exist;                    
                        done();
                    })
                    .catch(err => done(err));
            })
            .catch(err => console.log('Error querying user for testing'));
        })      
        
        it('Should return 404 when no user is returned', (done) => {
            const invalidUserId = '5c0cc000c0cc0c00000cc00c';
            chai.request(server)
                .get(`/api/users/${invalidUserId}`)
                .then(res => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.equal(false);
                    expect(res.body.error).to.be.a('object');
                    expect(res.body.error.length).to.not.equal(0);
                    done();
                })
                .catch(err => done(err));
        })
    })    
})
    
