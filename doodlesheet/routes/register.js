var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// modele usercollections
const usercollectionSchema = new mongoose.Schema({
  name: String,
  password: String
});

try{
  Usercollection = mongoose.model('usercollections');
}
catch(error){
  Usercollection = mongoose.model('usercollections', usercollectionSchema);
}

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register');
});


/* POST register information */
router.post('/registerdone', async function(req, res, next) {
  const postData = req.body;
  console.log("Received POST data : ", postData);
  //Test connection
  if(postData.username == '' || postData.password == '')
    res.send('Les champs ne sont pas complets');
  else{
    var user = await Usercollection.findOne({name:postData.username});
    if(user){
      res.send('Ce nom est déjà utilisé par un autre utilisateur'); 
    }
    else{
      if(postData.password.length >= 8){
        res.send('Votre compte a été créer avec succees');
        const newUser = new Usercollection({
          name: postData.username,
          password: postData.password
        });
        newUser.save()
        .then((result) => {
          res.send('Nouvel utilisateur enregistré :', result);
        })
        .catch((error) => {
        res.send('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
        });
      }
      else{
        res.send('Le mot de passe est trop court (au moins 8 caracteres)');
      }
    }
  }
});

module.exports = router;
