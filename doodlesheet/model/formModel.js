const mongoose = require('mongoose');

/*
this is a model of file
support only : .csv
taille : small
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
    content: {//all data saved as a long string. for now..
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