import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Cart = sequelize.define("Cart", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    timestamps: false,
    tableName: 'cart'
});

Cart.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Cart, { foreignKey: 'user_id',  as: 'carts' });

export default Cart;