var database = require('../public/javascripts/databaseResource.js');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  database.GetAllProducts().then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

router.get('/:product_id', function(req, res, next) {
  var productID = req.params['product_id'];
  database.GetProduct(productID).then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

router.post('/', function(req, res, next){
  var name = req.body['name'];
  var description = req.body['description'];
  var price = req.body['price'];
  var image = req.body['image'];
  database.PostProduct(name, description, price, image).then(
    function(result) {
      res.send(result)
    }, function(err) {
      res.send(err)
    }
  );
});

router.put('/', function(req, res, next){
  var productID = req.body['product_id'];
  var name = req.body['name'];
  var description = req.body['description'];
  var price = req.body['price'];
  var image = req.body['image'];
  database.PutProduct(productID, name, description, price, image).then(
    function(result) {
      res.send(result)
    }, function(err) {
      res.send(err)
    }
  );
});

router.delete('/', function(req, res, next){
  var productID = req.body['product_id'];
  database.DeleteProduct(productID).then(
    function(result) {
      res.send(result)
    }, function(err) {
      res.send(err)
    }
  );
});

module.exports = router;
