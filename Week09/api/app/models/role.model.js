module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('table_role', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    role_name: {
        type: Sequelize.STRING,
        unique: true
      },
    created_at: {
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

return Role;
}