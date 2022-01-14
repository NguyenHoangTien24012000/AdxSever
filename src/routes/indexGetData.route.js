const express = require('express');
const router = express.Router();
const adxType = require('./adxType.route')
const adxItem = require('./adxItem.route');



const getDataRouter = (app) =>{
    
    router.use('/adxType', adxType);

    router.use('/adxItem', adxItem);

    return app.use('/', router)
}


module.exports = getDataRouter;