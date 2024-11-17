import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";
import Order from "./Order.js";
import Product from "./Product.js";

const OrderDetail = sequelize.define("OrderDetail", {
    order_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Order",
            key: 'id',
        },
        ondelete: 'CASCADE'
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Product',
            key: 'id'
        },
        ondelete: 'CASCADE'
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
    unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: {
                msg: "El precio unitario debe ser un número decimal"
            },
            min: {
                args: [0],
                msg: "El precio no puede ser negativo"
            }
        }
    },
    //check that this works like this
    total_price: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.quantity * this.unit_price;
        }
    }
}, {
    timestamps: false,
    tableName: 'order_details',
});

OrderDetail.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
Order.hasMany(OrderDetail, { foreignKey: 'order_id', as: 'orderDetails' });

OrderDetail.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.hasMany(OrderDetail, { foreignKey: 'product_id', as: 'orderDetails' });

Product.hasMany(OrderDetail, { foreignKey: 'product_id', as: 'orderDetails' });
OrderDetail.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

export default OrderDetail;