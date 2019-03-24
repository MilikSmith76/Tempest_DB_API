var database = require('../public/javascripts/databaseResource.js');
var express = require('express');
var router = express.Router();

router.get('/:category_id', function(req, res, next) {
  //Add option for geting categories for a product
  var categoryID = req.params['category_id'];
  database.GetProductCategory(categoryID).then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

router.post('/', function(req, res, next) {
  var categoryID = req.body['category_id'];
  var productID = req.body['product_id'];
  database.PostProductCategory(categoryID, productID).then(
    function(result) {
      res.send(result)
    }, function(err) {
      res.send(err)
    }
  );
});

// router.put('/:id', function(req, res, next){
//   var id = req.params['id'];
//   var discount = req.body['discount'];
//   database.PutProductCategory(id, discount).then(
//     function(result) {
//       res.send(result)
//     }, function(err) {
//       res.send(err)
//     }
//   );
// });

router.delete('/', function(req, res, next){
  var pcID = req.body['pc_id'];
  database.DeleteProductCategory(pcID).then(
    function(result) {
      res.send(result)
    }, function(err) {
      res.send(err)
    }
  );
});

module.exports = router
