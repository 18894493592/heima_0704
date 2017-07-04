var Sequelize = require('sequelize');

var connection = new Sequelize('heima_blog_0704', 'root', '123456',{
    host: '127.0.0.1',
    dialect: 'mysql'
});

module.exports = connection;