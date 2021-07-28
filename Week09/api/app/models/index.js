const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.tatanan = require("../models/tatanan.model.js")(sequelize, Sequelize);
db.kegiatan = require("../models/kegiatan.model.js")(sequelize, Sequelize);

db.role.hasMany(db.user, {
    foreignKey: 'tableRoleId'
});

db.user.belongsTo(db.role);

db.tatanan.hasMany(db.kegiatan, {
  foreignKey: 'tableTatananId'
});

db.user.hasMany(db.kegiatan, {
  foreignKey: 'tableUserId'
});

db.kegiatan.belongsTo(db.tatanan);
db.kegiatan.belongsTo(db.user);

db.ROLES = ["1", "2", "3"];

module.exports = db;