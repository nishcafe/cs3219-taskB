let config = require('../config/config.json')
let mongoose = require('mongoose');

let testUtil = require('./foodUtil.json');
// mongoose.connect(config.DB_TEST, {useNewUrlParser: true});

var Food = require('../foodModel.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index.js');
let should = chai.should();
chai.use(chaiHttp);

describe('Food', () => {
    beforeEach((done) => { //Before each test we empty the database
        Food.deleteMany({}, (err) => {
           done();
        });
    });

    //test GET
    describe('/GET food', () => {
        it('it should get all the food entries in the diary', (done) => {
        chai.request(app)
            .get('/api/food')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    Object.keys(res.body.data).length.should.equal(0);
                done();
            });
        });

        it('it should get specific food entry by ID', (done) => {
            let food = new Food(testUtil.food_OK);
            food.save((err, food) => {
                chai.request(app)
              .get('/api/food/' + food.id)
              .send(food)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.should.have.property('name');
                    res.body.data.should.have.property('calories');
                    res.body.data.should.have.property('price');
                    res.body.data.should.have.property('_id').eql(food.id);
                done();
              });
            });
        });
    });


    //test POST
    describe('/POST food', () => {
        it('it should add a food entry into the diary', (done) => {
        chai.request(app)
            .post('/api/food')
            .send(testUtil.food_OK)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                done();
            });
        });

        it('it should not add a food entry without its name', (done) => {
        chai.request(app)
            .post('/api/food')
            .send(testUtil.food_without_name)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.errors.should.have.property('name');
                res.body.errors.name.should.have.property('kind').eql('required');
                done();
            });
        });
    });

    //test DELETE
    describe('/DELETE food', () => {
        it('it should delete food entry specified by its ID', (done) => {
            let food = new Food(testUtil.food_OK);
            food.save((err, food) => {
                chai.request(app)
                    .delete('/api/food/' + food.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Food deleted');
                        res.body.should.have.property('status').eql('success');
                        done();
                    });
            });
        });
    });

    //test PATCH
    describe('/PATCH food', () => {
        it('it should update specified fields', (done) => {
            let food = new Food(testUtil.food_OK);
            food.save((err, food) => {
                chai.request(app)
                    .put('/api/food/' + food.id)
                    .send(testUtil.fields_to_update)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Food info updated');
                        res.body.data.should.have.property('calories').eql(testUtil.fields_to_update.calories);
                        done();
                    })
            })
        })
    })

});