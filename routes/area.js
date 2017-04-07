var express = require('express');
var router = express.Router();
var area = require('../models/Area.js');
var api = require('../api.js');

/* GET full listing */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    area.getAll(function(error, result) {
        if(error){
            res.send(JSON.stringify(error));
        }
        result = api.parseId('area', result);
        res.send(JSON.stringify(result));
    });
});

/* Get by his ID */
router.get('/id/:id', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  area.getById(req.params.id, function(error, result) {
      if(error){
          res.send(JSON.stringify(error));
      }
      result = api.parseId('area', result);
      res.send(JSON.stringify(result));
  });
});

/* Get by his region_id */
router.get('/regionid/:id', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  area.getByRegionId(req.params.id, function(error, result) {
      if(error){
          res.send(JSON.stringify(error));
      }
      result = api.parseId('area', result);
      res.send(JSON.stringify(result));
  });
});


/* Get by his code */
router.get('/code/:id', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  area.getByCode(req.params.id, function(error, result) {
      if(error){
          res.send(JSON.stringify(error));
      }
      result = api.parseId('area', result);
      res.send(JSON.stringify(result));
  });
});

/* Search for an area */
router.get('/search/:q', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  area.search(req.params.q, function(error, result) {
      if(error){
          res.send(JSON.stringify(error));
      }
      result = api.parseId('area', result);
      res.send(JSON.stringify(result));
  });
});

// router.get('/search', function(req, res, next) {
//   res.render('areas-search', { title: 'Areas search' });
// });

module.exports = router;
