import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Importar toast para notificaciones


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
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>
      <form onSubmit={handleRegister} className="grid gap-3">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="text"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
          required
        />
       <select
  value={rol}
  onChange={(e) => setRol(e.target.value)}
  className="border p-2"
>
  <option value="usuario">Cliente</option> {/* 🔹 Cambia "cliente" por "usuario" */}
  <option value="admin">Administrador</option>
</select>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Register;
