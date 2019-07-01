//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('App basics', () => {
    it('Server should exists', () => {
        expect(server).to.be.a('function');
    })
});

describe('User Authentication', () => {    
    describe('Login', () => {
        it('It should return 404 if wrong account or password' ,(done) => {
            // Mock valid user
            const validUser = {
                accountname: 'test',
                password: '12356'
            }

            chai.request(server)
                .post('/auth/login')
                .send(validUser)
                .then((res) => {                             
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.a('object');   
                    expect(res.body.error).to.be.a('object');   
                    expect(res.body.error.userNotFound).to.be.equal('Wrong accountnamne or password');                                     
                    done();
                })
                .catch(err => {
                    done();
                })
        });

        it('It should return 200 with login information', (done) => {
            // Mock valid user
            const validUser = {
                accountname: 'test',
                password: '123456'
            }

            chai.request(server)
                .post('/auth/login')
                .send(validUser)
                .then((res) => {                    
                    expect(res).to.have.status(200);
                    expect(res.body.token).to.exist;
                    expect(res.body).to.be.a('object');                    
                    done();
                })
                .catch(err => {
                    done(err);                    
                })
        });
    })

    describe('Registration', () => { 
        it('Should return 409 or 400 and error object if errors exist', (done) => {
            // mock valid user
            const newUser = {
                username: 'TestTest',
                accountname: 'testtest',
                password: '123456',
                password2: '123456',
            }

            chai.request(server)
                .post('/auth/register')
                .send(newUser)
                .then(res => {                    
                    if(res.status === 400) {
                        expect(res).to.have.status(400);
                        expect(res.body).to.be.a('object');
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.failToRegister).to.be.equal('Fail to register new user');
                        return done();
                    }        
                    
                    expect(res).to.have.status(409);
                    expect(res.body).to.be.a('object');
                    expect(res.body.error).to.be.a('object');
                    expect(res.body.error.accountAxist).to.be.equal('This account name already axist');                    
                    done();
                })
                .catch(err => {
                    done();               
                })
        });                

        it('Should return 200 and register information', (done) => {
            // mock valid user
            const newUser = {
                username: 'TestTestTest',
                accountname: 'testtesttest',
                password: '123456',
                password2: '123456',
            }

            chai.request(server)
                .post('/auth/register')
                .send(newUser)
                .then(res => {                    
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');                                        
                    expect(res.body.success).to.be.equal(true);
                    expect(res.body.msg).to.be.equal(`Create user ${newUser.username}`);
                    done();
                })
                .catch(err => {
                    done();               
                })
        });                
    })
})