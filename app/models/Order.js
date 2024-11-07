import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define("Order", {
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id'
        },
        onDelete: "set Null",
    },
    date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isIn:{
                args:[['pendiente', 'completada', 'cancelada']],
                msg:'El estado debe ser "pendiente", "completada" o "cancelada"'
            }
        }
    },
    total:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate:{
            isDecimal:{
                msg: 'El total decimal es requerido'
            },
            min:{
                args:[0],
                msg:'El total no puede ser negativo'
            }
        }
    },
    delivery_address_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'address',
            key:'id'
        },
        onDelete: "set Null"
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue:sequelize.literal('CURRENT_TIMESTAMP AT TIME ZONE \'America/Mexico_City\'')
    }
},{
    tableName:'Orders',
    timestamps: false,
    updatedAt: false
});

export default Order;