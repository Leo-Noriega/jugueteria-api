import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Product from "./Product.js";

const ProductImage = sequelize.define("ProductImage", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: 'product_images'
});

export default ProductImage;
