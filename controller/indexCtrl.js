module.exports = {
    showIndexPage(req,res) {  //页面首页显示
         res.render('index',{
             islogin: req.session.islogin,  //如果保存了登录状态，则通过req.session获取到的登陆状态为true  如果没有保存登陆状态，  则获取道德req.session.islogin  是一个undefined
             user: req.session.user
         });  
    }
}