import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      lastPasswordChange: usuario.lastPasswordChange || new Date(), // ✅ Asegura que no sea NULL
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// ✅ Registro de usuario
// ✅ Registro de usuario
export const register = async (req, res) => {
  try {
    console.log("Datos recibidos en backend:", req.body);

    let { nombre, email, password, rol } = req.body;

    if (!rol || (rol !== "admin" && rol !== "usuario")) {
      rol = "usuario";
    }

    // Verificar si el email ya está registrado, incluyendo usuarios eliminados
    const usuarioExistente = await Usuario.findOne({
      where: { email },
      paranoid: false, // 🚀 Esto permite buscar entre los eliminados
    });

    if (usuarioExistente) {
      if (usuarioExistente.deletedAt) {
        return res.status(400).json({
          error:
            "Este correo está asociado a un usuario dado de baja. Contacta con soporte.",
        });
      }
      return res.status(400).json({ error: "El email ya está registrado." });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario con lastPasswordChange inicializado correctamente
    const usuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      rol,
      createdAt: new Date(),
      lastPasswordChange: new Date(),
    });

    res.status(201).json({ mensaje: "Usuario registrado con éxito", usuario });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email, incluyendo eliminados
    const usuario = await Usuario.findOne({
      where: { email },
      paranoid: false, // ✅ Buscar en registros eliminados
    });

    if (!usuario) {
      return res
        .status(400)
        .json({ error: "Usuario o contraseña incorrectos." });
    }

    // Verificar si el usuario está eliminado (soft delete)
    if (usuario.deletedAt !== null) {
      return res.status(403).json({
        error:
          "Esta cuenta ha sido dada de baja. Contacta con soporte si deseas recuperarla.",
      });
    }

    // Verificar contraseña
    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) {
      return res
        .status(400)
        .json({ error: "Usuario o contraseña incorrectos." });
    }

    // Generar token
    const token = generarToken(usuario);

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        lastPasswordChange: usuario.lastPasswordChange || new Date(),
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};
// ✅ Actualización de perfil (nombre, email y opcionalmente contraseña)
export const actualizarPerfil = async (req, res) => {
  try {
    const { nombre, email, nuevoPassword } = req.body;

    // 🔹 Buscar usuario incluyendo eliminados
    const usuario = await Usuario.findByPk(req.usuario.id, { paranoid: false });

    if (!usuario) {
      return res.status(404).json({ error: "❌ Usuario no encontrado." });
    }

    // 🔹 Verificar si el usuario fue eliminado
    if (usuario.deletedAt) {
      return res
        .status(403)
        .json({
          error:
            "❌ Esta cuenta ha sido dada de baja. Contacta con soporte para recuperarla.",
        });
    }

    // ✅ Verificar si el nuevo email ya está en uso por otro usuario
    if (email !== usuario.email) {
      const emailExistente = await Usuario.findOne({ where: { email } });
      if (emailExistente) {
        return res.status(400).json({ error: "❌ El email ya está en uso." });
      }
    }

    // ✅ Actualizar nombre y email sin modificar la contraseña
    usuario.nombre = nombre;
    usuario.email = email;

    // ✅ Si se proporciona nueva contraseña, verificar antes de actualizar
    if (nuevoPassword) {
      // Verificar si han pasado al menos 14 días desde el último cambio
      const ultimaFechaCambio = new Date(usuario.lastPasswordChange);
      const ahora = new Date();
      const diferenciaDias = Math.floor(
        (ahora - ultimaFechaCambio) / (1000 * 60 * 60 * 24)
      );

      if (diferenciaDias < 14) {
        return res.status(400).json({
          error: `❌ Solo puedes cambiar la contraseña cada 14 días. Te quedan ${
            14 - diferenciaDias
          } días.`,
        });
      }

      // Encriptar y actualizar nueva contraseña
      const hashedPassword = await bcrypt.hash(nuevoPassword, 10);
      usuario.password = hashedPassword;
      usuario.lastPasswordChange = ahora;
    }

    await usuario.save();

    res.json({
      mensaje: "✅ Perfil actualizado con éxito",
      usuario: {
        nombre: usuario.nombre,
        email: usuario.email,
        lastPasswordChange: usuario.lastPasswordChange || new Date(),
      },
    });
  } catch (error) {
    console.error("❌ Error al actualizar perfil:", error);
    res.status(500).json({ error: "❌ Error al actualizar perfil." });
  }
};

// ✅ Cambio de contraseña (directamente desde configuración)
export const cambiarPassword = async (req, res) => {
  try {
    const { passwordActual, nuevoPassword } = req.body;

    const usuario = await Usuario.findByPk(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si han pasado al menos 14 días desde el último cambio
    const ultimaFechaCambio = new Date(usuario.lastPasswordChange);
    const ahora = new Date();
    const diferenciaDias = Math.floor(
      (ahora - ultimaFechaCambio) / (1000 * 60 * 60 * 24)
    );

    if (diferenciaDias < 14) {
      return res.status(400).json({
        error: `Solo puedes cambiar la contraseña cada 14 días. Te quedan ${
          14 - diferenciaDias
        } días.`,
      });
    }

    // Verificar contraseña actual
    const esValido = await bcrypt.compare(passwordActual, usuario.password);
    if (!esValido) {
      return res.status(400).json({ error: "Contraseña actual incorrecta" });
    }

    // Encriptar nueva contraseña
    const hashedPassword = await bcrypt.hash(nuevoPassword, 10);
    usuario.password = hashedPassword;
    usuario.lastPasswordChange = ahora; // ✅ Actualizar la fecha del último cambio

    await usuario.save();

    res.json({
      mensaje: "✅ Contraseña cambiada con éxito",
      lastPasswordChange: ahora,
    });
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    res.status(500).json({ error: "Error al cambiar la contraseña" });
  }
};
