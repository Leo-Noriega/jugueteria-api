import Order from '../models/Order.js';
import OrderDetail from '../models/OrderDetail.js';

const createOrder = async (req, res) => {
    try {
        const orderData = req.body;
        if ('delivery_address' in orderData) {
            orderData.delivery_address_id = orderData.delivery_address;
            delete orderData.delivery_address;
        }

        const newOrder = await Order.create(orderData);
        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Error al crear la orden:", error);
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = {};
            error.errors.forEach(err => {
                validationErrors[err.path] = err.message;
            });
            return res.status(400).json({ errors: validationErrors });
        } else {
            res.status(500).json({ error: "Error al crear la orden" });
        }
    }
};

const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const orders = await Order.findAll({ where: { user_id: userId } });
        if (orders.length > 0) { res.status(200).json(orders); }
        else { res.status(404).json({ error: "No se encontraron órdenes para este usuario" }); }
    }
    catch (error) { console.error("Error al obtener las órdenes:", error); res.status(500).json({ error: 'Error al obtener las órdenes' }); }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error al obtener las ordenes:", error);
        res.status(500).json({ error: 'Error al obtener las ordenes' });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ error: "Orden no encontrada" });
        }
    } catch (error) {
        console.error("Error al obtener la orden:", error);
        res.status(500).json({ error: 'Error al obtener la orden' });
    }
};

const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (order) {
            await order.update(req.body);
            res.status(200).json(order);
        } else {
            res.status(404).json({ error: "Orden no encontrada" });
        }
    } catch (error) {
        console.error("Error al actualizar la orden:", error);
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = {};
            error.errors.forEach(err => {
                validationErrors[err.path] = err.message;
            });
            return res.status(400).json({ errors: validationErrors });
        } else {
            res.status(500).json({ error: "Error al actualizar la orden" });
        }
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (order) {
            await order.destroy();
            res.status(200).json({
                message: "Orden eliminada",
                order: order
            });
        } else {
            res.status(404).json({ error: "Orden no encontrada" });
        }
    } catch (error) {
        console.error("Error al eliminar la orden:", error);
        res.status(500).json({ error: "Error al eliminar la orden" });
    }
};

const getProductsByOrderId = async (req, res) => {
    try {
        const orderId = req.params.id;
        const products = await OrderDetail.findAll({ where: { order_id: orderId } });
        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ error: "No se encontraron productos para esta orden" });
        }
    } catch (error) {
        console.error("Error al obtener los productos de la orden:", error);
        res.status(500).json({ error: "Error al obtener los productos de la orden" });
    }
};

export {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByUserId,
    getProductsByOrderId
}