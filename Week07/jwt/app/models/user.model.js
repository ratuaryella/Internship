module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('table_users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama: {
        type: Sequelize.STRING
      },
      nip: {
        type: Sequelize.STRING,
        allowNull: true
      },
      no_HP: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
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
    tableRoleId: {
      type: Sequelize.INTEGER
  },

}, {
    freezeTableName: true,
    timestamps: false,
});

return User;
}