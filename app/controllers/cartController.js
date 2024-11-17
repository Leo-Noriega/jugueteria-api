import Cart from './models/cart';

const createCart = async (req, res) => {
    try {
        const newCart = await Cart.create(req.body);
        res.status(201).json({ message: 'Carrito creado exitosamente', data: newCart });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el carrito', error: error.message });
    }
};

const getCarts = async (req, res) => {
    try {
        const carts = await Cart.findAll();
        res.status(200).json({ data: carts });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los carritos', error: error.message });
    }
};

const getCartsById = async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.id);
        if (cart) {
            res.status(200).json({ data: cart });
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito', error: error.message });
    }
};

const updateCart = async (req, res) => {
    try {
        const [updated] = await Cart.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedCart = await Cart.findByPk(req.params.id);
            res.status(200).json({ message: 'Carrito actualizado', data: updatedCart });
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el carrito', error: error.message });
    }
};

const deleteCart = async (req, res) => {
    try {
        const deleted = await Cart.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: 'Carrito eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el carrito', error: error.message });
    }
};

export {
    createCart,
    getCarts,
    getCartsById,
    updateCart,
    deleteCart
}