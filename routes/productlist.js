var database = require('../public/javascripts/databaseResource.js');
var express = require('express');
var router = express.Router();

router.get('/:user_id', function(req, res, next) {
  var userID = req.params['user_id'];
  database.GetProductList(userID).then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

router.post('/', function(req, res, next) {
  var userID = req.body['user_id'];
  database.PostProductList(userID).then(
    function(result) {
      res.send(result)
    }, function(err) {
      res.send(err)
    });
});

// router.put('/:id', function(req, res, next){
//   database.PutProductList().then(
//     function(result) {
//       res.send(result)
//     }, function(err) {
//       res.send(err)
//     }
//   );
// });

router.delete('/', function(req, res, next){
  var userID = req.body['user_id'];
  database.DeleteProductList(userID).then(
    function(result) {
      res.send(result)
    }, function(err) {
      res.send(err)
    });
});

module.exports = router
