const express = require('express');
const router = express.Router();
const userAdminController = require('../controller/UserAdminController')
const checkToken = require('../services/authMiddleWare');

router.post('/checkLogin', userAdminController.checkLogin)

router.post('/checkToken',checkToken)

module.exports = router;

