const { Sequelize, DataTypes } = require('sequelize')
// 初始化sequelize
module.exports = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'gsqzs123',
    database: 'weibo'
})
module.exports.DataTypes = DataTypes