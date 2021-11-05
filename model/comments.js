const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const User = require('./users')(sequelize, DataTypes)
    const Weibo = require('./weibo')(sequelize, DataTypes)

    class Comment extends Model { }
    Comment.init({
        content: {
            type: DataTypes.STRING(140),
            allowNull: false,
            comment: '评论内容'
        }
    }, {
        sequelize: sequelize,
        tableName: 'comment',
        underscored: true,
        paranoid: true
    })
    // 关联定义
    Comment.belongsTo(Weibo, {
        constraints: false,
        foreignKey: 'weiboId'
    })
    Comment.belongsTo(User, {
        constraints: false,
        foreignKey: 'userId',
        as: 'user'
    })
    // 生命周期函数
    Comment.afterSave(async (comment) => {
        await Weibo.increment({ commentCount: 1 }, { where: { id: comment.weiboId } })
    })
    Comment.afterDestroy(async (comment) => {
        await Weibo.increment({ commentCount: -1 }, { where: { id: comment.weiboId } })
    })
    return Comment
}