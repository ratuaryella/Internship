module.exports = (sequelize, type) => {
    return sequelize.define('kegiatan', {
    id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_tatanan: {
        type: type.INTEGER,
        references: {
          models: 'tatanan',
          key: 'id'
        }
      },
    nama_kegiatan: {
        type: type.STRING,
        allowNull: false
      },
    nama_tatanan: {
        type: type.STRING,
        allowNull: false
      },
    jenis_indikator: {
        type: type.STRING,
        allowNull: false
      },
    kategori: {
        type: type.STRING,
      },
    nama_indikator: {
        type: type.STRING,
        allowNull: false
      },
    subindikator: {
        type: type.STRING
      },
    pelaksana: {
        type: type.STRING
      },
    tanggal_kegiatan: {
        type: 'TIMESTAMP'
      },
    longitude: {
        type: type.STRING
      },
    latitude: {
        type: type.STRING
      },
    deskripsi: {
        type: type.STRING
      },
    alamat: {
        type: type.STRING
      },
    gambar: {
        type: type.STRING
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
      },
      created_by: type.INTEGER,
      creator_role: type.INTEGER,
      updated_by: type.INTEGER,
      deleted_by: type.INTEGER

}, {
    freezeTableName: true,
    timestamps: false,
});
}