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
        })
    })

    describe('Registration', () => {         
        it('Should return 200 and confirmation input', (done) => {
            // mock valid user
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
                    expect(res).to.have.status(200);
                    expect(res.body.msg).to.be.equal(`Create user ${newUser.username}`);                    
                    done()
                })
                .catch(err => {
                    done(err);                    
                })
        })        
    })
})