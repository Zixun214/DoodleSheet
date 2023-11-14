const mongoose = require('mongoose');

/**
 * @constant usercollectionSchema Le schéma de Utilisateur 
 */
const usercollectionSchema = new mongoose.Schema({
    name: String,
    password: String
});
  
/**
 * @constant Usercollection Le modèle de Utilisateur 
 */
const Usercollection = mongoose.model('usercollections', usercollectionSchema);
module.exports = Usercollection;