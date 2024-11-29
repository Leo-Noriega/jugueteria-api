import InventoryLog from '../models/InventoryLog.js';

const createInventoryLog = async (req, res) => {
    try {
        const { product_id, action, quantity, action_date, notes } = req.body;
        const inventoryLog = await InventoryLog.create({
            product_id,
            action,
            quantity,
            action_date,
            notes
        });
        res.status(201).json(inventoryLog);
    } catch (error) {
        console.error("Error al crear el inventario:", error);
        res.status(500).json({ error: "Error al crear el inventario" });
    }
};

const getInventoryLogs = async (req, res) => {
    try {
        const logs = await InventoryLog.findAll();
        res.status(200).json(logs);
    } catch (error) {
        console.error("Error al obtener los inventarios:", error);
        res.status(500).json({ error: "Error al obtener los inventarios" });
    }
};

const getInventoryLogById = async (req, res) => {
    try {
        const { id } = req.params;
        const log = await InventoryLog.findByPk(id);
        if (!log) {
            return res.status(404).json({ error: "Inventario no encontrado" });
        }
        res.status(200).json(log);
    } catch (error) {
        console.error("Error al obtener el inventario:", error);
        res.status(500).json({ error: "Error al obtener el inventario" });
    }
};

const updateInventoryLog = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_id, action, quantity, action_date, notes } = req.body;
        const log = await InventoryLog.findByPk(id);
        if (!log) {
            return res.status(404).json({ error: "Inventario no encontrado" });
        }
        log.product_id = product_id || log.product_id;
        log.action = action || log.action;
        log.quantity = quantity || log.quantity;
        log.action_date = action_date || log.action_date;
        log.notes = notes || log.notes;
        await log.save();
        res.status(200).json(log);
    } catch (error) {
        console.error("Error al actualizar el log de inventario:", error);
        res.status(500).json({ error: "Error al actualizar el inventario" });
    }
};

const deleteInventoryLog = async (req, res) => {
    try {
        const { id } = req.params;
        const log = await InventoryLog.findByPk(id);
        if (!log) {
            return res.status(404).json({ error: "Inventario no encontrado" });
        }
        await log.destroy();
        res.status(200).json({ message: "Inventario eliminado" });
    } catch (error) {
        console.error("Error al eliminar el  inventario:", error);
        res.status(500).json({ error: "Error al eliminar el  inventario" });
    }
};

export {
    createInventoryLog,
    getInventoryLogs,
    getInventoryLogById,
    updateInventoryLog,
    deleteInventoryLog
};
