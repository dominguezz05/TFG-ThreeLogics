import express from "express";
import Producto from "../models/Producto.js";
import Categoria from "../models/Categoria.js";
import Usuario from "../models/Usuario.js";
const router = express.Router();
import { verificarToken } from "../middleware/authMiddleware.js";

// Crear un nuevo producto
router.post("/", verificarToken, async (req, res) => {
  try {
    const { nombre, descripcion, precio, cantidad, categoriaId } = req.body;

    if (!nombre || !precio || cantidad === undefined) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const producto = await Producto.create({
      nombre,
      descripcion,
      precio,
      cantidad,
      categoriaId,
      usuarioId: req.usuario.id, // 👈 Asigna el producto al usuario autenticado
    });

    res.status(201).json(producto);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: error.message });
  }
});

// Obtener productos (admin ve todos, cliente solo los suyos)
// Obtener productos (admin ve todos, cliente solo los suyos)
router.get("/", verificarToken, async (req, res) => {
  try {
    let productos;

    if (req.usuario.rol === "admin") {
      // ✅ Admin ve todos los productos
      productos = await Producto.findAll({
        include: [
          { model: Categoria, attributes: ["nombre"] }, // ✅ Categoría
          { model: Usuario, attributes: ["nombre"] }, // ✅ Usuario creador
        ],
      });
    } else {
      // ✅ Cliente solo ve sus productos
      productos = await Producto.findAll({
        where: { usuarioId: req.usuario.id },
        include: { model: Categoria, attributes: ["nombre"] },
      });
    }

    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: error.message });
  }
});

// Obtener un producto por ID
// Actualizar un producto (Solo el dueño o el admin pueden modificarlo)
router.put("/:id", verificarToken, async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Solo el dueño del producto o el admin pueden actualizarlo
    if (req.usuario.rol !== "admin" && producto.usuarioId !== req.usuario.id) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para modificar este producto" });
    }

    const { nombre, descripcion, precio, cantidad, categoriaId } = req.body;
    await producto.update({
      nombre,
      descripcion,
      precio,
      cantidad,
      categoriaId,
    });

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un producto
router.delete("/:id", verificarToken, async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Solo el dueño del producto o el admin pueden eliminarlo
    if (req.usuario.rol !== "admin" && producto.usuarioId !== req.usuario.id) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para eliminar este producto" });
    }

    await producto.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
