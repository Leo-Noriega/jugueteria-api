import Cart from '../models/Cart.js';
import CartProduct from '../models/CartProduct.js';
import Product from '../models/Product.js';

const createOrGetCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: {
                user_id: req.params.id
            },
            include: {
                model: CartProduct,
                as: 'cartProducts',
                include: {
                    model: Product,
                    as: 'productCart'
                }
            }
        });
        if (cart) {
            res.status(200).json({ data: cart });
        } else {
            const newCart = await Cart.create({ user_id: req.params.id });
            res.status(201).json({ message: 'Carrito creado exitosamente', data: newCart });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el carrito', error: error.message });
    }
};

const getCartByUserId = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: {
                user_id: req.params.id
            },
            include: {
                model: CartProduct,
                as: 'cartProducts',
                include: {
                    model: Product,
                    as: 'productCart'
                }
            }
        });
        if (cart) {
            res.status(200).json({ data: cart });
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito', error: error.message });
    }
};

export {
    createOrGetCart,
    getCartByUserId,
};