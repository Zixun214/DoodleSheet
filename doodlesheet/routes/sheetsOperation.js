const express = require('express');
const router = express.Router();
const sheetController = require('../controller/sheetController');


/* GET sheets/sheet page. */
router.get('/sheet/:sheetId', async (req, res, next) => {
    var sheetId = req.params.sheetId;
    var sheetInfo = await sheetController.getSheet(req, res, next, sheetId);
    var sheetContent = await sheetController.getSheetContent(req, res, next, sheetId);

    //console.log(sheetInfo);
    //console.log(sheetContent);
    res.render('sheet', { title: 'DoodleSheet file',sheetInfo, sheetContent});
});

// GET sheets page
router.get('/', async function(req, res, next) {
    try {
        var all = await sheetController.getMyListOfSheets(req, res, next);
        res.render('sheets', { title: 'Your list of sheets', all });
    } catch (error) {
        res.status(500).send('Error retrieving sheets');
    }
});


/* GET sheets/createsheet page. */
router.get('/createsheet', function(req, res) {
    res.render('createsheet', { title: 'Create new sheet' });
});

/**
 * @from POST
 * @param {*} req La requête
 * @param {*} res La réponse
 * @param {n} next
 * @brief Cette fonction gère l'inscription du client
 */
router.post('/create-sheet', async (req, res, next) => {
    try {
        await sheetController.registerNewSheet(req, res, next);
        res.redirect('/sheets');
    } catch (error) {
        console.error('Error creating sheet:', error);
        res.status(401).send('Error creating file');
    }
});

router.post('/save-sheet', async (req, res) => {
    //console.log(req.body);
    const { sheetId, sheetData } = req.body;
    try {
        await sheetController.saveSheet(sheetId, sheetData);
        res.redirect('/sheets');
    } catch (error) {
        console.error('Error saving sheet:', error);
        res.status(500).send('Error saving sheet');
    }
});
// more req here...

module.exports = router;