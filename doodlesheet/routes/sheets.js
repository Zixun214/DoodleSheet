var express = require('express');
var router = express.Router();
const sheetController = require('../controller/sheetController');


/* GET sheet page. */
router.get('/', async function(req, res, next) {
  var all =  await sheetController.getMyListOfSheets(req, res, next);
  console.log(">>", all);
  res.render('sheets', { title: 'Your list of sheets' , all});
});

//TODO afficher le all dans le .ejp
//mettre register en MVC


module.exports = router;
