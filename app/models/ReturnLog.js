import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ReturnLog = sequelize.define("ReturnLog", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    return_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Returns',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    action_by: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    },
    action_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    notes: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: true,
    tableName: 'Return_Log'
});

export default ReturnLog;