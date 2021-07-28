module.exports = (sequelize, Sequelize) => {
    const Kegiatan = sequelize.define('table_kegiatan', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tableTatananId: {
        type: Sequelize.INTEGER,
      },
      nama_kegiatan: {
        type: Sequelize.STRING,
        allowNull: false
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
      pelaksana: {
        type: Sequelize.STRING
      },
      tanggal_kegiatan: {
        type: 'TIMESTAMP'
      },
      longitude: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.STRING
      },
      deskripsi: {
        type: "varchar"
      },
      gambar: {
        type: Sequelize.BLOB
      },
      tableUserId: {
        type: Sequelize.INTEGER
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

return Kegiatan;
}