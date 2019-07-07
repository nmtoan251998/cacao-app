/*
TODO: Update document in Product model: description minength 50 -> undefined
TODO: Testing price when creating new product
*/

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const httpStatus = require('http-status');
const mongoose = require('mongoose');

const expect = chai.expect;
const server = require('../app');
const User = require('../model/users.model');
const Products = require('../model/products.model');

chai.use(chaiHttp);

describe('Products API', () => {
    let tester;    
    let featuredProduct, normalProduct;

    beforeEach(async () => {   
        tester = {
            accountname: 'testerbeo',
            password: '12345678',    
            username: 'Tester Béo',
        };

        featuredProduct = {
            name: 'Cacao MieoMiao',
            type: 'drink',
            price: 500,
            description: 'Cacao này chill phết',
            featured: true
        };    

        normalProduct = {
            name: 'Bánh nhím',
            type: 'food',
            price: 200,
            description: 'Bánh nhím này péo phết',
            featured: false
        };

        await Products.deleteMany({});
        await User.deleteMany({});
        await Promise.all([            
            User.create(tester),
            Products.create(featuredProduct),                
            Products.create(normalProduct),
        ])
        .then(fullfilled => {
            // console.log(fullfilled);
        })
        .catch(err => {
            console.log(err);
        })
    });

    function login(user, cb) {
        chai.request(server)
            .post('/auth/login')
            .send(user)
            .then(res => {                
                cb(null, res.body.token);
            })
            .catch(err => {
                cb(err);
            });
    };

    describe('GET /api/products/all', () => {
        it('Should return 200 when all current products are found', (done) => {
            chai.request(server)
                .get('/api/products/all')
                .then(res => {                    
                    expect(res).to.have.status(httpStatus.OK);
                    expect(res.body.success).to.be.true;
                    expect(res.body.products).to.be.a('array');
                    done();
                })
                .catch(err => {
                    done(err);
                })
        });

        it('Should return 404 when no products are found', (done) => {
            Products.deleteMany({})
                .then(() => {
                    chai.request(server)
                        .get('/api/products/all')
                        .then(res => {
                            expect(res).to.have.status(httpStatus.NOT_FOUND);
                            expect(res.body.success).to.be.false;
                            expect(res.body.error).to.be.a('object');
                            expect(res.body.error.noProducts).to.include('No products found');
                            done();
                        })
                        .catch(err => {
                            done(err);
                        })
                })
                .catch(err => {
                    console.log('Error deleting products for testing');
                })
        });
    });

    describe('POST /api/products', () => {        
        it('Should return 200 when a new product is created', (done) => {                                    
            const validFeaturedProduct = {
                name: 'Trà đào hạt chiachia',
                type: 'drink',
                price: 200,
                description: 'Trà đào hạt chia này chia phết',
                featured: true
            }

            login(tester, (err, token) => {                
                chai.request(server)
                    .post('/api/products')
                    .set('Authorization', token)
                    .send(validFeaturedProduct)
                    .then(res => {                        
                        expect(res).to.have.status(httpStatus.OK);
                        expect(res.body.success).to.be.true;
                        expect(res.body.newProduct).to.be.a('object');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            });
        });

        it('Should return 401 if auth token is null', (done) => {            
            chai.request(server)
                .post(`/api/products`)
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
            login(tester, (err, token) => {
                if(err) return console.log(err);                
                
                chai.request(server)
                    .post(`/api/products`)
                    .set('Authorization', token+'gfji')
                    .then(res => {
                        expect(res).to.have.status(httpStatus.UNAUTHORIZED);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.invalidToken).to.include('Invalid auth token');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            });
        });

        it('Should return 400 when name field is empty', (done) => {
            const validFeaturedProduct = {
                name: '',
                type: 'drink',
                price: 200,
                description: 'Trà đào hạt chia này chia phết',
                featured: true
            };

            login(tester, (err, token) => {                
                chai.request(server)
                    .post('/api/products')
                    .set('Authorization', token)
                    .send(validFeaturedProduct)
                    .then(res => {                        
                        expect(res).to.have.status(httpStatus.BAD_REQUEST);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.emptyName).to.include('Name field cannot be empty');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            });
        });

        it('Should return 400 when name field is below 1 and above 100 characters', (done) => {
            const validFeaturedProduct = {
                name: 'Trà đào hạt chiachia Trà đào hạt chiachia Trà đào hạt chiachia Trà đào hạt chiachia Trà đào hạt chiachia Trà đào hạt chiachia Trà đào hạt chiachia Trà đào hạt chiachia Trà đào hạt chiachia Trà đào hạt chiachia ',
                type: '',
                price: 200,
                description: 'Trà đào hạt chia này chia phết',
                featured: true
            }

            login(tester, (err, token) => {                
                chai.request(server)
                    .post('/api/products')
                    .set('Authorization', token)
                    .send(validFeaturedProduct)
                    .then(res => {                        
                        expect(res).to.have.status(httpStatus.BAD_REQUEST);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.nameLength).to.include('Name field must be at least 1 and below 100 characters');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            });
        });

        it('Should return 400 when type field is differs from drink or food', (done) => {
            const validFeaturedProduct = {
                name: 'Trà đào hạt chiachia',
                type: 'drinks',
                price: 200,
                description: 'Trà đào hạt chia này chia phết',
                featured: true
            }

            login(tester, (err, token) => {                
                chai.request(server)
                    .post('/api/products')
                    .set('Authorization', token)
                    .send(validFeaturedProduct)
                    .then(res => {                        
                        expect(res).to.have.status(httpStatus.BAD_REQUEST);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.invalidType).to.include('Type field is either drink or food');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            });
        });

        it('Should return 400 when featured field is empty', (done) => {
            const validFeaturedProduct = {
                name: 'Trà đào hạt chiachia',
                type: 'drink',
                price: 200,
                description: 'Trà đào hạt chia này chia phết',
                featured: ''
            };

            login(tester, (err, token) => {                
                chai.request(server)
                    .post('/api/products')
                    .set('Authorization', token)
                    .send(validFeaturedProduct)
                    .then(res => {                        
                        expect(res).to.have.status(httpStatus.BAD_REQUEST);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.emptyFeature).to.include('Feature field cannot be empty');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            });
        });

        it('Should return 400 when featured exists but differs from true or false', (done) => {
            const validFeaturedProduct = {
                name: 'Trà đào hạt chiachia',
                type: 'drink',
                price: 200,
                description: 'Trà đào hạt chia này chia phết',
                featured: 'trues'
            };

            login(tester, (err, token) => {                
                chai.request(server)
                    .post('/api/products')
                    .set('Authorization', token)
                    .send(validFeaturedProduct)
                    .then(res => {                        
                        expect(res).to.have.status(httpStatus.BAD_REQUEST);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.featureFormat).to.include('Feature field can only be true or false');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            });
        });

        it('Should return 400 when price field is not a number format', (done) => {
            const validFeaturedProduct = {
                name: 'Trà đào hạt chiachia',
                type: 'drink',
                price: '2t00',
                description: 'Trà đào hạt chia này chia phết',
                featured: true
            }

            login(tester, (err, token) => {                
                chai.request(server)
                    .post('/api/products')
                    .set('Authorization', token)
                    .send(validFeaturedProduct)
                    .then(res => {                        
                        expect(res).to.have.status(httpStatus.BAD_REQUEST);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.priceFormat).to.include('Price field must be a number');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            });
        });

        it('Should return 400 when price field is not below value 3', (done) => {
            const validFeaturedProduct = {
                name: 'Trà đào hạt chiachia',
                type: 'drink',
                price: 2,
                description: 'Trà đào hạt chia này chia phết',
                featured: true
            }

            login(tester, (err, token) => {                
                chai.request(server)
                    .post('/api/products')
                    .set('Authorization', token)
                    .send(validFeaturedProduct)
                    .then(res => {                        
                        expect(res).to.have.status(httpStatus.BAD_REQUEST);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.priceValue).to.include('Price field must be at least 3');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            });
        });

        it('Should return 400 when description field exist but ', (done) => {
            const validFeaturedProduct = {
                name: 'Trà đào hạt chiachia',
                type: 'drink',
                price: 200,
                description: 'Trà đào này chill vãi cái củ lồn các ông ạ Description field must be between 30 and 150 charactersDescription field must be between 30 and 150 charactersDescription field must be between 30 and 150 charactersDescription field must be between 30 and 150 charactersDescription field must be between 30 and 150 characters',
                featured: true
            }

            login(tester, (err, token) => {                
                chai.request(server)
                    .post('/api/products')
                    .set('Authorization', token)
                    .send(validFeaturedProduct)
                    .then(res => {                        
                        expect(res).to.have.status(httpStatus.BAD_REQUEST);
                        expect(res.body.success).to.be.false;
                        expect(res.body.error).to.be.a('object');
                        expect(res.body.error.descLength).to.include('Description field must be between 30 and 150 characters');
                        done();
                    })
                    .catch(err => {
                        done(err);
                    })
            });
        });
    });

    describe('DELETE /api/products', () => {
        it('Should return 200 when a product is deleted', (done) => {
            Products.findOne({ name: featuredProduct.name })
                .then(product => {
                    const validProductId = product._id;

                    login(tester, (err, token) => {
                        if(err) return console.log(err);

                        chai.request(server)
                            .delete(`/api/products/${validProductId}`)
                            .set('Authorization', token)
                            .then(res => {                                                    
                                expect(res).to.have.status(httpStatus.OK);
                                expect(res.body.success).to.be.true;
                                expect(res.body.deletedProduct).to.be.a('object');  
                                expect(res.body.deletedProduct._id).to.be.equal(validProductId.toString());
                                done();
                            })
                            .catch(err => {
                                done(err);
                            })
                    });                    
                })
        });

        it('Should return 404 when no product is deleted', (done) => {
            Products.findOne({ name: featuredProduct.name })
                .then(product => {
                    const invalidProductId = mongoose.Types.ObjectId
                                                (
                                                    product._id                                        
                                                    .toString()
                                                    .replace(/\d/g, '0')
                                                );

                    login(tester, (err, token) => {
                        if(err) return console.log(err);

                        chai.request(server)
                            .delete(`/api/products/${invalidProductId}`)
                            .set('Authorization', token)
                            .then(res => {                                                    
                                expect(res).to.have.status(httpStatus.NOT_FOUND);
                                expect(res.body.success).to.be.false;
                                expect(res.body.error).to.be.a('object');  
                                expect(res.body.error.noProduct).to.include('No product found');
                                done();
                            })
                            .catch(err => {
                                done(err);
                            })
                    });                    
                })
        });

        it('Should return 401 if auth token is null', (done) => {            
            Products.findOne({ name: featuredProduct.name })
                .then(product => {
                    const validProductId = product._id;

                    chai.request(server)
                        .delete(`/api/products/${validProductId}`)
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
                })                                                
        });   

        it('Should return 401 if auth token is invalid', (done) => {
            Products.findOne({ name: featuredProduct.name })
                .then(product => {
                    const validProductId = product._id;

                    login(tester, (err, token) => {
                        if(err) return console.log(err);                
                        
                        chai.request(server)
                            .delete(`/api/products/${validProductId}`)
                            .set('Authorization', token+'gfji')
                            .then(res => {
                                expect(res).to.have.status(httpStatus.UNAUTHORIZED);
                                expect(res.body.success).to.be.false;
                                expect(res.body.error).to.be.a('object');
                                expect(res.body.error.invalidToken).to.include('Invalid auth token');
                                done();
                            })
                            .catch(err => {
                                done(err);
                            })
                });            
            });
        });
    });

    describe('PATCH /api/products', () => {
        it('Should return 200 if a product is modified', (done) => {
            Products.findOne({ name: featuredProduct.name })
                .then(product => {
                    const validProductId = product._id;

                    const validModifiedProduct = {
                        ...featuredProduct,
                        name: 'Cacao MieoMieo'
                    }

                    login(tester, (err, token) => {
                        if(err) return console.log(err);

                        chai.request(server)
                            .patch(`/api/products/${validProductId}`)
                            .set('Authorization', token)  
                            .send(validModifiedProduct)
                            .then(res => {                                                                 
                                expect(res).to.have.status(httpStatus.OK);
                                expect(res.body.success).to.be.true;
                                expect(res.body.updatedProduct).to.be.a('object');  
                                done();
                            })
                            .catch(err => {
                                done(err);
                            })
                });                    
            })
        }); 
        
        it('Should return 404 if no product found', (done) => {
            Products.findOne({ name: featuredProduct.name })
                .then(product => {
                    const invalidProductId = mongoose.Types.ObjectId
                                                (
                                                    product._id                                        
                                                    .toString()
                                                    .replace(/\d/g, '0')
                                                );

                    const validModifiedProduct = {
                        ...featuredProduct,
                        name: 'Cacao MieoMieo'
                    }

                    login(tester, (err, token) => {
                        if(err) return console.log(err);

                        chai.request(server)
                            .patch(`/api/products/${invalidProductId}`)
                            .set('Authorization', token)  
                            .send(validModifiedProduct)
                            .then(res => {                                                                 
                                expect(res).to.have.status(httpStatus.NOT_FOUND);
                                expect(res.body.success).to.be.false;
                                expect(res.body.error).to.be.a('object');  
                                expect(res.body.error.noProduct).to.include('No product found');  
                                done();
                            })
                            .catch(err => {
                                done(err);
                            })
                });                    
            })
        }); 

        it('Should return 401 if auth token is null', (done) => {            
            Products.findOne({ name: featuredProduct.name })
                .then(product => {
                    const validProductId = product._id;

                    chai.request(server)
                        .patch(`/api/products/${validProductId}`)
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
                })                                                
        });   

        it('Should return 401 if auth token is invalid', (done) => {
            Products.findOne({ name: featuredProduct.name })
                .then(product => {
                    const validProductId = product._id;

                    login(tester, (err, token) => {
                        if(err) return console.log(err);                
                        
                        chai.request(server)
                            .patch(`/api/products/${validProductId}`)
                            .set('Authorization', token+'gfji')
                            .then(res => {
                                expect(res).to.have.status(httpStatus.UNAUTHORIZED);
                                expect(res.body.success).to.be.false;
                                expect(res.body.error).to.be.a('object');
                                expect(res.body.error.invalidToken).to.include('Invalid auth token');
                                done();
                            })
                            .catch(err => {
                                done(err);
                            })
                });            
            });
        });

        it('Should return 400 when name field is empty', (done) => {
            Products.findOne({ name: featuredProduct.name })
                .then(product => {
                    const validProductId = product._id;

                    const validModifiedProduct = {
                        ...featuredProduct,
                        name: ''
                    }

                    login(tester, (err, token) => {
                        if(err) return console.log(err);

                        chai.request(server)
                            .patch(`/api/products/${validProductId}`)
                            .set('Authorization', token)  
                            .send(validModifiedProduct)
                            .then(res => {                                                                 
                                expect(res).to.have.status(httpStatus.BAD_REQUEST);
                                expect(res.body.success).to.be.false;
                                expect(res.body.error).to.be.a('object');  
                                done();
                            })
                            .catch(err => {
                                done(err);
                            })
                });                    
            })
        });           
        
        it('Should return 400 when name field is below 1 and above 100 characters', (done) => {
            Products.findOne({ name: featuredProduct.name })
                .then(product => {
                    const validProductId = product._id;

                    const validModifiedProduct = {
                        ...featuredProduct,
                        name: 'Trà đào hạt chiachia Trà đào hạt chiachia Trà đào hạt chiachia Trà đào hạt chiachia Trà đào hạt chiachia Trà đào hạt chiachia Trà đào hạt chiachia Trà đào hạt chiachia Trà đào hạt chiachia Trà đào hạt chiachia ',
                    }

                    login(tester, (err, token) => {
                        if(err) return console.log(err);

                        chai.request(server)
                            .patch(`/api/products/${validProductId}`)
                            .set('Authorization', token)  
                            .send(validModifiedProduct)
                            .then(res => {                                                                 
                                expect(res).to.have.status(httpStatus.BAD_REQUEST);
                                expect(res.body.success).to.be.false;
                                expect(res.body.error).to.be.a('object');  
                                done();
                            })
                            .catch(err => {
                                done(err);
                            })
                });                    
            })
        });

        it('Should return 400 when type field is differs from drink or food', (done) => {            
            Products.findOne({ name: featuredProduct.name })
                .then(product => {
                    const validProductId = product._id;

                    const validModifiedProduct = {
                        ...featuredProduct,
                        type: 'drinks',
                    }

                    login(tester, (err, token) => {
                        if(err) return console.log(err);

                        chai.request(server)
                            .patch(`/api/products/${validProductId}`)
                            .set('Authorization', token)  
                            .send(validModifiedProduct)
                            .then(res => {                                                                 
                                expect(res).to.have.status(httpStatus.BAD_REQUEST);
                                expect(res.body.success).to.be.false;
                                expect(res.body.error).to.be.a('object');  
                                done();
                            })
                            .catch(err => {
                                done(err);
                            })
                });                    
            })
        });

        it('Should return 400 when featured field is empty', (done) => {
            Products.findOne({ name: featuredProduct.name })
                .then(product => {
                    const validProductId = product._id;

                    const validModifiedProduct = {
                        ...featuredProduct,
                        featured: ''
                    }

                    login(tester, (err, token) => {
                        if(err) return console.log(err);

                        chai.request(server)
                            .patch(`/api/products/${validProductId}`)
                            .set('Authorization', token)  
                            .send(validModifiedProduct)
                            .then(res => {                                                                 
                                expect(res).to.have.status(httpStatus.BAD_REQUEST);
                                expect(res.body.success).to.be.false;
                                expect(res.body.error).to.be.a('object');  
                                done();
                            })
                            .catch(err => {
                                done(err);
                            })
                });                    
            })
        });

        it('Should return 400 when featured exists but differs from true or false', (done) => {
            Products.findOne({ name: featuredProduct.name })
                .then(product => {
                    const validProductId = product._id;

                    const validModifiedProduct = {
                        ...featuredProduct,
                        featured: 'trues'
                    }

                    login(tester, (err, token) => {
                        if(err) return console.log(err);

                        chai.request(server)
                            .patch(`/api/products/${validProductId}`)
                            .set('Authorization', token)  
                            .send(validModifiedProduct)
                            .then(res => {                                                                 
                                expect(res).to.have.status(httpStatus.BAD_REQUEST);
                                expect(res.body.success).to.be.false;
                                expect(res.body.error).to.be.a('object');  
                                done();
                            })
                            .catch(err => {
                                done(err);
                            })
                });                    
            })
        });

        it('Should return 400 when price field is not a number format', (done) => {
            Products.findOne({ name: featuredProduct.name })
                .then(product => {
                    const validProductId = product._id;

                    const validModifiedProduct = {
                        ...featuredProduct,
                        price: '2t00',
                    }

                    login(tester, (err, token) => {
                        if(err) return console.log(err);

                        chai.request(server)
                            .patch(`/api/products/${validProductId}`)
                            .set('Authorization', token)  
                            .send(validModifiedProduct)
                            .then(res => {                                                                 
                                expect(res).to.have.status(httpStatus.BAD_REQUEST);
                                expect(res.body.success).to.be.false;
                                expect(res.body.error).to.be.a('object');  
                                done();
                            })
                            .catch(err => {
                                done(err);
                            })
                });                    
            })
        });

        it('Should return 400 when price field is not below value 3', (done) => {
            Products.findOne({ name: featuredProduct.name })
                .then(product => {
                    const validProductId = product._id;

                    const validModifiedProduct = {
                        ...featuredProduct,
                        price: 2,
                    }

                    login(tester, (err, token) => {
                        if(err) return console.log(err);

                        chai.request(server)
                            .patch(`/api/products/${validProductId}`)
                            .set('Authorization', token)  
                            .send(validModifiedProduct)
                            .then(res => {                                                                 
                                expect(res).to.have.status(httpStatus.BAD_REQUEST);
                                expect(res.body.success).to.be.false;
                                expect(res.body.error).to.be.a('object');  
                                done();
                            })
                            .catch(err => {
                                done(err);
                            })
                });                    
            })
        });

        it('Should return 400 when description field exist but ', (done) => {
            Products.findOne({ name: featuredProduct.name })
                .then(product => {
                    const validProductId = product._id;

                    const validModifiedProduct = {
                        ...featuredProduct,
                        description: 'Trà đào này chill vãi cái củ lồn các ông ạ Description field must be between 30 and 150 charactersDescription field must be between 30 and 150 charactersDescription field must be between 30 and 150 charactersDescription field must be between 30 and 150 charactersDescription field must be between 30 and 150 characters',
                    }

                    login(tester, (err, token) => {
                        if(err) return console.log(err);

                        chai.request(server)
                            .patch(`/api/products/${validProductId}`)
                            .set('Authorization', token)  
                            .send(validModifiedProduct)
                            .then(res => {                                                                 
                                expect(res).to.have.status(httpStatus.BAD_REQUEST);
                                expect(res.body.success).to.be.false;
                                expect(res.body.error).to.be.a('object');  
                                done();
                            })
                            .catch(err => {
                                done(err);
                            })
                });                    
            })
        });
    });
})