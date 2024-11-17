import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import Address from "./Address.js";
import OrderDetail from "./OrderDetail.js";

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
        onDelete: 'CASCADE',
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
            model: 'address',
            key: 'id'
        },
        onDelete: "set Null"
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP AT TIME ZONE \'America/Mexico_City\'')
    }
})

Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });

Order.belongsTo(Address, { foreignKey: 'address_id', as: 'deliveryAddress' });
Address.hasMany(Order, { foreignKey: 'deliveryAddressId', as: 'orders' });

Order.hasMany(OrderDetail, { foreignKey: 'order_id', as: 'orderDetails' });
OrderDetail.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });


export default Order;
