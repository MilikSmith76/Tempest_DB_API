var database = require('../public/javascripts/databaseResource.js');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var email = req.body['email'];
  var password = req.body['password'];
  database.GetUser(email, password).then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

router.post('/', function(req, res, next) {
  var email = req.body['email'];
  var first = req.body['first'];
  var last = req.body['last'];
  var password = req.body['password'];
  var is_admin = req.body['is_admin'];
  database.PostUser(email, first, last, password, is_admin).then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

router.put('/:user_id', function(req, res, next) {
  var userID = req.body['user_id'];
  var email = req.body['email'];
  var first = req.body['first'];
  var last = req.body['last'];
  var password = req.body['password'];
  var oldPassword = req.body['old_password'];
  var balance = req.body['balance']
  database.PutUser(userID, email, first, last, password, oldPassword, balance).then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});

router.delete('/', function(req, res, next) {
  var userID = req.body['user_id'];
  database.DeleteUser(userID).then(
    function(result) {
      res.send(result);
    }, function(err) {
      res.send(err);
    });
});
module.exports = router;
