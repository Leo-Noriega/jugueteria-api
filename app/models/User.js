import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El nombre es requerido'
            },
            len: {
                args: [3, 50],
                msg: 'El nombre debe tener entre 3 y 50 caracteres'
            }
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El apellido es requerido'
            },
            len: {
                args: [3, 50],
                msg: 'El apellido debe tener entre 3 y 50 caracteres'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'El email ya está registrado'
        },
        validate: {
            notNull: {
                msg: 'El email es requerido'
            },
            isEmail: {
                msg: 'El email debe ser un correo válido'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'La contraseña es requerida'
            },
            len: {
                args: [8, 100],
                msg: 'La contraseña debe tener entre 8 y 50 caracteres'
            }
        }
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El teléfono es requerido'
            },
            len: {
                args: [10],
                msg: 'El teléfono debe tener entre 10 y 15 caracteres'
            }
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    email_confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP AT TIME ZONE \'America/Mexico_City\'')
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP AT TIME ZONE \'America/Mexico_City\'')
    }
})

export default User;
