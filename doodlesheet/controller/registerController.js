const userModel = require('../model/userModel');


/**
 * @file registerController.js
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @brief 
 */
const registerNewClient =  async(req, res, next)  => {
    const postData = req.body;
    console.log("Received POST data : ", postData);
    //Test connection
    if(postData.username == '' || postData.password == ''){
      res.send('Les champs ne sont pas complets');
      res.status(401); // Inscription non réussie
    }
    else{
      var user = await userModel.findOne({name:postData.username});
      if(user){
        res.send('Ce nom est déjà utilisé par un autre utilisateur'); 
      }
      else{
        var userid = Math.floor(Math.random() * 9999999);
        if(postData.password.length >= 0){
          const newUser = new userModel({
            name: postData.username,
            password: postData.password,
            userid: userid
          });
          newUser.save()
          .then((result) => {
            res.status(200);
          })
          .catch((error) => {
            res.status(401);
          });
        }
        else{
          res.send('Le mot de passe est trop court (au moins 8 caracteres)');
        }
      }
    }
  };

module.exports = {registerNewClient};