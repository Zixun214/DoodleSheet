var express = require('express'); 
var router = express.Router();
const registerController = require('../controller/registerController');


/**
 * @from GET
 * @param {*} req La requête
 * @param {*} res La réponse
 * @brief Cette fonction permet l'affichage de la page Sign Up
 */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Sign Up' });
});


/**
 * @from POST
 * @param {*} req La requête
 * @param {*} res La réponse
 * @param {n} next
 * @brief Cette fonction gère l'inscription du client
 */
router.post('/registerNewClient', async function(req, res, next) {
  await registerController.registerNewClient(req, res, next);
  if(res.statusCode === 200){
    res.send("Compte créer avec succées");
    //res.redirect('/login');
  }
  if(res.statusCode === 401){
    res.send("Inscirption échouée");
  }
});



module.exports = router;
