var express = require('express');
var router = express.Router();
var city = require('../models/City.js');
// var config = require('../config.js');
var api = require('../api.js');

/* Get biggers cities */
router.get('/biggers/:limit', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    city.getBiggers(req.params.limit, function(error, result) {
        if(error){
            res.send(JSON.stringify(error));
        }
        result = api.parseId('city', result);
        res.send(JSON.stringify(result));
    });
});

/* Get by his ID */
router.get('/id/:id', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    // If full data is required
    if (typeof req.query.full !== 'undefined') {
        city.getByIdFull(req.params.id, function(error, result) {
            if(error){
                res.send(JSON.stringify(error));
            }
            result = api.parseId('city', result);
            res.send(JSON.stringify(result));
        });
    } else {
        city.getById(req.params.id, function(error, result) {
            if(error){
                res.send(JSON.stringify(error));
            }
            result = api.parseId('city', result);
            res.send(JSON.stringify(result));
        });
    }
});

/* Get by his post code */
router.get('/postal/:id', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    // If full data is required
    if (typeof req.query.full !== 'undefined') {
        city.getByPostalFull(req.params.id, function(error, result) {
            if(error){
                res.send(JSON.stringify(error));
            }
            result = api.parseId('city', result);
            res.send(JSON.stringify(result));
        });
    } else {
        city.getByPostal(req.params.id, function(error, result) {
            if(error){
                res.send(JSON.stringify(error));
            }
            result = api.parseId('city', result);
            res.send(JSON.stringify(result));
        });
    }

});

/* Get by his INSEE code */
router.get('/insee/:insee', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    city.getByInsee(req.params.insee, function(error, result) {
        if(error){
            res.send(JSON.stringify(error));
        }
        result = api.parseId('city', result);
        res.send(JSON.stringify(result));
    });
});

/* Get by his area_id */
router.get('/area/:id', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    city.getByArea(req.params.id, function(error, result) {
        if(error){
            res.send(JSON.stringify(error));
        }
        result = api.parseId('city', result);
        res.send(JSON.stringify(result));
    });
});

/* Search for city */
router.get('/search/:q', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    city.search(req.params.q, function(error, result) {
        if(error){
            res.send(JSON.stringify(error));
        }
        result = api.parseId('city', result);
        res.send(JSON.stringify(result));
    });
});

/*
  Search by postal code for cities near another one
*/
router.get('/near/:postcode', function(req, res, next) {
    var distance = req.query.distance || 50;
    var limit = req.query.limit || 10;
    
    res.setHeader('Content-Type', 'application/json');
    city.near(req.params.postcode, distance, limit, function(error, result) {
        if(error){
            res.send(JSON.stringify(error));
        }
        result = api.parseId('city', result);
        res.send(JSON.stringify(result));
    });
});

router.get('/search', function(req, res, next) {
  res.render('areas-search', { title: 'Areas search' });
});

module.exports = router;
