import express from "express";
import { body, validationResult } from "express-validator";
import Categoria from "../models/Categoria.js";
import { verificarToken } from "../middleware/authMiddleware.js";
import { Op } from "sequelize";

const router = express.Router();

// Middleware para validar errores de express-validator
const validarCampos = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

// ✅ Crear categoría con validación, usuarioId y evitar duplicados
router.post(
  "/",
  [
    verificarToken, // ✅ Asegurar que el usuario está autenticado
    body("nombre").notEmpty().withMessage("El nombre es obligatorio").trim(),
  ],
  validarCampos,
  async (req, res) => {
    try {
      const { nombre } = req.body;
      const usuarioId = req.usuario.id;

      // ❌ Verificar si la categoría ya existe para este usuario
      const categoriaExistente = await Categoria.findOne({
        where: { nombre, usuarioId },
      });

      if (categoriaExistente) {
        return res.status(400).json({
          error: "Esta categoría ya existe para este usuario.",
          notify: true, // ✅ Agregamos esta clave para la notificación en el frontend
        });
      }

      // ✅ Crear la nueva categoría
      const categoria = await Categoria.create({ nombre, usuarioId });

      res.status(201).json({
        mensaje: `✅ Categoría "${categoria.nombre}" creada con éxito.`,
        categoria,
        notify: true, // ✅ Notificación para el frontend
      });
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
);

// ✅ Endpoint para obtener todas las categorías sin duplicados
router.get("/", verificarToken, async (req, res) => {
  try {
    let categorias;

    if (req.usuario.rol === "admin") {
      // Admin ve todas las categorías pero sin duplicados
      const categoriasTodas = await Categoria.findAll();

      // Filtrar categorías duplicadas por nombre
      categorias = Array.from(
        new Map(categoriasTodas.map((cat) => [cat.nombre, cat])).values()
      );
    } else {
      // Cliente solo ve sus propias categorías
      categorias = await Categoria.findAll({
        where: { usuarioId: req.usuario.id },
      });
    }

    res.json(categorias);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
