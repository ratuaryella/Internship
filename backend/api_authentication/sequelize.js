const config = require('./config/config');
const Sequelize = require('sequelize');
const UserModel = require('./api/model/users');
const RoleModel = require('./api/model/roles');
const TokenModel = require('./api/model/token');

const sequelize = new Sequelize(config.dbConnectionString, {
    logging: false,
});

const User = UserModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);
const Token = TokenModel(sequelize, Sequelize);

User.belongsTo(Role, {
    foreignKey: 'id_role'
});
Token.belongsTo(User, {
    foreignKey: 'id_user'
});

module.exports = {
    User,
    Role,
    Token
}