import Category from './Category.js';
import Product from './Product.js';
import ProductImage from './ProductImage.js';
import Order from './Order.js';
import OrderDetail from './OrderDetail.js';
import User from './User.js';
import Address from './Address.js';

Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'RESTRICT' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });

Order.belongsTo(Address, { foreignKey: 'deliveryAddressId', as: 'deliveryAddress' });
Address.hasMany(Order, { foreignKey: 'deliveryAddressId', as: 'orders' });

Order.hasMany(OrderDetail, { foreignKey: 'order_id', as: 'orderDetails' });
OrderDetail.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

OrderDetail.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.hasMany(OrderDetail, { foreignKey: 'product_id', as: 'orderDetails' });

Address.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Address, { foreignKey: 'user_id', as: 'addresses' });