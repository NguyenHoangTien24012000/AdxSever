const express = require('express');
const router = express.Router();
const adxItemController = require('../controller/AdxItemController');

router.get('/getItemGroup/:idGroup', adxItemController.getItemGroup);
router.get('/getItemDetail/:idItem', adxItemController.getItemDetail);
router.post('/updateItemDetail/:idItem', adxItemController.updateItemDetail);


module.exports = router;