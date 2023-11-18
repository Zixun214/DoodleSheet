const sheetModel = require('../model/sheetModel');

const getMyListOfSheets = async(req, res, next) => {
    var list =  await sheetModel.find({ userid :  global.userId});
    return list;
};


/**
 * @file registerController.js
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @brief 
 */
const registerNewSheet =  async(req, res, next)  => {
    const postData = req.body;
    console.log("Received POST data : ", postData);
    //Test connection
    if(postData.sheetname == ''){
        res.status(401); // Inscription non réussie
        res.send('Les champs ne sont pas complets');
    }
    else{
          //random const id
          var scid = Math.floor(Math.random() * 9999999);
          const newSheet = new sheetModel({
            sheetname: postData.sheetname,
            sheetcontentid: scid,
            dateCreated: new Date(), //TODO now
            userid: global.userId
          });
          newSheet.save()
          .then((result) => {
            res.status(200);
          })
          .catch((error) => {
            res.status(401);
          });
        }
    };

module.exports = {registerNewSheet, getMyListOfSheets};
