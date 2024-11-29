import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const InventoryLog = sequelize.define("InventoryLog", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "products",
            key: "id"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [["añadir", "actualizar", "borrar", "return"]],
                msg: "La acción debe ser 'añadir', 'actualizar', 'borrar' o 'return'"
            }
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: {
                args: [1],
                msg: "La cantidad debe ser al menos 1"
            }
        }
    },
    action_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: "inventory_log"
});

export default InventoryLog;