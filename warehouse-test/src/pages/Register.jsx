import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Importar toast para notificaciones
import { motion } from "framer-motion";



function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("cliente"); // Cliente por defecto
  const navigate = useNavigate();

   // Sanitización básica (elimina etiquetas HTML)
   const sanitizeInput = (input) => {
    const parser = new DOMParser();
    const sanitizedString = parser.parseFromString(input, "text/html").body.textContent || "";
    return sanitizedString.trim();
  };
  
  // Validación de nombre (sin caracteres especiales y al menos 3 caracteres)
  const validateNombre = (nombre) => {
    const nombrePattern = /^[a-zA-ZÀ-ÿ\s]{3,40}$/;
    return nombrePattern.test(nombre);
  };

  // Validación de email
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Validación de contraseña (mínimo 8 caracteres, una mayúscula, un número y un carácter especial)
  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

const handleRegister = async (e) => {
  e.preventDefault();
  const sanitizedNombre = sanitizeInput(nombre);
  const sanitizedEmail = sanitizeInput(email);
  const sanitizedPassword = sanitizeInput(password);

  // Validaciones
  if (!validateNombre(sanitizedNombre)) {
    toast.error("El nombre debe tener al menos 3 caracteres y solo letras.");
    return;
  }

  if (!validateEmail(sanitizedEmail)) {
    toast.error("Correo electrónico inválido. Asegúrate de que tenga un formato correcto (ej: usuario@dominio.com).");
    return;
  }

  if (!validatePassword(sanitizedPassword)) {
    toast.error("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.");
    return;
  }


  console.log("Datos enviados al backend:", { nombre: sanitizedNombre, email: sanitizedEmail, password: sanitizedPassword, rol }); // 🔍 Depuración

  try {
    await api.post("/auth/register", { nombre: sanitizedNombre, email: sanitizedEmail, password: sanitizedPassword, rol });
    toast.success("✅ Registro exitoso. Ahora puedes iniciar sesión.");
    navigate("/login");
  } catch (error) {
    toast.error(error.response?.data?.error || "Error en el registro");
  }
};

return (
  <div className="h-screen w-screen flex justify-center items-center bg-black">
    {/* Contenedor con animación de entrada */}
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Comienza invisible y un poco más abajo
      animate={{ opacity: 1, y: 0 }} // Aparece y sube suavemente
      transition={{ duration: 1, ease: "easeOut" }} // Efecto suave
      className="flex bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-lg text-white rounded-lg shadow-2xl max-w-3xl w-full overflow-hidden"
    >
      {/* Formulario */}
      <div className="w-1/2 p-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-3xl font-bold mb-6 text-center text-teal-400"
        >
          Registro
        </motion.h1>

        <form onSubmit={handleRegister} className="grid space-y-4">
          <motion.input
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
            required
          />

          <motion.input
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            type="text"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
            required
          />

          <motion.input
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
            required
          />

          <motion.select
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none cursor-pointer"
          >
            <option value="usuario">Cliente</option>
            <option value="admin">Administrador</option>
          </motion.select>

          {/* Botón con animación de entrada */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            type="submit"
            className="relative px-6 py-3 bg-teal-500 text-black font-semibold rounded-lg transition-all cursor-pointer
                       hover:scale-105 hover:shadow-[0px_0px_20px_rgba(45,212,191,0.8)] hover:bg-teal-600"
          >
            Registrarse
          </motion.button>
        </form>
      </div>

      {/* Imagen con animación de entrada */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-1/2 relative hidden md:block"
      >
        <img
          src="./map.webp"
          alt="Registro"
          className="w-full h-full object-cover brightness-75 contrast-125 saturate-150"
        />

        {/* Degradado lateral en la imagen */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/70 to-black"></div>

        {/* 🔥 Degradado en la parte inferior (Más grande) */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black/90 via-transparent to-black/10"></div>
      </motion.div>
    </motion.div>
  </div>
);



}

export default Register;
