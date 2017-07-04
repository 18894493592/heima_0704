var express = require('express');

var router = express.Router();

var  userCtrl = require('../controller/userCtrl.js');

// router.get('/register',(erq,res)=>{
//     res.render('./user/register');
// })

router
  .get('/register', userCtrl.getRegisterPage)
  .get('/login', userCtrl.getLoginPage)
  .post('/register', userCtrl.registerNewUser)

module.exports = router;