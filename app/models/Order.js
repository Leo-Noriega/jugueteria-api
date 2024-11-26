import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define("Order", {
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'user_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['pendiente', 'completada', 'cancelada']],
                msg: 'El estado debe ser "pendiente", "completada" o "cancelada"'
            }
        }
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: {
                msg: 'El total decimal es requerido'
            },
            min: {
                args: [0],
                msg: 'El total no puede ser negativo'
            }
        }
    },
    deliveryAddressId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'addresses',
            key: 'id'
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    timestamps: true,
    tableName: 'orders'
});

export default Order;
