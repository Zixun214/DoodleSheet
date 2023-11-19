const mongoose = require('mongoose');

/**
 * @constant SheetsSchemaContent Le schéma du contenu d'un tableur 
 */
const SheetsSchemaContent = new mongoose.Schema({
    column : String,
    row : Number,
    content : String,
    sheetcontentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sheet'
    }
});
  
/**
 * @constant SheetsContent Le modèle du contenu d'un tableur
 */

try{
    SheetsContent = mongoose.model('sheetcontents');
}
catch(error){
    SheetsContent = mongoose.model('sheetcontents', SheetsSchemaContent);
}
module.exports = SheetsContent;