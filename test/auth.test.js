//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const expect = chai.expect;

const User = require('../model/users.model');

chai.use(chaiHttp);

describe('User Authentication', () => {        

    describe('Registration', () => {         
        it('Should return 409 when account already exist', (done) => {
            // existAccount
            const newUser = {
                username: 'Test',
                accountname: 'test',
                password: '123456',
                password2: '123456',
            }

            chai.request(server)
                .post('/auth/register')
                .send(newUser)
                .then(res => {                                        
                    expect(res).to.have.status(409);                    
                    expect(res.body.error).to.be.a('object');
                    expect(res.body.error.length).to.not.equal(0);                    
                    expect(res.body.success).to.be.equal(false);
                    expect(res.body.error.accountExist).to.be.equal('This account name already exist');                    
                    done();
                })
                .catch(err => {
                    done(err);               
                })
        });                

        it('Should return 400 when validations failed', (done) => {
            // mock invalid user
            const invalidUser = {
                username: '',
                accountname: 'testtest',
                password: '123456',
                password2: '123456',
            }

            chai.request(server)
                .post('/auth/register')
                .send(invalidUser)
                .then(res => {                                        
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.be.a('object');
                    expect(res.body.error.length).to.not.equal(0);                    
                    expect(res.body.success).to.be.equal(false);                    
                    done();
                })
                .catch(err => {
                    done(err);               
                })
        });                

        it('Should return 200 when a new user is created', (done) => {
            // mock valid user
            const newUser = {
                username: 'Test',
                accountname: 'test',
                password: '123456',
                password2: '123456',
            }

            // before creating user, check for its existence
            User.findOne({ accountname: 'test' })
            .then(user => {                    
                if(user) {                        
                    User.findByIdAndRemove(user.id)
                        .then((user) => {                            
                            chai.request(server)
                                .post('/auth/register')
                                .send(newUser)
                                .then(res => {                    
                                    expect(res).to.have.status(200);                                                       
                                    expect(res.body.success).to.be.equal(true);
                                    expect(res.body.newUser).to.be.a('object');
                                    done();
                                })
                                .catch(err => {
                                    done(err);               
                                })
                        })
                        .catch((err) => console.log('Error removing for testing'));
                }
            })                        
        });                
    })

    describe('Login', () => {
        it('It should return 404 if account or password is wrong', (done) => {
            // Mock invalid user
            const invalidUser = {
                accountname: 'invalidUser',
                password: '123456'
            }            

            chai.request(server)
                .post('/auth/login')
                .send(invalidUser)
                .then((res) => {                             
                    expect(res).to.have.status(404);
                    expect(res.body.error).to.be.a('object');
                    expect(res.body.error.length).to.not.equal(0);
                    expect(res.body.success).to.be.equal(false);
                    expect(res.body.error.wrongAccount).to.be.equal('Wrong accountname or password');
                    done();
                })
                .catch(err => {
                    done(err);
                })
        });

        it('Should return 400 when validation failed', (done) => {
            // mock unvalid user
            const invalidUser = {                
                accountname: '',
                password: '123456',                
            }

            chai.request(server)
                .post('/auth/login')
                .send(invalidUser)
                .then(res => {                    
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.be.a('object');
                    expect(res.body.error.length).to.not.equal(0);                    
                    expect(res.body.success).to.be.equal(false);                    
                    done();
                })
                .catch(err => {
                    done();               
                })
        });

        it('It should return 200 when user successfully log in', (done) => {
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
                    expect(res.body.success).to.be.equal(true);
                    expect(res.body.token).to.exist;
                    expect(res.body.userId).to.exist;
                    expect(res.body.username).to.exist;
                    expect(res.body.accountname).to.be.equal(validUser.accountname);                    
                    expect(res.body).to.be.a('object');                                        
                    done();
                })
                .catch(err => {
                    done(err);                    
                })
        });
    })
})