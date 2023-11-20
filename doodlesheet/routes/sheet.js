var express = require('express');
var router = express.Router();
const sheetController = require('../controller/sheetController');

/**
 * @brief affichage sheet
 */
router.get('/:sheetId', async(req, res, next) => {
  var sheetid = req.originalUrl.replace('/sheet/', '');
  var sheetInfo = await sheetController.getSheet(req, res, next, sheetid);
  var sheetContent = await sheetController.getSheetContent(req, res, next, sheetid);
  res.render('sheet', { title: 'DoodleSheet file',sheetInfo, sheetContent});
});

/**
 * @brief sauvegarde sheet
 */
router.post('/save/:sheetId', async(req, res, next) => {
  var sheetid = req.originalUrl.replace('sheet/save/', '').replace('/', '');
  await sheetController.savesheet(req, res, next, sheetid);
});

/**
 * @brief redirection vers la liste des sheets
 */
router.post('/close', async(req, res, next) => {
  res.redirect('/sheets');
})




module.exports = router;
