const express = require('express');
const router = express.Router();
const fileController = require('../controller/fileController');

router.post('/create-file', async (req, res) => {
    try {
        //after authen
        const userId = req.user.id;
        const newFile = await fileController.createFile(req.body,userId);
        res.status(201).send(newFile);
    } catch (error) {
        res.status(500).send('Error creating file');
    }
});

// more req here...

module.exports = router;