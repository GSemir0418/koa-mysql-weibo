const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const User = require('./users')(sequelize, DataTypes)

    class Weibo extends Model { }
    // 模型定义
    Weibo.init({
        type: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '发布类型'
        },
        content: {
            type: DataTypes.STRING(140),
            allowNull: false,
            comment: '微博内容'
        },
        shareContent: {
            type: DataTypes.STRING(140),
            comment: '转发语'
        },
        praiseCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '点赞数'
        },
        commentCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '评论数'
        },
        shareCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '转发数'
        }
    }, {
        sequelize: sequelize,
        tableName: 'weibo',
        underscored: true,
        paranoid: true
    })
    // 关联定义
    Weibo.belongsTo(User, {
        constraints: false,
        foreignKey: 'userId',// weibo表中的外键名称指定为userId
        as: 'user'// 别名
    })

    // 生命周期，这里写自动新增条数，services层就不需要写了（其实也可以在service层写，或者写个事务）
    Weibo.afterCreate(async (weibo) => {
        // 微博数+1
        await User.increment({ weiboCount: 1 }, { where: { id: weibo.userId } })
    })
    Weibo.afterDestroy(async (weibo) => {
        // 微博数-1
        await User.increment({ weiboCount: -1 }, { where: { id: weibo.userId } })
    })
    return Weibo

}
// 定义发布类型枚举
// exports对象已经变成了Weibo对象，所以在其他模块使用时：
// Weibo.PublishType
module.exports.PublishType = {
    Self: 1,
    Share: 2
}