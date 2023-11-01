var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// modele usercollections
const usercollectionSchema = new mongoose.Schema({
  name: String,
  password: String
});

let Usercollection;
try{
  Usercollection = mongoose.model('usercollections');
}
catch(error){
  Usercollection = mongoose.model('usercollections', usercollectionSchema);
}

/* GET Login Page*/
router.get("/", async(req, res) => {
  const result = await Usercollection.find();
  //res.send({"login" : result})
  console.log(result);
  res.render('login', { "userlist" : result});
})

/* DO authentification */
router.post('/authentification', async function(req, res, next) {
  const postData = req.body;
  console.log("Received POST data : ", postData);
  //Test connection
  if(postData.username == '')// || postData.password == '')
    res.send('Les champs ne sont pas complets')
  else{
    var user = await Usercollection.findOne({name:postData.username});
    if(user){
      console.log(postData.password);
      console.log(user.password);
      console.log(bcrypt.hashSync(postData.password,10));
      console.log(bcrypt.hashSync(user.password,10));
      var passwordMatches = await bcrypt.compare(postData.password, bcrypt.hashSync(user.password,10));
      if(passwordMatches){
        //console.log("Connexion réussie")
        res.send('Connexion réussie'); 
      }
      else{
        res.send('Le mot de passe est incorrecte'); 
      }
    }   
    else{
        console.log("L'utilisateur est inconnue");
    }
  }
});

module.exports = router;