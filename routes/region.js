var express = require('express');
var router = express.Router();
var region = require('../models/Region.js');
var api = require('../api.js');

/* GET regions listing. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    region.getAll(function(error, result) {
        if(error){
            res.send(JSON.stringify(error));
        }
        result = api.parseId('region', result);
        res.send(JSON.stringify(result));
    });
});

/* Get a region by his ID */
router.get('/id/:id', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  region.getById(req.params.id, function(error, result) {
      if(error){
          res.send(JSON.stringify(error));
      }
      result = api.parseId('region', result);
      res.send(JSON.stringify(result));
  });
});

/* Search for a region */
router.get('/search/:q', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  region.search(req.params.q, function(error, result) {
      if(error){
          res.send(JSON.stringify(error));
      }
      result = api.parseId('region', result);
      res.send(JSON.stringify(result));
  });
});

module.exports = router;
