const express = require('express');
const router = express.Router();

/* GET Hello */
router.get('/hello/01-hello', function(req, res, next) {
  res.render('hello/01-hello');
});

router.get('/hello/02-input-feelings', function(req, res, next) {
  res.render('hello/02-input-feelings');
});

router.get('/hello/03-thank-you', function(req, res, next) {
  res.render('hello/03-thank-you');
});

/* GET Goodbye */
router.get('/goodbye/00-welcome-back', function(req, res, next) {
  res.render('goodbye/00-welcome-back');
});

router.get('/goodbye/01-hello', function(req, res, next) {
  res.render('goodbye/01-hello');
});

router.get('/goodbye/02-input-feelings', function(req, res, next) {
  res.render('goodbye/02-input-feelings');
});

router.get('/goodbye/03-input-feelings-before', function(req, res, next) {
  res.render('goodbye/03-input-feelings-before');
});

router.get('/goodbye/04-input-feelings-after', function(req, res, next) {
  res.render('goodbye/04-input-feelings-after');
});

router.get('/goodbye/05-thank-you', function(req, res, next) {
  res.render('goodbye/05-thank-you');
});

module.exports = router;
