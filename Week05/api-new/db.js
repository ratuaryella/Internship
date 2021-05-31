const config = require('./config');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);
var sequelize = new Sequelize(config.dbConnectionString, {
    logging: false,
});

module.exports = sequelize;