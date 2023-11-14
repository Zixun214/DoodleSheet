var express = require('express'); 
var router = express.Router();
const loginController = require('../controller/loginController');


/**
 * @from GET
 * @param {*} req La requête
 * @param {*} res La réponse
 * @brief Cette fonction permet l'affichage de la page Login
 */
router.get("/", async(req, res) => {
  res.render('login');
})

/**
 * @from POST
 * @param {*} req La requête
 * @param {*} res La réponse
 * @param {n} next
 * @brief Cette fonction gère l'authentification du client
 */
router.post('/authentification', async function(req, res, next) {
  await loginController.authentification(req, res, next);
  if(res.statusCode == 200) res.send("Connection réussie");
  if(res.statusCode == 401) res.send("Connection non réussie");
});


module.exports = router;