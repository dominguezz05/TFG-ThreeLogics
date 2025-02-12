import express from "express";
import bcrypt from "bcryptjs";
import { verificarToken } from "../middleware/authMiddleware.js";
import Usuario from "../models/Usuario.js";

const router = express.Router();

// 📌 Obtener perfil del usuario autenticado
router.get("/perfil", verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: ["nombre", "email", "password", "lastPasswordChange"],
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
      usuario: {
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password, // ✅ Enviar la contraseña encriptada
        lastPasswordChange: usuario.lastPasswordChange,
      },
    });
  } catch (error) {
    console.error("❌ Error al obtener perfil:", error);
    res.status(500).json({ error: "❌ No se pudo obtener el perfil" });
  }
});

// 📌 Ruta para actualizar el perfil del usuario autenticado
router.put("/perfil", verificarToken, async (req, res) => {
  try {
    const { nombre, email, nuevoPassword } = req.body;

    const usuario = await Usuario.findByPk(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si el nuevo email ya está en uso por otro usuario
    if (email !== usuario.email) {
      const emailExistente = await Usuario.findOne({ where: { email } });
      if (emailExistente) {
        return res.status(400).json({ error: "El email ya está en uso" });
      }
    }

    // ✅ Actualizar nombre y email
    usuario.nombre = nombre;
    usuario.email = email;

    // ✅ Si se proporciona nueva contraseña, actualizarla sin restricciones
    if (nuevoPassword) {
      // Encriptar nueva contraseña
      usuario.password = await bcrypt.hash(nuevoPassword, 10);
      usuario.lastPasswordChange = new Date(); // ✅ Se actualiza la fecha de cambio
    }

    await usuario.save();

    res.json({
      mensaje: "✅ Perfil actualizado con éxito",
      usuario: {
        nombre: usuario.nombre,
        email: usuario.email,
        lastPasswordChange: usuario.lastPasswordChange,
      },
    });
  } catch (error) {
    console.error("❌ Error al actualizar perfil:", error);
    res.status(500).json({ error: "❌ No se pudo actualizar el perfil" });
  }
});

export default router;
