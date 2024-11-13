import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";
import Category from "./Category";
import ProductImage from "./ProductImage";

const Product = sequelize.define("Product", {
    product_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty:{
                msg: "El nombre del producto es necesario"
            }
        }
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    price:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate: {
            isDecimal: {
                msg: "El precio debe contener número decimal"
            },
            min: {
                args: [0],
                msg: "El precio no puede ser negativo"
            }
        }
    },
    category_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Category",
            key: "id",
        },
        onDelete: 'RESTRICT',
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min:{
                args: [0],
                msg: "El stock no puede ser negativo"
            }
        }
    },
    createdAt:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP AT TIME ZONE \'America/Mexico_City\'')
    }
})

Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });

Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

export default Product;