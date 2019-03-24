var database = require('../public/javascripts/databaseResource.js');
var express = require('express');
var router = express.Router();

router.get('/:pl_id', function(req, res, next) {
  var plID = req.params['pl_id'];
  database.GetProductListProduct(plID).then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

router.post('/', function(req, res, next) {
  var plID = req.body['pl_id'];
  var productID = req.body['product_id'];
  var purchasePrice = req.body['purchase_price'];
  database.PostProductListProduct(plID, productID, purchasePrice).then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

router.put('/', function(req, res, next){
  var plpID = req.body['plp_id'];
  var purchasePrice = req.body['purchase_price'];
  database.PutProductListProduct(plpID, purchasePrice).then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

router.delete('/', function(req, res, next){
  var plpID = req.body['plp_id'];
  database.DeleteProductListProduct(plpID).then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

module.exports = router
