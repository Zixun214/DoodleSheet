const mongoose = require('mongoose');

/*
this is a model of file
support only : .csv
all data saved as a long string.
Make sure the file not too large!!!
for ex :
Nom,prenom,age
ZHOU,Zixun,23
none

will be saved as "Nom,prenom,age\nZHOU,Zixun,23\none"
 */

//define file structure
const formSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    content: {//all data saved as a long string.
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const formModel = mongoose.model('Form', formSchema);

module.exports = formModel;