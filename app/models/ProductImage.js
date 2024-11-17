import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Product from "./Product.js";

const ProductImage = sequelize.define("ProductImage", {
    product_image_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Product",
            key: "product_id",
        },
        onDelete: 'CASCADE',
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: {
                msg: 'El campo image_url debe ser una URL válida'
            }
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP AT TIME ZONE \'America/Mexico_City\'')
    }
});

Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

export default ProductImage;
