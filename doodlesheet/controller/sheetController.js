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
 * @param {*} sheetId l'id du tableur dans la bdd
 * @returns 
 */
const getSheet = async(req, res, next, sheetId) => {
    console.log("--", sheetId)
    var sheet = await sheetModel.findById(sheetId);
    return sheet;
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} sheetId l'id du tableur dans la bdd
 * @returns 
 */
const getSheetContent = async(req, res, next, sheetId) => {
    var sheetcontent =  await sheetContentModel.find({ sheetcontentid : sheetId}).sort( { column: 1, row:1  } ); //ordre croissant
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
    const columnHeader = ["A", "B", "C", "D", "E", "F"];
    const { sheetname } = req.body;

    try {
        const newSheet = new sheetModel({
            sheetname: sheetname,
            //userid: userId TODO
        });

        const savedSheet = await newSheet.save();

        let sheetContents = [];
        for (let i = 0; i < columnHeader.length; i++) {
            for (let j = 1; j <= 8; j++) {
                const newContent = {
                    column: columnHeader[i],
                    row: j,
                    content: "-",
                    sheetcontentid: savedSheet._id
                };
                sheetContents.push(sheetContentModel.create(newContent));
            }
        }

        await Promise.all(sheetContents);
        //res.status(200).send("Sheet created successfully");
    } catch (error) {
        console.error('Error creating sheet:', error);
        res.status(500).send("Error creating sheet");
    }
};

const saveSheet = async (sheetId, sheetData) => {
    try {
        for (let rowIndex = 0; rowIndex < sheetData.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < sheetData[rowIndex].length; columnIndex++) {
                const cellContent = sheetData[rowIndex][columnIndex];
                const column = String.fromCharCode(65 + columnIndex);
                const row = rowIndex + 1;

                await sheetContentModel.findOneAndUpdate(
                    { sheetcontentid: sheetId, column: column, row: row },
                    { content: cellContent },
                    { upsert: true }
                );
            }
        }
    } catch (error) {
        console.error('Error saving sheet content:', error);
        throw error;
    }
};

module.exports = {registerNewSheet, getMyListOfSheets, getSheet, getSheetContent, saveSheet};
