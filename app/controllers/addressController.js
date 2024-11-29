import Address from '../models/Address.js';

const createAddress = async (req, res) => {
    try {
        const {
            user_id,
            street_address,
            city,
            state_province,
            postal_code,
            country,
            is_default } = req.body;
        const address = await Address.create({
            user_id,
            street_address,
            city,
            state_province,
            postal_code,
            country,
            is_default
        });
        res.status(201).json(address);
    } catch (error) {
        console.error("Error al crear la dirección:", error);
        res.status(500).json({ error: "Error al crear la dirección" });
    }
};

const getAddressesByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;
        const addresses = await Address.findAll({ where: { user_id } });
        if (addresses.length === 0) {
            return res.status(404).json({ error: "No se encontraron direcciones para este usuario" });
        }
        res.status(200).json(addresses);
    } catch (error) {
        console.error("Error al obtener las direcciones del usuario:", error);
        res.status(500).json({ error: "Error al obtener las direcciones" });
    }
};

const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const { street_address, city, state_province, postal_code, country, is_default } = req.body;
        const address = await Address.findByPk(id);
        if (!address) {
            return res.status(404).json({ error: 'Dirección no encontrada' });
        }
        address.street_address = street_address || address.street_address;
        address.city = city || address.city;
        address.state_province = state_province || address.state_province;
        address.postal_code = postal_code || address.postal_code;
        address.country = country || address.country;
        address.is_default = is_default !== undefined ? is_default : address.is_default;
        await address.save();
        res.status(200).json(address);
    } catch (error) {
        console.error("Error al actualizar la dirección:", error);
        res.status(500).json({ error: "Error al actualizar la dirección" });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.findByPk(id);
        if (!address) {
            return res.status(404).json({ error: "Dirección no encontrada" });
        }
        await address.destroy();
        res.status(200).json({ message: "Dirección eliminada" });
    } catch (error) {
        console.error("Error al eliminar la dirección:", error);
        res.status(500).json({ error: "Error al eliminar la dirección" });
    }
};

export {
    createAddress,
    getAddressesByUserId,
    updateAddress,
    deleteAddress
};