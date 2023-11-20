const mongoose = require('mongoose');

/**
 * @constant SheetsSchema Le schéma d'un tableur 
 */
const SheetsSchema = new mongoose.Schema({
    sheetcontentid: {
        type: Number,
        required: true
    },
    sheetname: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    userid:{
        type: Number,
        require: true
    }
});
  
/**
 * @constant Sheets Le modèle d'un tableur
 */

//let Sheets;
try{
    Sheets = mongoose.model('sheets');
}
catch(error){
    Sheets = mongoose.model('sheets', SheetsSchema);
}
module.exports = Sheets;