import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";

const OrderDetail = sequelize.define("OrderDetail", {
    order_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Orders",
            key: 'order_id',
        },
        ondelete: 'CASCADE'
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'product_id'
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

export default OrderDetail;