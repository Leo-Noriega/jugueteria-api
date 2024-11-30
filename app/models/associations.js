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
Address.belongsTo(User, { foreignKey: 'user_id', as: 'userAddress' });

User.hasOne(Cart, { foreignKey: 'user_id', as: 'cart' });
Cart.belongsTo(User, { foreignKey: 'user_id', as: 'userCart' });

User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'userOrder' });

User.hasMany(ReturnRequest, { foreignKey: 'user_id', as: 'returnRequests' });
ReturnRequest.belongsTo(User, { foreignKey: 'user_id', as: 'userReturnRequest' });

User.hasMany(Return, { foreignKey: 'user_id', as: 'returns' });
Return.belongsTo(User, { foreignKey: 'user_id', as: 'userReturn' });

User.hasMany(Return, { foreignKey: 'processed_by', as: 'processedReturns' });
Return.belongsTo(User, { foreignKey: 'processed_by', as: 'processedBy' });

Address.hasMany(Order, { foreignKey: 'deliveryAddressId', as: 'orders' });
Order.belongsTo(Address, { foreignKey: 'deliveryAddressId', as: 'deliveryAddress' });

Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'productImages' });

Product.hasMany(OrderDetail, { foreignKey: 'product_id', as: 'orderDetails' });
OrderDetail.belongsTo(Product, { foreignKey: 'product_id', as: 'orderProduct' });

Product.hasMany(ReturnRequest, { foreignKey: 'product_id', as: 'productReturnRequests' });
ReturnRequest.belongsTo(Product, { foreignKey: 'product_id', as: 'returnRequestProduct' });

Product.hasMany(Return, { foreignKey: 'product_id', as: 'productReturns' });
Return.belongsTo(Product, { foreignKey: 'product_id', as: 'returnProduct' });

Product.hasMany(CartProduct, { foreignKey: 'product_id', as: 'cartProducts' });
CartProduct.belongsTo(Product, { foreignKey: 'product_id', as: 'productCart' });

Cart.hasMany(CartProduct, { foreignKey: 'cart_id', as: 'cartProducts' });
CartProduct.belongsTo(Cart, { foreignKey: 'cart_id', as: 'cart' });