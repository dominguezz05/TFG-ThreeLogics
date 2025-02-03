import express from "express";
import { verificarToken } from "../middleware/authMiddleware.js";
import Pedido from "../models/Pedido.js";
import DetallePedido from "../models/DetallePedido.js";
import Producto from "../models/Producto.js";
import sequelize from "../config/database.js";
import { Op } from "sequelize";

const router = express.Router();

// 📌 Crear un pedido
router.post("/", verificarToken, async (req, res) => {
  const { productos } = req.body;
  const usuarioId = req.usuario.id;

  if (!productos || productos.length === 0) {
    return res.status(400).json({ error: "El pedido no tiene productos" });
  }

  try {
    let total = 0;

    const pedido = await sequelize.transaction(async (t) => {
      const nuevoPedido = await Pedido.create(
        { usuarioId, total: 0, estado: "pendiente" }, // Se agrega estado inicial "pendiente"
        { transaction: t }
      );

      for (const item of productos) {
        const producto = await Producto.findByPk(item.productoId);
        if (!producto) {
          throw new Error(`Producto ${item.productoId} no encontrado`);
        }

        const subtotal = producto.precio * item.cantidad;
        total += subtotal;

        await DetallePedido.create(
          {
            pedidoId: nuevoPedido.id,
            productoId: item.productoId,
            cantidad: item.cantidad,
            precioUnitario: producto.precio,
            subtotal,
          },
          { transaction: t }
        );
      }

      await nuevoPedido.update({ total }, { transaction: t });

      return nuevoPedido;
    });

    res.status(201).json({ mensaje: "Pedido creado con éxito", pedido });
  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({ error: "Error al crear pedido" });
  }
});

// 📌 Obtener pedidos del usuario autenticado
// 📌 Obtener pedidos (Admin ve todos, usuario solo los suyos)
router.get("/", verificarToken, async (req, res) => {
  try {
    let whereCondition = {}; // Para filtrar pedidos

    if (req.usuario.rol !== "admin") {
      whereCondition.usuarioId = req.usuario.id; // Si no es admin, solo ve sus pedidos
    }

    const pedidos = await Pedido.findAll({
      where: whereCondition,
      include: [
        {
          model: DetallePedido,
          include: { model: Producto, attributes: ["nombre", "precio"] },
        },
      ],
      order: [["fecha", "DESC"]],
    });

    res.json(pedidos);
  } catch (error) {
    console.error("Error obteniendo pedidos:", error);
    res.status(500).json({ error: "Error al obtener los pedidos" });
  }
});

// 📌 Cambiar estado de un pedido (Solo Admin)
// 📌 Cambiar estado de un pedido
router.put("/:id/estado", verificarToken, async (req, res) => {
  const { estado } = req.body;
  const { id } = req.params;

  try {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    // 🚀 Verifica que el estado es válido
    const estadosPermitidos = ["pendiente", "pagar", "enviado", "completado"];
    if (!estadosPermitidos.includes(estado)) {
      return res.status(400).json({ error: "Estado no permitido" });
    }

    // 🔹 Si el estado es "pagar", simular la pasarela de pago
    if (estado === "pagar") {
      // Simulación de la pasarela de pago con un delay de 3 segundos
      setTimeout(async () => {
        pedido.estado = "enviado"; // Cambia el estado a "enviado" automáticamente tras el pago
        await pedido.save();
        console.log(
          `💳 Pago simulado, pedido ${pedido.id} marcado como enviado.`
        );
      }, 3000); // Simulación de tiempo de espera para el pago
      return res.json({
        mensaje: "⏳ Redirigiendo a pasarela de pago...",
        pedido,
      });
    }

    // 📌 Actualizar estado en la base de datos
    await Pedido.update({ estado }, { where: { id } });

    res.json({ mensaje: "Estado del pedido actualizado", pedido });
  } catch (error) {
    console.error("Error al actualizar estado del pedido:", error);
    res.status(500).json({ error: "Error al actualizar estado del pedido" });
  }
});

// 📌 Eliminar un pedido (Solo si está pendiente)
router.delete("/:id", verificarToken, async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" });

    if (pedido.estado !== "pendiente") {
      return res
        .status(400)
        .json({ error: "No se puede eliminar un pedido procesado" });
    }

    await pedido.destroy();
    res.json({ mensaje: "Pedido eliminado" });
  } catch (error) {
    console.error("Error al eliminar pedido:", error);
    res.status(500).json({ error: "Error al eliminar pedido" });
  }
});
setInterval(async () => {
  try {
    const pedidos = await Pedido.findAll({
      where: {
        estado: "enviado",
        fecha: { [Op.lt]: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Hace 1 día
      },
    });

    for (const pedido of pedidos) {
      pedido.estado = "completado";
      await pedido.save();
    }

    console.log("✅ Pedidos enviados ahora están completados.");
  } catch (error) {
    console.error("❌ Error actualizando pedidos completados:", error);
  }
}, 60000); // Se ejecuta cada 60 segundos

export default router;
