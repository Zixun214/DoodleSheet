const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');

/**
 * @file loginController.js
 * @param {*} req La requête
 * @param {*} res La réponse
 * @param {*} next 
 */
const authentification = async(req, res, next) => {
  const postData = req.body;
  console.log("Received POST data : ", postData);
  //Test connection
  if(postData.username == '' || postData.password == '')
    res.send('Les champs ne sont pas complets')
  else{
    var user = await userModel.findOne({name:postData.username});
    if(user){
      console.log(postData.password);
      console.log(user.sheetid);
      console.log(user.userid);
      console.log(bcrypt.hashSync(postData.password,10));
      console.log(bcrypt.hashSync(user.password,10));
      var passwordMatches = await bcrypt.compare(postData.password, bcrypt.hashSync(user.password,10));
      if(passwordMatches){
        global.userId = user.userid;
        res.status(200); // Authentification réussie
      } 
      else res.status(401); // Le mot de passe est incorrecte
    }   
    else res.status(401); // L'utilisateur est inconnue
  }
}


module.exports = {authentification};