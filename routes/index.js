var database = require('../public/javascripts/databaseResource.js');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  /*connection.query('SELECT * from customers', (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });*/

  //res.render('index', { title: 'Express' , path: process.env.TEMP, db: result});
});

// router.get('/api/cart/:user_id/', function(req, res, next) {
// });
//
// router.get('/api/orderhistory/:user_id', function(req, res, next) {
// });

router.get('/api/status', function(req, res, next){
  database.status().then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

// router.get('/api/wishlist/:user_id', function(req, res, next) {
// });

module.exports = router;
