var express = require('express');

var router = express.Router();

var  userCtrl = require('../controller/userCtrl.js');

// router.get('/register',(erq,res)=>{
//     res.render('./user/register');
// })

router
  .get('/register', userCtrl.getRegisterPage)   //访问注册页面
  .get('/login', userCtrl.getLoginPage)   // 访问登录页面
  .post('/register', userCtrl.registerNewUser)   //新 用户注册
  .post('/login',userCtrl.login)   //用户登录
  .get('/logout',userCtrl.logout)

module.exports = router;