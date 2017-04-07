// https://www.grafikart.fr/formations/javascript-unit-test
// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
// http://chaijs.com/api/bdd/

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Area test', function(){

  it('should returns a 404', (done) => {
    chai.request(app)
        .get('/area/'+Math.random().toString(36))
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
  });

  it('should get all areas', (done) => {
    chai.request(app)
        .get('/area')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.above(0);
          done();
        });
  });

  it('should get one areas by its ID', (done) => {
    chai.request(app)
        .get('/area/id/85')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.length.should.be.above(0);
            res.body.should.be.a('array');
            res.body[0].should.be.a('object');
            res.body[0].should.have.property('name').eql('VAUCLUSE');
          done();
        });
  });

  it('should get one areas by its Code', (done) => {
    chai.request(app)
        .get('/area/code/84')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.length.should.be.above(0);
            res.body.should.be.a('array');
            res.body[0].should.be.a('object');
            res.body[0].should.have.property('name').eql('VAUCLUSE');
          done();
        });
  });

  it('should search for vau', (done) => {
    chai.request(app)
        .get('/area/search/vau')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.length.should.be.above(0);
            res.body.should.be.a('array');
            res.body[0].should.be.a('object');
            res.body[0].should.have.property('name').eql('VAUCLUSE');
          done();
        });
  });
});
