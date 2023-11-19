var express = require('express');
var router = express.Router();
const sheetController = require('../controller/sheetController');



/* GET sheet page. */
router.get('/', function(req, res, next) {
    res.render('createsheet', { title: 'Create new sheet' });
});
  
/**
 * @from POST
 * @param {*} req La requête
 * @param {*} res La réponse
 * @param {n} next
 * @brief Cette fonction gère l'inscription du client
 */
router.post('/registerNewSheet', async function(req, res, next) {
    await sheetController.registerNewSheet(req, res, next);
    if(res.statusCode == 200){
      //res.send("Compte créer avec succées");
      res.redirect('/sheets');
    }
    if(res.statusCode == 401){
      res.send("Erreur création du tableur");
    }
  });
  

module.exports = router;
  