import express from "express";
import bcrypt from "bcryptjs";
import multer from "multer";
import { verificarToken } from "../middleware/authMiddleware.js";
import Usuario from "../models/Usuario.js";

const router = express.Router();

// 📌 Configuración de `multer` para manejar la subida de imágenes
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📌 Obtener perfil del usuario autenticado
// 📌 Ruta para obtener el perfil
router.get("/perfil", verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: ["nombre", "email", "imagenPerfil"],
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
      usuario: {
        nombre: usuario.nombre,
        email: usuario.email,
        imagenPerfil: usuario.imagenPerfil
          ? `data:image/png;base64,${usuario.imagenPerfil.toString("base64")}`
          : null, // ✅ Convertir imagen correctamente a Base64
      },
    });
  } catch (error) {
    console.error("❌ Error al obtener perfil:", error);
    res.status(500).json({ error: "❌ No se pudo obtener el perfil" });
  }
});
router.put(
  "/perfil",
  verificarToken,
  upload.single("imagenPerfil"),
  async (req, res) => {
    console.log("Archivo recibido:", req.file); // 🔍 Verifica si multer está recibiendo la imagen
    console.log("Datos recibidos:", req.body);

    try {
      const { nombre, email, nuevoPassword } = req.body;
      const imagenPerfil = req.file ? req.file.buffer : null; // Capturamos la imagen

      const usuario = await Usuario.findByPk(req.usuario.id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      // ✅ Verificar si `multer` realmente recibió el archivo
      console.log(
        "Imagen a guardar:",
        imagenPerfil ? "Sí, hay imagen" : "No, sin imagen"
      );

      // ✅ Actualizar los datos
      usuario.nombre = nombre;
      usuario.email = email;
      if (nuevoPassword) {
        usuario.password = await bcrypt.hash(nuevoPassword, 10);
        usuario.lastPasswordChange = new Date();
      }
      if (imagenPerfil) {
        usuario.imagenPerfil = imagenPerfil;
      }

      await usuario.save();

      res.json({
        mensaje: "✅ Perfil actualizado con éxito",
        usuario: {
          nombre: usuario.nombre,
          email: usuario.email,
          imagenPerfil: usuario.imagenPerfil
            ? usuario.imagenPerfil.toString("base64")
            : null,
        },
      });
    } catch (error) {
      console.error("❌ Error al actualizar perfil:", error);
      res.status(500).json({ error: "❌ No se pudo actualizar el perfil" });
    }
  }
);

export default router;
