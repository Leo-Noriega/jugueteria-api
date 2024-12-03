import User from '../models/User.js';
import { sendMailChangePassword } from '../utils/mailSender.js';
import { Op } from 'sequelize';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuario no registrado' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, userId: user.user_id, role: user.role });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

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

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, userId: user.user_id });
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
  }
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
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const token = crypto.randomBytes(32).toString('hex');
    const expiration = new Date(Date.now() + 3600000); // 1 hour

    await user.update({
      resetToken: token,
      tokenExpiration: expiration
    });

    const resetUrl = `${process.env.FRONTEND_URL}reset-password?token=${token}`;
    await sendMailChangePassword(email, 'Cambio de contraseña', 'Haz click en el siguiente enlace para cambiar tu contraseña', resetUrl);
    res.status(200).json({ message: "Correo enviado" });
  } catch (error) {
    
  }
};

const updatePasswordWithCode = async (req, res) => {
  const { token, password } = req.body;
  try {
    console.log(token);
    console.log(password)

    const user = await User.findOne({ where: { resetToken: token, tokenExpiration: { [Op.gt]: new Date() } } });

    if (!user) {
      return res.status(404).json({ error: "Token inválido o expirado" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({
      password: hashedPassword,
      resetToken: null,
      tokenExpiration: null
    });
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
  loginUser,
  requestPasswordReset,
  updatePasswordWithCode
}
