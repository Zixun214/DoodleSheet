var express = require('express');
var router = express.Router();
const sheetController = require('../controller/sheetController');

/* GET sheet page. */
router.get('/', async(req, res, next) => {
  var sheetid = req.originalUrl.replace('/sheet/%', '');
  var sheetInfo = await sheetController.getSheet(req, res, next, sheetid);
  var sheetContent = await sheetController.getSheetContent(req, res, next, sheetid);

  //console.log(sheetInfo);
  //console.log(sheetContent);
  res.render('sheet', { title: 'DoodleSheet file',sheetInfo, sheetContent});
});


module.exports = router;
