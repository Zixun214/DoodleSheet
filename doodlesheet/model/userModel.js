const mongoose = require('mongoose');

/**
 * @constant usercollectionSchema Le schéma de Utilisateur 
 */
const usercollectionSchema = new mongoose.Schema({
    name: String,
    password: String,
    userid: Number
});
  
/**
 * @constant Usercollections Le modèle de Utilisateur 
 */


try{
    Usercollections = mongoose.model('usercollections');
}
catch(error){
    Usercollections = mongoose.model('usercollections', usercollectionSchema);
}
module.exports = Usercollections;