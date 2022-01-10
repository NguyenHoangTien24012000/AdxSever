const express = require('express');
const router = express.Router();
// const {make, check} = require('../services/JWT')
const adxType = require('./adxType.route')
const adxItem = require('./adxItem.route');
// const { route } = require('./adxType.route');
// const adxTypeController = require('../controller/AdxTypeController')
const upLoadFile = require('./upLoadFile.route')

const initWebRoute = (app) =>{
    
    // // router.use('/login',)
    // router.get('/token', async (req, res) =>{
    //     let user = {
    //         name : "Admin",
    //         email: "hoangtien@gmail.com"
    //     }
    // })
    router.use('/adxType', adxType);

    router.use('/adxItem', adxItem);

    router.use('/upLoadFile', upLoadFile)
    
    // router.get('/checkToken',async (req, res) =>{
    //     try{
    //         let _token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJBZG1pbiIsImVtYWlsIjoiaG9hbmd0aWVuQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NDA4MTczOTksImV4cCI6MTY0MDgyMDk5OX0.Gspl1dQfs-ah3j60igbXtRzRqONmHEw1MkDnreR0h0M";
    //         const data = await check(_token);
    //         return res.send({data : data})
    //     }catch(err){
    //         return res.status(401).send(err)
    //     }
    // })


    return app.use('/', router)
}


module.exports = initWebRoute;