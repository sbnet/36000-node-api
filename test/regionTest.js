// https://www.grafikart.fr/formations/javascript-unit-test
// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Region test', function(){

  it('should returns a 404', (done) => {
    chai.request(app)
        .get('/region/'+Math.random().toString(36))
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
  });

  it('should get all regions', (done) => {
    chai.request(app)
        .get('/region')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.above(0);
          done();
        });
  });

  it('should get one region by its ID', (done) => {
    chai.request(app)
        .get('/region/id/17')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.length.should.be.above(0);
            res.body.should.be.a('array');
            res.body[0].should.be.a('object');
            res.body[0].should.have.property('name').eql('PROVENCE-ALPES-COTE D\'AZUR');
          done();
        });
  });

  it('should search for prov', (done) => {
    chai.request(app)
        .get('/region/search/prov')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.length.should.be.above(0);
            res.body.should.be.a('array');
            res.body[0].should.be.a('object');
            res.body[0].should.have.property('name').eql('PROVENCE-ALPES-COTE D\'AZUR');
          done();
        });
  });
});
