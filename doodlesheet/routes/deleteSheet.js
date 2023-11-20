var express = require('express');
var router = express.Router();
const sheetController = require('../controller/sheetController');

router.delete('/:fileId', async (req, res) => {
    try {
        const fileId = req.params.fileId;
        const result = await sheetController.deleteSheet(fileId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting file', error: error.message });
    }
});

module.exports = router;