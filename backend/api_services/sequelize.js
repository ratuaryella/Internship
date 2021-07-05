const config = require('./config/config');
const Sequelize = require('sequelize');
const KegiatanModel = require('./api/model/kegiatan');
const TatananModel = require('./api/model/tatanan');

const sequelize = new Sequelize(config.dbConnectionString, {
    logging: false,
});

const Kegiatan = KegiatanModel(sequelize, Sequelize);
const Tatanan = TatananModel(sequelize, Sequelize);

Kegiatan.belongsTo(Tatanan, {
    foreignKey: 'id_tatanan'
});

module.exports = {
    Kegiatan,
    Tatanan
}