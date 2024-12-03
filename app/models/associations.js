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

// Asociaciones entre User y Address
User.hasMany(Address, { foreignKey: 'user_id', as: 'addresses' });
Address.belongsTo(User, { foreignKey: 'user_id', as: 'userAddress' });

// Asociaciones entre User y Cart
User.hasOne(Cart, { foreignKey: 'user_id', as: 'cart' });
Cart.belongsTo(User, { foreignKey: 'user_id', as: 'userCart' });

// Asociaciones entre User y Order
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'userOrder' });

// Asociaciones entre User y ReturnRequest
User.hasMany(ReturnRequest, { foreignKey: 'user_id', as: 'returnRequests' });
ReturnRequest.belongsTo(User, { foreignKey: 'user_id', as: 'userReturnRequest' });

// Asociaciones entre User y Return
User.hasMany(Return, { foreignKey: 'user_id', as: 'returns' });
Return.belongsTo(User, { foreignKey: 'user_id', as: 'userReturn' });

User.hasMany(Return, { foreignKey: 'processed_by', as: 'processedReturns' });
Return.belongsTo(User, { foreignKey: 'processed_by', as: 'processedBy' });

// Asociaciones entre Address y Order
Address.hasMany(Order, { foreignKey: 'deliveryAddressId', as: 'orders' });
Order.belongsTo(Address, { foreignKey: 'deliveryAddressId', as: 'deliveryAddress' });

// Asociaciones entre Product y ProductImage
Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'productImages' });

// Asociaciones entre Product y OrderDetail
Product.hasMany(OrderDetail, { foreignKey: 'product_id', as: 'orderDetails' });
OrderDetail.belongsTo(Product, { foreignKey: 'product_id', as: 'orderProduct' });

// Asociaciones entre Product y ReturnRequest
Product.hasMany(ReturnRequest, { foreignKey: 'product_id', as: 'productReturnRequests' });
ReturnRequest.belongsTo(Product, { foreignKey: 'product_id', as: 'returnRequestProduct' });

// Asociaciones entre Product y Return
Product.hasMany(Return, { foreignKey: 'product_id', as: 'productReturns' });
Return.belongsTo(Product, { foreignKey: 'product_id', as: 'returnProduct' });

// Asociaciones entre Product y CartProduct
Product.hasMany(CartProduct, { foreignKey: 'product_id', as: 'cartProducts' });
CartProduct.belongsTo(Product, { foreignKey: 'product_id', as: 'productCart' });

// Asociaciones entre Cart y CartProduct
Cart.hasMany(CartProduct, { foreignKey: 'cart_id', as: 'cartProducts' });
CartProduct.belongsTo(Cart, { foreignKey: 'cart_id', as: 'cart' });

// Asociaciones entre Category y Product
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// Asociaciones entre Order y OrderDetail
Order.hasMany(OrderDetail, { foreignKey: 'order_id', as: 'orderDetails' });
OrderDetail.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
