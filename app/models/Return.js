import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Product from "./Product.js";
import Order from "./Order.js";
import User from "./User.js";

const Return = sequelize.define("Return", {
    id_return: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: "order_id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: "product_id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "user_id"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    },
    return_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [1],
                msg: "La cantidad devuelta no puede ser menor a 1"
            }
        }
    },
    product_name:{
        type: DataTypes.TEXT,
        allowNull:true
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    description:{
        type: DataTypes.TEXT,
        allowNull:true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pendiente",
        validate: {
            isIn: {
                args: [["pendiente", "aprobada", "rechazada"]],
                msg: "El estado debe ser 'pendiente', 'aprobada' o 'rechazada'"
            }
        }
    },
    processed_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: "user_id"
        }
    },
    processed_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    rejection_reason: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: "returns"
});

export default Return;