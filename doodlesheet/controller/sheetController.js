const sheetModel = require('../model/sheetModel');
const sheetContentModel = require('../model/sheetContentModel')

/**
 * @brief get les tableurs de que l'utilisateur a créer
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns une liste
 */
const getMyListOfSheets = async(req, res, next) => {
    var list =  await sheetModel.find({ userid :  global.userId});
    return list;
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} sheetid l'id du tableur dans la bdd
 * @returns 
 */
const getSheet = async(req, res, next, sheetid) => {
    console.log("--", sheetid)
    var sheet =  await sheetModel.findOne({ sheetcontentid : sheetid});
    return sheet;
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} sheetid l'id du tableur dans la bdd
 * @returns 
 */
const getSheetContent = async(req, res, next, sheetid) => {
    var sheetcontent =  await sheetContentModel.find({ sheetcontentid : sheetid}).sort( { column: 1, row:1  } ); //ordre croissant 
    return sheetcontent;
}


/**
 * @file registerController.js
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @brief 
 */
const registerNewSheet =  async(req, res, next)  => {
    let columnHeader = ["A", "B", "C", "D", "E", "F"]; 
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
          for(var i = 0; i < 6 ; i++){
                for(var j = 1; j < 9 ; j++ ){
                    const newSheetContent = new sheetContentModel({
                        column : columnHeader[i],
                        row : j,
                        content : "-",
                        sheetcontentid: scid
                    });
                    newSheetContent.save()
                }
          }
          newSheet.save()
          .then((result) => {
            res.status(200);
          })
          .catch((error) => {
            res.status(401);
          });
        }
    };

module.exports = {registerNewSheet, getMyListOfSheets,getSheet, getSheetContent};
