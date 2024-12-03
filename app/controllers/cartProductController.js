import CartProduct from "../models/CartProduct.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Obtener todos los productos en el carrito
const getCartProducts = async (req, res) => {
    try {
        const { cart_id, product_id } = req.query;
        const cartProducts = await CartProduct.findAll({
            where: { cart_id, product_id },
            include: [
                { model: Cart, as: 'cart' },
                { model: Product, as: 'productCart' }
            ]
        });
        res.status(200).json(cartProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un producto específico en el carrito
const getCartProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const cartProduct = await CartProduct.findByPk(id, {
            include: [
                { model: Cart, as: 'cart' },
                { model: Product, as: 'productCart' }
            ]
        });
        if (cartProduct) {
            res.status(200).json(cartProduct);
        } else {
            res.status(404).json({ message: "Producto no encontrado en el carrito" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Agregar un producto al carrito
const addCartProduct = async (req, res) => {
    try {
        const { cart_id, product_id, quantity } = req.body;
        const existingCartProduct = await CartProduct.findOne({
            where: { cart_id, product_id }
        });

        if (existingCartProduct) {
            existingCartProduct.quantity += quantity;
            await existingCartProduct.save();
            res.status(200).json(existingCartProduct);
        } else {
            const newCartProduct = await CartProduct.create({ cart_id, product_id, quantity });
            res.status(201).json(newCartProduct);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar la cantidad de un producto en el carrito
const updateCartProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const cartProduct = await CartProduct.findByPk(id);
        if (cartProduct) {
            cartProduct.quantity = quantity;
            await cartProduct.save();
            res.status(200).json(cartProduct);
        } else {
            res.status(404).json({ message: "Producto no encontrado en el carrito" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un producto del carrito
const deleteCartProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const cartProduct = await CartProduct.findByPk(id);
        if (cartProduct) {
            await cartProduct.destroy();
            res.status(200).json({ message: "Producto eliminado del carrito" });
        } else {
            res.status(404).json({ message: "Producto no encontrado en el carrito" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getCartProducts, getCartProductById, addCartProduct, updateCartProduct, deleteCartProduct };