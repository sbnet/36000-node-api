var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('City test', function(){

  it('should returns a 404', (done) => {
    chai.request(app)
        .get('/city/'+Math.random().toString(36))
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
  });

  it('should get biggest cities', (done) => {
    chai.request(app)
        .get('/city/biggers/50')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.equal(50);
          res.body[0].should.be.a('object');
          done();
        });
  });

  it('should get one city by its ID', (done) => {
    chai.request(app)
        .get('/city/id/36657')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.length.should.be.above(0);
            res.body.should.be.a('array');
            res.body[0].should.be.a('object');
            res.body[0].should.have.property('name').eql('Châteauneuf-de-Gadagne');
            res.body[0].should.not.have.property('country_name');
          done();
        });
  });

  it('should get one city by its ID but with full data', (done) => {
    chai.request(app)
        .get('/city/id/36657?full')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.length.should.be.above(0);
            res.body.should.be.a('array');
            res.body[0].should.be.a('object');
            res.body[0].should.have.property('name').eql('Châteauneuf-de-Gadagne');
            res.body[0].should.have.property('country_name').eql('FRANCE');
          done();
        });
  });

  it('should get one city by its INSEE code', (done) => {
    chai.request(app)
        .get('/city/insee/84036')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.above(0);
          res.body.should.be.a('array');
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('name').eql('Châteauneuf-de-Gadagne');
          done();
        });
  });

  it('should get one city by its postal code', (done) => {
    chai.request(app)
        .get('/city/postal/84470')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.above(0);
          res.body.should.be.a('array');
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('name').eql('Châteauneuf-de-Gadagne');
          done();
        });
  });

  it('should search a city by its name', (done) => {
    chai.request(app)
        .get('/city/search/CHATEAUNEUFDEGAD')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.above(0);
          res.body.should.be.a('array');
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('name').eql('Châteauneuf-de-Gadagne');
          done();
        });
  });

  // it('should get nearest cities from a geopoint', (done) => {
  //   chai.request(app)
  //       .get('/city/geo/??')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.length.should.be.above(0);
  //         res.body.should.be.a('array');
  //         res.body[0].should.be.a('object');
  //         done();
  //       });
  // });

  it('should get nearest cities from a postcode', (done) => {
    chai.request(app)
        .get('/city/near/84470')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.equal(10);
          res.body[0].should.be.a('object');
          done();
        });
  });

});
