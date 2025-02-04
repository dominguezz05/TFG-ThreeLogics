import { useState, useContext } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext"; // 👈 Importamos el contexto
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Importar toast para notificaciones


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext); // 👈 Obtenemos la función `login` del contexto
  const navigate = useNavigate();

  const sanitizeInput = (input) => {
    const parser = new DOMParser();
    const sanitizedString = parser.parseFromString(input, "text/html").body.textContent || "";
    return sanitizedString.trim(); // Elimina etiquetas HTML
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8; // La contraseña debe tener al menos 8 caracteres
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const sanitizedEmail = sanitizeInput(email.trim());
    const sanitizedPassword = sanitizeInput(password.trim());

    if (!validateEmail(sanitizedEmail)) {
      toast.error("Correo electrónico inválido. Asegúrate de que tenga un formato correcto (ej: usuario@dominio.com).");
      return;
    }

    if (!validatePassword(sanitizedPassword)) {
      toast.error("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    try {
      const response = await api.post("/auth/login", { email: sanitizedEmail, password: sanitizedPassword });
      login(response.data); // 👈 Actualizamos el usuario en el contexto
      toast.success(`✅ Login Succesful`); // ✅ Notificación en vez de alert()
      navigate("/productos"); // 👈 Redirige a productos
    } catch (error) {
      toast.error(error.response?.data?.error || "❌ Error en el inicio de sesión");
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
      <form onSubmit={handleLogin} className="grid gap-3">
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
