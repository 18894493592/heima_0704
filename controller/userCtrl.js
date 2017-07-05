var md5 = require('blueimp-md5');

var common =require('../common.js')

var UserModel = require('../model/userModel.js');

module.exports = {
    getRegisterPage(req, res) {  //访问注册页面
        res.render('./user/register');
    },
    getLoginPage(req, res) {  //访问登录页面
        res.render('./user/login');
    },
    registerNewUser(req, res) {    //注册新用户
        var newuser = req.body;
        // console.log(1);
        // console.log(newuser);
        UserModel.sync()
            .then(() => {
                // 能直接create  吗？？？
                // UserModel.create();
                // 在注册之前，先通过username查找，看这个用户是否被注册了
                // 使用Model.count(),根据制定的条件，去查找符合条件的数据条数
                return UserModel.count({
                    where: {
                        username: newuser.username
                    }
                })
            })
            .then((count) => {   //判断  查询出来的 count  值是否为0
                if (count === 0) {
                    newuser.password = md5(newuser.password, common.pwdSalt); //加盐加密
                    // 可以注册
                    return UserModel.create(newuser);
                }
                return null;
            })
            .then((result) =>{
                if(result === null ) {
                    res.json({
                        err_code: 1,
                        msg: '该用户名已被注册，请更换用户名后重试!'
                    });
                }else{
                     res.json({
                        err_code: 0
                    });
                }
            })
    },
    login(req,res){
      var loginUser = req.body;

      console.log(loginUser);
        //  由于我们数据9库中保留的用户密码已经没md5加密了，所以不能直接拿着123456 去匹配 ，这样永远都无法登陆成功
        //  由于可以阻塞findOne 之前  把用户输入的明文密码  再次进行  注册时候的 md5 加密
        // 由于MD5有一个特点  只要加密之前的子符串一致  那么加密的结果也是一致的

        loginUser.password = md5(loginUser.password, common.pwdSalt);
        UserModel.sync()
        .then(() => {  //第一个  then  的作用都是根据指定的用户名和密码  查找对应的用户数据
            return UserModel.findOne({  //findOne  表示查找到第一个匹配的数据
                where: {
                    username: loginUser.username,
                    password: loginUser.password
                }
            });

        })
        .then((result) => {  //如果findOne  找对了对应的数据， 则返回一个数据对象  否则没找到  返回null
            // console.log(result);
            if(result === null ) {
                res.json({
                    err_code: 1,
                    msg: '你的用户名或密码不正确!'
                }) 
            }else{
                // console.log(req.session);
                // 将登录成功的状态保存到了req.session上
                req.session.islogin = true;
                // 将当前登录疼的信息对象，保存到req.session上
                req.session.user = result;

                console.log(req.session);
                res.json({
                    err_code: 0
                })
            }
        })
    },
    logout(req,res){
        // req.session.islogin = null;
        // req.session.user = null;
        req.session.destroy((err) => {
            if(err) throw err;
            res.redirect('/')
        })
    }
}