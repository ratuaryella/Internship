const Sequelize = require('sequelize');
const sequelize = require('../db');

const userModel = sequelize.define('table_users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama: {
        type: Sequelize.STRING
      },
      nip: {
        type: Sequelize.STRING
      },
      no_HP: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
    createdAt: {
        type: 'TIMESTAMP',
        // defaultValue: Sequelize.NOW,
        allowNull: true,
    },
    updatedAt: {
        type: 'TIMESTAMP',
        // defaultValue: Sequelize.NOW,
        allowNull: true,
    },
    deletedAt: {
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

const roleModel = sequelize.define('table_role', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    role_name: {
        type: Sequelize.STRING
      },
}, {
    freezeTableName: true,
    timestamps: false,
});

roleModel.hasMany(userModel, {
    foreignKey: 'tableRoleId'
  });

userModel.belongsTo(roleModel);


module.exports = {
    userModel,
    roleModel
}