const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' });

const upLoadFileController = require('../controller/UpLoadFileController')

router.post('/upImage', upload.single('avatar'),upLoadFileController.upFileImage);


module.exports = router;