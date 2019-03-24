var database = require('../public/javascripts/databaseResource.js');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  database.GetAllCategory().then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

router.get('/:category_id', function(req, res, next) {
  var categoryID = req.params['category_id'];
  database.GetCategory(categoryID).then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

router.post('/', function(req, res, next){
  var name = req.body['name'];
  database.PostCategory(name).then(
    function(result) {
      res.send(result)
    }, function(err) {
      res.send(err)
    }
  );
});

router.put('/', function(req, res, next){
  var categoryID = req.body['category_id'];
  var name = req.body['name'];
  database.PutCategory(categoryID, name).then(
    function(result) {
      res.send(result)
    }, function(err) {
      res.send(err)
    }
  );
});

router.delete('/', function(req, res, next){
  var categoryID = req.body['category_id'];
  database.DeleteCategory(categoryID).then(
    function(result) {
      res.send(result)
    }, function(err) {
      res.send(err)
    }
  );
});

module.exports = router
