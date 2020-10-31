const fs = require('fs');
var path = require('path');

function sanitize(fileName) {
  return fileName.replace(/([^a-z0-9_. ]+)/gi, "");
};
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/added_images'));
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
var upload = multer({ storage: storage });
var express = require('express');
var router = express.Router();

router.get('/:image_name', function(req, res, next) {
  var imageName = req.params['image_name'];
  var imagePath = path.join(__dirname, '../public/images/added_images', imageName);
  res.sendFile(imagePath, function(err) {
    if (err) {
      res.sendFile(path.join(__dirname, '../public/images/', "home_background2.svg"));
    }
  });
});

router.post('/', upload.single('image_file'), function(req, res, next) {
  const imageFile = req.file;
  if (!imageFile) {
    res.json({
      'success': false,
    });
  } else {
    res.json({
      'success': true,
      'ogName': imageFile.originalname,
      'filename': imageFile.filename,
    });
  }

});

router.delete('/:image_name', function(req, res, next) {
  var imageName = req.params['image_name'];
  var imagePath = path.join(__dirname, '../public/images/', imageName);
  fs.unlink(imagePath, function(error) {
    if (error) {
      res.json({
        'success': false,
      });
    } else {
      res.json({
        'success': true,
      });
    }
  });
});

module.exports = router;
