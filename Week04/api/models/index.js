const config = require("../config/db.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        operatorsAliases: 0
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.issues = require("./issues.js")(sequelize, Sequelize);

module.exports = db;