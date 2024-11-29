import Category from './Category.js';
import Product from './Product.js';
import ProductImage from './ProductImage.js';
import Order from './Order.js';
import OrderDetail from './OrderDetail.js';
import User from './User.js';
import Address from './Address.js';
import Cart from "./Cart.js";
import CartProduct from "./CartProduct.js";
import Return from "./Return.js";
import ReturnRequest from "./ReturnRequest.js";

User.hasMany(Address, { foreignKey: 'user_id', as: 'addresses' });
Address.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasOne(Cart, { foreignKey: 'user_id', as: 'cart' });
Cart.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(ReturnRequest, { foreignKey: 'user_id', as: 'returnRequests' });
ReturnRequest.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Return, { foreignKey: 'user_id', as: 'returns' });
Return.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Return, { foreignKey: 'processed_by', as: 'processedReturns' });
Return.belongsTo(User, { foreignKey: 'processed_by', as: 'processedBy' });

Address.hasMany(Order, { foreignKey: 'deliveryAddressId', as: 'orders' });
Order.belongsTo(Address, { foreignKey: 'deliveryAddressId', as: 'deliveryAddress' });

Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'products' });

Product.hasMany(OrderDetail, { foreignKey: 'product_id', as: 'orderDetails' });
OrderDetail.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

Product.hasMany(ReturnRequest, { foreignKey: 'product_id', as: 'returnRequests' });
ReturnRequest.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

Product.hasMany(Return, { foreignKey: 'product_id', as: 'returns' });
Return.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

Product.hasMany(CartProduct, { foreignKey: 'product_id', as: 'cartProducts' });
CartProduct.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'RESTRICT', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

Cart.hasMany(CartProduct, { foreignKey: 'cart_id', as: 'cartProducts' });
CartProduct.belongsTo(Cart, { foreignKey: 'cart_id', as: 'cart' });

Order.hasMany(OrderDetail, { foreignKey: 'order_id', as: 'orderDetails' });
OrderDetail.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

ReturnRequest.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
Order.hasMany(ReturnRequest, { foreignKey: 'order_id', as: 'returnRequests' });

Return.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
Order.hasMany(Return, { foreignKey: 'order_id', as: 'returns' });