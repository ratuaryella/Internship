module.exports = (sequelize, Sequelize) => {
    const Tatanan = sequelize.define('table_tatanan', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nama_tatanan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      jenis_indikator: {
        type: Sequelize.STRING,
        allowNull: false
      },
      kategori: {
        type: Sequelize.STRING,
      },
      nama_indikator: {
        type: Sequelize.STRING,
        allowNull: false
      },
      subindikator: {
        type: Sequelize.STRING
      },
      created_at: {
        type: 'TIMESTAMP',
        // defaultValue: Sequelize.NOW,
        allowNull: true,
      },
      updated_at: {
        type: 'TIMESTAMP',
        // defaultValue: Sequelize.NOW,
        allowNull: true,
      },
      deleted_at: {
        type: 'TIMESTAMP',
        // defaultValue: Sequelize.NOW,
        allowNull: true,
      }

}, {
    freezeTableName: true,
    timestamps: false,
});

return Tatanan;
}