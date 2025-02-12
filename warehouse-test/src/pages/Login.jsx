import { useState, useContext, useRef } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import SplitText from "../components/SplitText";
import { Eye, EyeOff } from "lucide-react"; // Iconos de ojo

export default function Login() {
  const [email, setEmail] = useState("");
  const passwordRef = useRef(null);
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input.trim());
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const sanitizedEmail = sanitizeInput(email.trim());
    const sanitizedPassword = sanitizeInput(passwordRef.current.value.trim());

    if (!validateEmail(sanitizedEmail)) {
      toast.error(
        "Correo electrónico inválido. Asegúrate de que tenga un formato correcto (ej: usuario@dominio.com)."
      );
      setLoading(false);
      return;
    }

    if (!validatePassword(sanitizedPassword)) {
      toast.error("La contraseña debe tener al menos 8 caracteres.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email: sanitizedEmail,
        password: sanitizedPassword,
      });
      login(response.data);
      toast.success("Inicio de sesión exitoso.");
      navigate("/productos");
    } catch (error) {
      toast.error(
        "Credenciales incorrectas. Por favor, inténtalo de nuevo: " +
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-lg text-white rounded-lg shadow-2xl max-w-md w-full p-8"
      >
        {/* Título con animación de SplitText */}

        <div className="text-center mb-6">
          <SplitText
            text="Inicio Sesión"
            className="text-3xl font-bold text-teal-400 "
            delay={100}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
        </div>

        <form onSubmit={handleLogin} className="grid space-y-4">
          <motion.input
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            type="text"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
            required
          />
<motion.div className="relative">
  <motion.input
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    type={showPassword ? "text" : "password"} // Alterna entre mostrar y ocultar
    placeholder="Contraseña"
    ref={passwordRef}
    className="border border-gray-700 bg-gray-800 text-white p-3 rounded-lg w-full pr-10 focus:ring-2 focus:ring-teal-400 focus:outline-none"
    required
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-3 text-gray-400 hover:text-white"
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
</motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            type="submit"
            disabled={loading}
            className={`relative px-6 py-3 bg-teal-500 text-black font-semibold rounded-lg transition-all cursor-pointer
                        ${
                          loading
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:scale-105 hover:shadow-[0px_0px_20px_rgba(45,212,191,0.8)] hover:bg-teal-600"
                        }`}
          >
            {loading ? "Cargando..." : "Ingresar"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
