/*
TODO: update document for model/username minlength: 1 -> 2
*/

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const expect = chai.expect;
const httpStatus = require('http-status');

chai.use(chaiHttp);

const User = require('../model/users.model');

describe('Users API', () => {    
    let userId1, userId2;    
    let tester1, tester2;
    let invalidUserId;

    beforeEach(async () => {   
        tester1 = {
            accountname: 'tester1',
            password: '12345678',    
            username: 'Tester1',
        };
        tester2 = {
            accountname: 'tester2',
            password: '12345678',    
            username: 'Tester2',
        };

        await Promise.all([
            User.deleteMany({}),
            User.create(tester1),
            User.create(tester2),            
        ])
        .then(results => {
            userId1 = results[1]['_id'];            
            userId2 = results[2]['_id'];  
            invalidUserId = require('mongoose').Types.ObjectId
                                    (
                                        userId1                                        
                                        .toString()
                                        .replace(/\d/g, '0')
                                    );          
        })        
        .catch(err => {
            console.log(err);
        });
    });            

    function login(user, cb) {
        chai.request(server)
        .post('/auth/login')
        .send(tester1)
        .then(res => {
            cb(null, res.body.token);
        })
        .catch(err => {
            cb(err);
        });
    };        
    
    describe('GET /api/users/all', () => {
        it('Should return 200 when users array is returned', (done) => {
            chai.request(server)
                .get('/api/users/all')
                .then(res => {                    
                    expect(res).to.have.status(httpStatus.OK);
                    expect(res.body.users).to.be.a('array'); 
                    expect(res.body.success).to.be.true;
                done();
            })
            .catch(err => {
                done(err)
            });
        }); 
    
        it('Should return 404 when no users found', (done) => {
            User.deleteMany({})
                .then(() => {
                    chai.request(server)
                    .get('/api/users/all')
                    .then((res) => {  
                        expect(res).to.have.status(httpStatus.NOT_FOUND);                        
                        expect(res.body.success).to.be.false;            
                        expect(res.body.error).to.be.a('object');                         
                        expect(res.body.error.noUsers).to.include('No users found');                         
                        done();
                    })
                    .catch(err => {
                        done(err)
                    });
                })
                .catch(err => {
                    console.log('Error removing users for testing /api/users/all')
                })              
        }); 
    });

    describe('GET /api/users/:id', () => {                                                        
        it('Should return 200 when user is returned', (done) => {                            
        chai.request(server)
            .get(`/api/users/${userId1}`)            
            .then(res => {                                                    
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                expect(res.body.username).to.be.exist;                    
                done();
            })
            .catch(err => {
                done(err)
            });                
        });    
        
        it('Should return 404 when no users are returned', (done) => {            

            chai.request(server)
                .get(`/api/users/${invalidUserId}`)
                .then(res => {
                    expect(res).to.have.status(404);
                    expect(res.body.success).to.be.false;
                    expect(res.body.error).to.be.a('object');
                    expect(res.body.error.noUser).to.include('No user found');
                    done();
                })
                .catch(err => {
                    done(err)
                });
        });
    });  

    describe('GET /api/users', () => {
        it('Should return 200 when getting current user information', (done) => {            
            chai.request(server)
                .post('/auth/login')
                .send(tester1)
                .then(res => {
                    // After getting Auth token
                    chai.request(server)                
                        .get('/api/users')
                        .set('Authorization', res.body.token)
                        .then(res => {
                            expect(res).to.have.status(httpStatus.OK);
                            expect(res.body.success).to.be.true;
                            expect(res.body.user).to.be.a('object');
                            done();
                        })
                        .catch(err => {
                            done(err);
                        });
                })
                    
        });   
        
        it('Should return 401 if auth token is null', (done) => {
            chai.request(server)
            .get('/api/users')
            .set('Authorization', '')
            .then(res => {                    
                expect(res).to.have.status(httpStatus.UNAUTHORIZED);
                expect(res.body.success).to.be.false;
                expect(res.body.error).to.be.a('object');
                expect(res.body.error.invalidToken).to.include('Invalid auth token');
                done();
            })
            .catch(err => {
                done(err);
            });                                      
        });   

        it('Should return 401 if auth token is invalid', (done) => {
            login(tester1, (err, token) => {
                if(err) return onsole.log(err);                
                
                chai.request(server)
                    .get('/api/users')
                    .set('Authorization', token+'gfji')
                    .then(res => {
                        expect(res).to.have.status(httpStatus.UNAUTHORIZED);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.unauthor).to.include('Unauthorization');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            });
        });        
    });  
    
    describe('PATCH /api/user/:id', () => {
        it('Should return 200 when user is modified', (done) => {
            login(tester1, (err, token) => {
                if(err) return console.log(err);

                const modifiedAccount = {
                    username: 'Modified Tester',
                    password: '1234567890',
                    password2: '1234567890'
                }

                chai.request(server)
                    .patch(`/api/users/${userId1}`)
                    .set('Authorization', token)
                    .send(modifiedAccount)
                    .then(res => {                        
                        expect(res).to.have.status(httpStatus.OK);
                        expect(res.body.success).to.be.true;
                        expect(res.body.updatedUser).to.be.a('object');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            })
        });

        it('Should return 400 when updating username field is empty', (done) => {
            login(tester1, (err, token) => {
                if(err) return console.log(err);

                const modifiedAccount = {
                    username: '',
                    password: '1234567890',
                    password2: '1234567890'
                }

                chai.request(server)
                    .patch(`/api/users/${userId1}`)
                    .set('Authorization', token)
                    .send(modifiedAccount)
                    .then(res => {                        
                        expect(res).to.have.status(httpStatus.BAD_REQUEST);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.emptyUsername).to.include('Username field cannot be empty')
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            })
        });

        it('Should return 400 when updating username field is below the minimum validation length', (done) => {
            login(tester1, (err, token) => {
                if(err) return console.log(err);

                const modifiedAccount = {
                    username: 't',
                    password: '1234567890',
                    password2: '1234567890'
                }

                chai.request(server)
                    .patch(`/api/users/${userId1}`)
                    .set('Authorization', token)
                    .send(modifiedAccount)
                    .then(res => {                        
                        expect(res).to.have.status(httpStatus.BAD_REQUEST);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.usernameLength).to.include('Username field must be at least 2 character')
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            })
        });

        it('Should return 400 when updating password field is empty', (done) => {
            login(tester1, (err, token) => {
                if(err) return console.log(err);

                const modifiedAccount = {
                    username: 'Modified Tester',
                    password: '',
                    password2: ''
                }

                chai.request(server)
                    .patch(`/api/users/${userId1}`)
                    .set('Authorization', token)
                    .send(modifiedAccount)
                    .then(res => {                        
                        expect(res).to.have.status(httpStatus.BAD_REQUEST);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.emptyPassword).to.include('Password field cannot be empty');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            })
        });

        it('Should return 400 when updating password field is below the minimum length validation', (done) => {
            login(tester1, (err, token) => {
                if(err) return console.log(err);

                const modifiedAccount = {
                    username: 'Modified Tester',
                    password: '123456',
                    password2: '123456'
                }

                chai.request(server)
                    .patch(`/api/users/${userId1}`)
                    .set('Authorization', token)
                    .send(modifiedAccount)
                    .then(res => {                        
                        expect(res).to.have.status(httpStatus.BAD_REQUEST);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.passwordLength).to.include('Password field must be at least 8 character and below 20 characters');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            })
        });

        it('Should return 400 when updating password fields do not match each other', (done) => {
            login(tester1, (err, token) => {
                if(err) return console.log(err);

                const modifiedAccount = {
                    username: 'Modified Tester',
                    password: '123456789wf',
                    password2: '123456780gjr'
                }

                chai.request(server)
                    .patch(`/api/users/${userId1}`)
                    .set('Authorization', token)
                    .send(modifiedAccount)
                    .then(res => {                        
                        expect(res).to.have.status(httpStatus.BAD_REQUEST);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.passwordNotMatch).to.include('Two passwords field must match');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            })
        });

        it('Should return 401 if auth token is null', (done) => {            
            chai.request(server)
                .patch(`/api/users/${userId1}`)
                .set('Authorization', '')
                .then(res => {                    
                    expect(res).to.have.status(httpStatus.UNAUTHORIZED);
                    expect(res.body.success).to.be.false;
                    expect(res.body.error).to.be.a('object');
                    expect(res.body.error.invalidToken).to.include('Invalid auth token');
                    done();
                })
                .catch(err => {
                    done(err);
                });                                      
        });   

        it('Should return 401 if auth token is invalid', (done) => {
            login(tester1, (err, token) => {
                if(err) return onsole.log(err);                
                
                chai.request(server)
                    .patch(`/api/users/${userId1}`)
                    .set('Authorization', token+'gfji')
                    .then(res => {
                        expect(res).to.have.status(httpStatus.UNAUTHORIZED);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.unauthor).to.include('Unauthorization');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            });
        });   

        it('Should return 403 if payloaded id does not match param id', (done) => {
            login(tester1, (err, token) => {
                if(err) return console.log(err);                

                chai.request(server)
                    .patch(`/api/users/${userId2}`)
                    .set('Authorization', token)
                    .then(res => {
                        // console.log(res);
                        expect(res).to.have.status(httpStatus.FORBIDDEN);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.unauthor).to.include('Unauthorization');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            })
        });
    });

    describe('DELETE /api/user/:id', () => {
        it('Should return 200 when a user is deleted', (done) => {
            login(tester1, (err, token) => {
                if(err) return console.log(err);

                chai.request(server)
                    .delete(`/api/users/${userId1}`)
                    .set('Authorization', token)
                    .then(res => {
                        expect(res).to.have.status(httpStatus.OK);
                        expect(res.body.success).to.be.true;
                        expect(res.body.deletedUser).to.be.a('object');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            })
        });

        it('Should return 401 if auth token is null', (done) => {            
            chai.request(server)
                .patch(`/api/users/${userId1}`)
                .set('Authorization', '')
                .then(res => {                    
                    expect(res).to.have.status(httpStatus.UNAUTHORIZED);
                    expect(res.body.success).to.be.false;
                    expect(res.body.error).to.be.a('object');
                    expect(res.body.error.invalidToken).to.include('Invalid auth token');
                    done();
                })
                .catch(err => {
                    done(err);
                });                                      
        });   

        it('Should return 401 if auth token is invalid', (done) => {
            login(tester1, (err, token) => {
                if(err) return onsole.log(err);                
                
                chai.request(server)
                    .patch(`/api/users/${userId1}`)
                    .set('Authorization', token+'gfji')
                    .then(res => {
                        expect(res).to.have.status(httpStatus.UNAUTHORIZED);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.unauthor).to.include('Unauthorization');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            });
        });   

        it('Should return 403 if payloaded id does not match param id', (done) => {
            login(tester1, (err, token) => {
                if(err) return console.log(err);                

                chai.request(server)
                    .patch(`/api/users/${userId2}`)
                    .set('Authorization', token)
                    .then(res => {
                        // console.log(res);
                        expect(res).to.have.status(httpStatus.FORBIDDEN);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.unauthor).to.include('Unauthorization');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            })
        });
    })
})
