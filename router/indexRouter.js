var express = require('express');

var  IndexCtrl = require('../controller/indexCtrl.js');

var router = express.Router();


    router.get('/',IndexCtrl.showIndexPage)

module.exports = router;