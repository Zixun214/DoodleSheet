var express = require('express');
var router = express.Router();
const sheetController = require('../controller/sheetController');

router.get('/:fileId:userToAdd', async (req, res) => {
    try {
        const fileId = req.params.fileId;
        const userToAdd = req.params.userToAdd;
        const result = await sheetController.addMemberToSheet(fileId, userToAdd);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error adding member', error: error.message });
    }

});

module.exports = router;