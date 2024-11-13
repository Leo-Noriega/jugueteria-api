import Product from '../models/Product';
import Category from '../models/Category';
import ProductImage from '../models/ProductImage';

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category_id, stock } = req.body;
        const product = await Product.create({
            name,
            description,
            price,
            category_id,
            stock
        });
        return res.status(201).json({ message: 'El producto se ha creado exitosamente', product });
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                { model: Category, as: 'category' },
                { model: ProductImage, as: 'images' }
            ]
        });
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            include: [
                { model: Category, as: 'category' },
                { model: ProductImage, as: 'images' }
            ]
        });
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category_id, stock } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        await product.update({ name, description, price, category_id, stock });
        return res.status(200).json({ message: 'Producto actualizado exitosamente', product });
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await product.destroy();

        return res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
}

export {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}