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
        console.log(newuser);
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
    }
}