var database = require('../public/javascripts/databaseResource.js');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  database.GetAllPromotions().then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

router.get('/:promotion_id', function(req, res, next) {
  var promotionID = req.params['promotion_id'];
  database.GetPromotion(promotionID).then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

router.post('/', function(req, res, next){
  var name = req.body['name'];
  var description = req.body['description'];
  var banner = req.body['banner'];
  var dashboard = req.body['dashboard'];
  database.PostPromotion(name, description, banner, dashboard).then(
    function(result) {
      res.send(result)
    }, function(err) {
      res.send(err)
    }
  );
});

router.put('/', function(req, res, next){
  var promotionID = req.body['promotion_id'];
  var name = req.body['name'];
  var description = req.body['description'];
  var active = req.body['active'];
  var banner = req.body['banner'];
  var dashboard = req.body['dashboard'];
  database.PutPromotion(promotionID, name, description, active, banner, dashboard).then(
    function(result) {
      res.send(result)
    }, function(err) {
      res.send(err)
    }
  );
});

router.delete('/', function(req, res, next){
  var promotionID = req.body['promotion_id'];
  database.DeletePromotion(promotionID).then(
    function(result) {
      res.send(result)
    }, function(err) {
      res.send(err)
    }
  );
});

module.exports = router
