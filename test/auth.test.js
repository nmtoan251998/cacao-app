//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const expect = chai.expect;
const httpStatus = require('http-status');

chai.use(chaiHttp);

const User = require('../model/users.model');

describe('Authentication API', () => {
    const user = {};
    
    beforeEach( async () => {                            
        user.dbUser = {
            accountname: 'nmtoan',
            password: '12345678',    
            username: 'Minh Toàn',
        };

        user.valid = {
            accountname: 'tester',
            password: '12345678',
            password2: '12345678',
            username: 'Test',
        };        
    
        await User.deleteMany({}); 
        await User.create(user.dbUser);        
    })    
    
    describe('POST /auth/register', () => {                                 
        it('Should return 409 when account already exists', (done) => {            
            const conflictUser = {
                ...user.dbUser,
                password2: '12345678'
            }
            chai.request(server)
                .post('/auth/register')
                .send(conflictUser)                
                .then(res => {                    
                    expect(res).to.have.status(httpStatus.CONFLICT);   
                    expect(res.body.error).to.be.a('object');
                    expect(res.body.error.accountExist).to.include('This accountname already exist');
                    expect(res.body.success).to.be.false;                    
                    done();
                })
                .catch(err => {
                    done(err);               
                });
        });
        
        it('Should return 400 when accountname field is empty', (done) => {
            const invalidUser = {
                ...user.valid,
                accountname: '',
            }
            chai.request(server)
                .post('/auth/register')
                .send(invalidUser)
                .then(res => {                    
                    expect(res).to.have.status(httpStatus.BAD_REQUEST);   
                    expect(res.body.error).to.be.a('object');                    
                    expect(res.body.success).to.be.false;
                    done();
                })
                .catch(err => {
                    done(err);               
                });
        });
        
        it('Should return 400 when accountname field starts with number', (done) => {
            const invalidUser = {
                ...user.valid,
                accountname: '09tester',
            }         
            chai.request(server)
                .post('/auth/register')
                .send(invalidUser)
                .then(res => {                    
                    expect(res).to.have.status(httpStatus.BAD_REQUEST);   
                    expect(res.body.error).to.be.a('object');                    
                    expect(res.body.success).to.be.false;                    
                    done();
                })
                .catch(err => {
                    done(err);               
                });
        });
        
        it('Should return 400 when accountname field below the minimum length validation', (done) => {
            const invalidUser = {
                ...user.valid,
                accountname: 'test',
            }         
            chai.request(server)
                .post('/auth/register')
                .send(invalidUser)
                .then(res => {                    
                    expect(res).to.have.status(httpStatus.BAD_REQUEST);   
                    expect(res.body.error).to.be.a('object');                    
                    expect(res.body.success).to.be.false;                    
                    done();
                })
                .catch(err => {
                    done(err);               
                });
        });

        it('Should return 400 when accountname field above the maximum length validation', (done) => {
            const invalidUser = {
                ...user.valid,
                accountname: 'testwithabove20characterslength',
            }         
            chai.request(server)
                .post('/auth/register')
                .send(invalidUser)
                .then(res => {                    
                    expect(res).to.have.status(httpStatus.BAD_REQUEST);   
                    expect(res.body.error).to.be.a('object');                    
                    expect(res.body.success).to.be.false;                    
                    done();
                })
                .catch(err => {
                    done(err);               
                });
        });
        
        it('Should return 400 when username field is empty', (done) => {
            const invalidUser = {
                ...user.valid,
                username: ' ',
            }         
            chai.request(server)
                .post('/auth/register')
                .send(invalidUser)
                .then(res => {                    
                    expect(res).to.have.status(httpStatus.BAD_REQUEST);   
                    expect(res.body.error).to.be.a('object');                    
                    expect(res.body.success).to.be.false;                    
                    done();
                })
                .catch(err => {
                    done(err);               
                });
        });
        
        it('Should return 400 when username field below the minimum length validation', (done) => {
            const invalidUser = {
                ...user.valid,
                username: 't',
            }         
            chai.request(server)
                .post('/auth/register')
                .send(invalidUser)
                .then(res => {                    
                    expect(res).to.have.status(httpStatus.BAD_REQUEST);   
                    expect(res.body.error).to.be.a('object');                    
                    expect(res.body.success).to.be.false;                    
                    done();
                })
                .catch(err => {
                    done(err);               
                });
        });

        it('Should return 400 when username field above the maximum length validation', (done) => {
            const invalidUser = {
                ...user.valid,
                username: 'testwithabove30characterslengthtestwithabove30characterslength',
            }         
            chai.request(server)
                .post('/auth/register')
                .send(invalidUser)
                .then(res => {                    
                    expect(res).to.have.status(httpStatus.BAD_REQUEST);   
                    expect(res.body.error).to.be.a('object');                    
                    expect(res.body.success).to.be.false;                    
                    done();
                })
                .catch(err => {
                    done(err);               
                });
        });
        
        it('Should return 400 when password field is empty', (done) => {
            const invalidUser = {
                ...user.valid,
                password: '',
                password2: '',
            }         
            chai.request(server)
                .post('/auth/register')
                .send(invalidUser)
                .then(res => {                        
                    expect(res).to.have.status(httpStatus.BAD_REQUEST);   
                    expect(res.body.error).to.be.a('object');                    
                    expect(res.body.success).to.be.false;                    
                    done();
                })
                .catch(err => {
                    done(err);               
                });
        });        
        
        it('Should return 400 when password field below the minimum length validation', (done) => {
            const invalidUser = {
                ...user.valid,
                password: '123456',
                password2: '123456',
            }  
            chai.request(server)
                .post('/auth/register')
                .send(invalidUser)
                .then(res => {                       
                    expect(res).to.have.status(httpStatus.BAD_REQUEST);   
                    expect(res.body.error).to.be.a('object');                    
                    expect(res.body.success).to.be.false;                    
                    done();
                })
                .catch(err => {
                    done(err);               
                });
        });

        it('Should return 400 when password field above the maximum length validation', (done) => {
            const invalidUser = {
                ...user.valid,
                password: '12345678901234567890',
                password2: '12345678901234567890',
            }  
            chai.request(server)
                .post('/auth/register')
                .send(invalidUser)
                .then(res => {                       
                    expect(res).to.have.status(httpStatus.BAD_REQUEST);   
                    expect(res.body.error).to.be.a('object');                    
                    expect(res.body.success).to.be.false;                    
                    done();
                })
                .catch(err => {
                    done(err);               
                });
        });

        it('Should return 400 when password2 field does not match password field', (done) => {
            const invalidUser = {
                ...user.valid,
                password: '12345678',
                password2: '123456789',
            }  
            chai.request(server)
                .post('/auth/register')
                .send(invalidUser)
                .then(res => {                       
                    expect(res).to.have.status(httpStatus.BAD_REQUEST);   
                    expect(res.body.error).to.be.a('object');                    
                    expect(res.body.success).to.be.false;                    
                    done();
                })
                .catch(err => {
                    done(err);               
                });
        });

        it('Should return 200 when new user is registered', (done) => {            
            chai.request(server)
                .post('/auth/register')
                .send(user.valid)                
                .then(res => {                       
                    expect(res).to.have.status(httpStatus.OK);   
                    expect(res.body.newUser).to.be.a('object');                    
                    expect(res.body.success).to.be.equal(true);
                    done();
                })
                .catch(err => {
                    done(err);               
                });
        });
    });

    describe('POST /auth/login', () => {             
        it('Should return 200 when a user is loged in', (done) => {                        
            const loginUser = {
                accountname: user.dbUser.accountname,
                password: user.dbUser.password
            };
            
            chai.request(server)
                .post('/auth/login')
                .send(loginUser)
                .then(res => {                       
                    expect(res).to.have.status(httpStatus.OK); 
                    expect(res.body.token).to.exist;
                    expect(res.body.userId).to.exist;
                    expect(res.body.username).to.exist;
                    expect(res.body.success).to.be.true;
                    done();
                })
                .catch(err => {
                    done(err)
                });
        });

        it('Should return 404 when loged in account is wrong', (done) => {                        
            const loginUser = {
                accountname: user.dbUser.accountname,
                password: user.dbUser.password +'w0w',
            };
            
            chai.request(server)
                .post('/auth/login')
                .send(loginUser)
                .then(res => {                          
                    expect(res).to.have.status(httpStatus.NOT_FOUND); 
                    expect(res.body.error).to.be.a('object');
                    expect(res.body.success).to.be.false;
                    done();
                })
                .catch(err => {
                    done(err)
                });
        });

        it('Should return 400 when accountname field is empty', (done) => {                        
            const loginUser = {
                accountname: '',
                password: user.dbUser.password,
            };
            
            chai.request(server)
                .post('/auth/login')
                .send(loginUser)
                .then(res => {                          
                    expect(res).to.have.status(httpStatus.BAD_REQUEST); 
                    expect(res.body.error).to.be.a('object');
                    expect(res.body.success).to.be.false;
                    done();
                })
                .catch(err => {
                    done(err)
                });
        });

        it('Should return 400 when password field is empty', (done) => {                        
            const loginUser = {
                accountname: user.dbUser.accountname,
                password: '',
            };
            
            chai.request(server)
                .post('/auth/login')
                .send(loginUser)
                .then(res => {                          
                    expect(res).to.have.status(httpStatus.BAD_REQUEST); 
                    expect(res.body.error).to.be.a('object');
                    expect(res.body.success).to.be.false;
                    done();
                })
                .catch(err => {
                    done(err)
                });
        });
    });
});
