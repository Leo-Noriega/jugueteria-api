import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Cart from "./Cart.js";
import Product from "./Product.js";

const CartProduct = sequelize.define("CartProduct", {
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cart,
            key: "id"
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
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [1],
                msg: "La cantidad debe ser al menos 1"
            }
        }
    }
}, {
    timestamps: false,
    tableName: "cart_product"
});

export default CartProduct;