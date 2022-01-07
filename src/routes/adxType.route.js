const express = require('express');
const router = express.Router();
const adxTypeController = require('../controller/AdxTypeController')

router.get('/getAllAdxType', adxTypeController.getAllAdxType)
// router.post('/createAdxType', adxTypeController.createAdxType)
router.put('/updateAdxType/:id', adxTypeController.updateAdxType)
router.get('/getAdxGroupType/:groupType', adxTypeController.getGroupAdxType)
router.get('/getAllAdxGroupType', adxTypeController.getAllGroupAdxType);
module.exports = router;