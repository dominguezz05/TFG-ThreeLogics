import express from "express";
import { body, validationResult } from "express-validator";
import Categoria from "../models/Categoria.js";
import { verificarToken } from "../middleware/authMiddleware.js"; // Middleware de autenticación
const router = express.Router();

// Middleware para validar errores de express-validator
const validarCampos = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

// ✅ Crear categoría con validación y asignación de usuarioId
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
      const usuarioId = req.usuario.id; // ✅ Obtener usuario autenticado

      const categoria = await Categoria.create({ nombre, usuarioId });

      res.status(201).json(categoria);
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
);

// ✅ Endpoint para obtener todas las categorías
router.get("/", verificarToken, async (req, res) => {
  try {
    let categorias;

    if (req.usuario.rol === "admin") {
      // Admin ve todas las categorías
      categorias = await Categoria.findAll();
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
