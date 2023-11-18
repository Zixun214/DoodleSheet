const sheetModel = require('../model/sheetModel');

const getMyListOfSheets = async(req, res, next) => {
    var list =  await sheetModel.find({ userid :  global.userId});
    return list;
};

module.exports = {getMyListOfSheets};
