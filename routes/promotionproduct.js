var database = require('../public/javascripts/databaseResource.js');
var express = require('express');
var router = express.Router();

router.get('/:pp_id', function(req, res, next) {
  var ppID = req.params['pp_id'];
  database.GetPromotionProduct(ppID).then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

router.post('/', function(req, res, next) {
  var promotionID = req.body['promotion_id'];
  var productID = req.body['product_id'];
  var discount = req.body['discount'];
  database.PostPromotionProduct(promotionID, productID, discount).then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

router.put('/', function(req, res, next){
  var ppID = req.body['pp_id'];
  var discount = req.body['discount'];
  database.PutPromotionProduct(ppID, discount).then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

router.delete('/', function(req, res, next){
  var ppID = req.body['pp_id'];
  database.DeletePromotionProduct(ppID).then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

module.exports = router
