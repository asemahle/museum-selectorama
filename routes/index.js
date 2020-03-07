const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('hello');
});

router.get('/hello', function(req, res, next) {
  res.render('hello');
});

router.get('/goodbye', function(req, res, next) {
  res.render('goodbye');
});

module.exports = router;
