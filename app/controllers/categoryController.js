import Category from "../models/Category.js";

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const existingCategory = await Category.findOne({ where: { name } });
        if (existingCategory) {
            return res.status(400).json({ message: 'Ya esta registrada una categoria con ese nombre' });
        }

        const category = await Category.create({
            name,
            description
        });

        return res.status(201).json({ message: 'Categoría creada exitosamente', category });
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear la categoría', error: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las categorías', error: error.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener la categoría', error: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        await category.update({ name, description });
        return res.status(200).json({ message: 'Categoría actualizada exitosamente', category });
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la categoría', error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        await category.destroy();
        return res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la categoría', error: error.message });
    }
}

export {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};