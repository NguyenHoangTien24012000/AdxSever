const express = require('express');
const router = express.Router();
const adxType = require('./adxType.route')
const adxItem = require('./adxItem.route');



const adminEditData = (app) =>{

    router.use('/editAdxType', adxType);

    router.use('/editAdxItem', adxItem);

    return app.use('/', router)
}


module.exports = adminEditData;