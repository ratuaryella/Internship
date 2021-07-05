module.exports = (sequelize, type) => {
    return sequelize.define('token', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: type.INTEGER,
            references: {
                models: 'users',
                key: 'id',
            },
        },
        token: type.STRING,
        status_is_valid: type.BOOLEAN,
        created_at: {
            type: 'TIMESTAMP',
            defaultValue: type.NOW,
            allowNull: true,
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
}