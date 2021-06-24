module.exports = (sequelize, type) => {
    return sequelize.define('roles', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: type.STRING,
        name: type.STRING
    }, {
        timestamps: false,
        freezeTableName: true,
    });
}