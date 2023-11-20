const formModel = require('../model/formModel');

const createFile = async (data, userId) => {
    const fileData = { ...data, user: userId };
    // use formModel to create file
    const newFile = new formModel(fileData);
    await newFile.save();
    return newFile;
};

// more fct update here...


// and here ...
module.exports = { createFile};