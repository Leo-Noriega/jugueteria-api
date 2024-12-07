import Return from "../models/Return.js";

const createReturn = async (req, res) => {
    try {
        const { order_id, product_id, user_id, quantity, reason, description, product_name , evidence_url } = req.body;

        const newReturn = await Return.create({
            order_id,
            product_id,
            user_id,
            quantity,
            reason,
            description,
            product_name,
            evidence_url
        });

        res.status(201).json({ message: "Solicitud de devolución creada con éxito", return: newReturn });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getReturns = async (req, res) => {
    try {
        const returns = await Return.findAll();
        res.status(200).json(returns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const processReturn = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, processed_by, rejection_reason } = req.body;
        const returnRequest = await Return.findByPk(id);
        if (!returnRequest) {
            return res.status(404).json({ message: "Devolución no encontrada" });
        }
        returnRequest.status = status;
        returnRequest.processed_by = processed_by;
        returnRequest.processed_at = new Date();
        returnRequest.rejection_reason = status === "rechazada" ? rejection_reason : null;
        await returnRequest.save();
        res.status(200).json({ message: "Devolución procesada con éxito", return: returnRequest });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    createReturn,
    getReturns,
    processReturn
};