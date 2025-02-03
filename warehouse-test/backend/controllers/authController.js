import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, rol: usuario.rol },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

// ✅ Registro de usuario
export const register = async (req, res) => {
  try {
    console.log("Datos recibidos en backend:", req.body); // 🔍 Depuración

    let { nombre, email, password, rol } = req.body;

    // 🔹 Si el frontend no envió `rol`, lo asignamos como "usuario"
    if (!rol || (rol !== "admin" && rol !== "usuario")) {
      rol = "usuario";
    }

    // Verificar si el email ya está registrado
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario con el rol correcto
    const usuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      rol, // ✅ Guardamos el rol correctamente
    });

    res.status(201).json({ mensaje: "Usuario registrado con éxito", usuario });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Inicio de sesión
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Email recibido:", email);
    console.log("Password recibido:", password);

    // Buscar usuario por email
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      console.log("Usuario no encontrado");
      return res
        .status(400)
        .json({ error: "Usuario o contraseña incorrectos" });
    }

    console.log("Usuario encontrado en BD:", usuario);

    // Verificar contraseña
    console.log("Contraseña en BD:", usuario.password); // Verificar que la contraseña en BD está encriptada
    const esValido = await bcrypt.compare(password, usuario.password);
    console.log("Contraseña válida:", esValido);

    if (!esValido) {
      return res
        .status(400)
        .json({ error: "Usuario o contraseña incorrectos" });
    }

    // Generar token
    const token = generarToken(usuario);

    res.json({
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: error.message });
  }
};
