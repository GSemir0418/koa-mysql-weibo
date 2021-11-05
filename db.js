const sequelize = require('./utils/sequelize')

require('./model/comments')(sequelize, sequelize.DataTypes)
require('./model/users')(sequelize, sequelize.DataTypes)
require('./model/weibo')(sequelize, sequelize.DataTypes)

sequelize.sync({ force: true }).catch(error => console.log(error)).finally(() => sequelize.close())