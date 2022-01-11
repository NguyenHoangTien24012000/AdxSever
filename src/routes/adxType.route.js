const express = require('express');
const router = express.Router();
const adxTypeController = require('../controller/AdxTypeController')
const upload = require('../config/configUpFile');

router.get('/getAllAdxType', adxTypeController.getAllAdxType)
// router.post('/createAdxType', adxTypeController.createAdxType)
router.put('/updateAdxType/:id', adxTypeController.updateAdxType)
router.get('/getAdxGroupType/:groupType', adxTypeController.getGroupAdxType)
router.get('/getAllAdxGroupType', adxTypeController.getAllGroupAdxType)
router.post("/upload", upload.single('image'), adxTypeController.uploadFile)
module.exports = router;