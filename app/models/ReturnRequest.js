import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ReturnRequest = sequelize.define("ReturnRequest", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "orders",
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "products",
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    },
    request_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [1],
                msg: "La cantidad debe ser al menos 1"
            }
        }
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    evidence_url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: {
                msg: "La URL de evidencia debe ser válida"
            }
        }
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
    }
}, {
    timestamps: false,
    tableName: "return_requests"
});

export default ReturnRequest;