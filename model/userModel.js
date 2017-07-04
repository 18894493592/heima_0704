var Sequelize = require('sequelize');

// 导入数据库连接对象
var Db = require('./baseDb.js');

// 创建users 用户表对象
var User = Db.define('users', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    username:{
        allowNull: false,
        type: Sequelize.STRING
    },
    password:{
        allowNull: false,
        type: Sequelize.STRING
    },
    nickname:{
        allowNull: false,
        type: Sequelize.STRING
    }
})

module.exports = User;