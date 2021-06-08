module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('table_role', {
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

return Role;
}