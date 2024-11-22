import User from '../models/User.js';
import sendMail from '../utils/mailSender.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const createUser = async (req, res) => {
  try {
    const { password, ...restUserData } = req.body;
    if (password.length < 8 || password.length > 100) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
    }
    const existingUser = await User.findOne({ where: { email: restUserData.email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      password: hashedPassword,
      ...restUserData
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = {};
      error.errors.forEach(err => {
        validationErrors[err.path] = err.message;
      });
      return res.status(400).json({ errors: validationErrors });
    } else {
      return res.status(500).json({ error: "Error al crear el usuario" });
    }
  };
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      const { password, ...restUserData } = req.body;
      await user.update(restUserData);
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = {};
      error.errors.forEach(err => {
        validationErrors[err.path] = err.message;
      });
      return res.status(400).json({ errors: validationErrors });
    } else {
      res.status(500).json({ error: "Error al actualizar el usuario" });
    }
  }
}

const updatePassword = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const { currentPassword, newPassword } = req.body;
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña actual incorrecta" });
    }
    if (newPassword.length < 8 || newPassword.length > 100) {
      return res.status(400).json({ errors: { newPassword: "La nueva contraseña debe tener entre 8 y 100 caracteres" } });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedNewPassword });
    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    res.status(500).json({ error: "Error al actualizar la contraseña" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(200).json({
        message: "Usuario eliminado",
        user: user
      });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
}

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const resetCode = crypto.randomBytes(4).toString('hex');
    user.resetCode = resetCode;
    await user.save();

    await sendMail(email, 'Código de actualización de contraseña', `Tu código es:`, resetCode);
    res.status(200).json({ message: "Código de actualización enviado" });
  } catch (error) {
    console.error("Error al solicitar la actualización de contraseña:", error);
    res.status(500).json({ error: "Error al solicitar la actualización de contraseña" });
  }
};

const updatePasswordWithCode = async (req, res) => {
  try {
    const { email, resetCode, newPassword } = req.body;
    const user = await User.findOne({ where: { email, resetCode } });
    if (!user) {
      return res.status(404).json({ error: "Código de actualización incorrecto o usuario no encontrado" });
    }

    if (newPassword.length < 8 || newPassword.length > 100) {
      return res.status(400).json({ error: "La nueva contraseña debe tener entre 8 y 100 caracteres" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    user.resetCode = null;
    await user.save();

    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    res.status(500).json({ error: "Error al actualizar la contraseña" });
  }
};

export {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updatePassword,
  deleteUser,
  requestPasswordReset,
  updatePasswordWithCode
}
