var express = require('express');
var router = express.Router();

/* GET sheet page. */
router.get('/', function(req, res, next) {
  res.render('sheet', { title: 'DoodleSheet file' });
});


module.exports = router;
