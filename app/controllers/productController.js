import { Sequelize } from 'sequelize';
import sequelize from '../config/db.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import ProductImage from '../models/ProductImage.js';
import multer from 'multer';
import path from 'path';

// Configuración de multer para guardar las imágenes en la carpeta 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

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

        if (req.files) {
            const imagePromises = req.files.map(file => {
                const imageUrl = path.join('uploads', file.filename);
                return ProductImage.create({
                    product_id: product.product_id,
                    image_url: imageUrl
                });
            });
            await Promise.all(imagePromises);
        }

        return res.status(201).json({ message: 'El producto se ha creado exitosamente', product });
    } catch (error) {
        console.error('Error al crear el producto:', error);
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

const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await Product.findAll({
            where: { category_id: categoryId },
            include: [
                { model: Category, as: 'category' },
                { model: ProductImage, as: 'images' }
            ]
        });
        if (products.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos para esta categoría' });
        }
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los productos por categoría', error: error.message });
    }
};

const getTotalStockByCategory = async (req, res) => {
    try {
        const [results] = await sequelize.query(`
            SELECT c.id AS category_id, 
                   c.name AS category_name, 
                   COALESCE(SUM(p.stock), 0) AS total_stock
            FROM categories c
            LEFT JOIN products p ON c.id = p.category_id
            GROUP BY c.id, c.name
        `);

        return res.status(200).json(results);

    } catch (error) {
        console.error('Error al obtener el stock total por categoría:', error);
        return res.status(500).json({
            message: 'Error al obtener el stock total por categoría',
            error: error.message
        });
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

        if (req.files && req.files.length > 0) {
            const imagePromises = req.files.map(file => {
                const imageUrl = path.join('uploads', file.filename);
                return ProductImage.create({
                    product_id: product.product_id,
                    image_url: imageUrl
                });
            });
            await Promise.all(imagePromises);
        }

        return res.status(200).json({ message: 'Producto actualizado exitosamente', product });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        return res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

const getProductsImageByProductId = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        const images = await ProductImage.findAll({
            where: { product_id: id }
        });
        return res.status(200).json(images);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las imágenes del producto', error: error.message });
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
    getProductsByCategory,
    getTotalStockByCategory,
    updateProduct,
    deleteProduct,
    upload // Exportar el middleware de multer
};