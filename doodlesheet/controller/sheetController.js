const sheetModel = require('../model/sheetModel');
const sheetContentModel = require('../model/sheetContentModel')
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios');

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
    //console.log("--", sheetid)
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
    var sheetcontent =  await sheetContentModel.find({ sheetcontentid : sheetid}).sort( { row: 1, column:1  } ); //ordre croissant 
    return sheetcontent;
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} sheetid l'id du tableur dans la bdd
 * @returns 
 */
const savesheet = async(req, res, next, sheetid) => {
    const data = req.body;
    //console.log("POST" , data);

    const url = 'http://localhost:8000/sheet/' + sheetid; // Assurez-vous de mettre le bon port et chemin d'accès
    try {
        const response = await axios.get(url);

        const dom = new JSDOM(response.data);

        const document = dom.window.document;

        const tableRows = Array.from(document.querySelectorAll('.sheet-table tr[id]'));

        let index = 0;

        await Promise.all(tableRows.map(async (row) => {
            const rowId = row.id;
            const cells = Array.from(row.querySelectorAll('td[id] input[type="text"]'));
            await Promise.all(cells.map(async (cell) => {
                const cellId = cell.parentElement.id;
                const inputPlaceholderValue = cell.getAttribute('placeholder');
                let inputValue = data.caseText[index];
                index = index +1;
                //console.log("cell : ", cellId, " row : ", rowId, "index : ", index, " value : ",  inputValue);
                //console.log("@-- " , inputValue);
                inputValue = inputValue ? inputValue : inputPlaceholderValue;
                //mis à jour de la BDD
                await sheetContentModel.updateMany( 
                    {column : cellId, row: rowId, sheetcontentid: sheetid},
                    {
                        $set: {
                            content : inputValue //TODO modifier pour get 
                        }
                    }
                );   
                //console.log('Row ID:', rowId, 'Cell ID:', cellId, 'Input Placeholder Value:', inputPlaceholderValue);                
            }));
        }));
    } catch (error) {
        console.error('Erreur lors de la récupération du contenu de la page :', error.message);
    }
    //var sheetcontent =  await sheetContentModel.find({ sheetcontentid : sheetid}).sort( { column: 1, row:1  } ); //ordre croissant 
    //return sheetcontent;
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
    //console.log("Received POST data : ", postData);
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
                        content : "",
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

const deleteSheet = async (fileId) => {
    try {
        const result = await sheetModel.deleteOne({ _id: fileId });
        if (result.deletedCount === 0) {
            throw new Error('Sheet not found');
        }
        return { success: true, message: 'File successfully deleted' };
    } catch (error) {
        console.error('Error in deleteSheet:', error);
        throw error;
    }
};

const addMemberToSheet = async (fileID, userToAdd) => {
    try {
        const findUser = await usercollections.find({
            name: userToAdd
        });
        if (findUser == null) {
            return { success: false, message: ''}
        } else {
            //todo
        }
    } catch {
        console.error('Error in addMember:', error);
        throw error;
    }
}

module.exports = {registerNewSheet, getMyListOfSheets,getSheet, getSheetContent, savesheet, deleteSheet, addMemberToSheet};
