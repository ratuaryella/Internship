module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }, 
        id_role: {
            type: type.INTEGER,
            references: {
                models: 'roles',
                key: 'id'
            },
        },
        email: {
            type: type.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                notNull: true,
                notEmpty: {
                    msg: 'Email cannot be empty!'
                },
            },
            unique: {
                args: true,
                msg: 'Email address already in use!'
            }
        },
        password: {
            type: type.STRING,
            is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
                len: {
                    args: 5,
                    msg: 'Password must be atleast 5 characters in length'
                }
            }
        },
        username: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
                len: [5, 100]
            },
            unique: {
                args: true,
                msg: 'Username already in use!'
            }
        },
        firstname: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: {
                    msg: 'Firstname cannot be empty!'
                },
            },
        },
        lastname: {
            type: type.STRING,
            allowNull: true,
        },
        mobile_number: type.NUMBER,
        status: type.BOOLEAN,
        kode_wilayah: type.JSONB,
        created_at: {
            type: 'TIMESTAMP',
            defaultValue: type.NOW,
            allowNull: true,
        },
        deleted_at: {
            type: 'TIMESTAMP',
            allowNull: true,
        },
        created_by: type.INTEGER,
        deleted_by: type.INTEGER
    }, {
        freezeTableName: true,
        timestamps: false,
        indexes: [{
            unique: true,
            fields: ['email', 'username']
        }],
    });
}