const connection = require('../services/connectDB');
const path = require('path');


class UploadFileController {
    upFileImage = async (req, res) => {
        console.log('req.file');
    }
}

module.exports = new UploadFileController;