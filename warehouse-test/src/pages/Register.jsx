import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import zxcvbn from "zxcvbn";
import { Eye, EyeOff } from "lucide-react"; // Iconos de ojo

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [rol, setRol] = useState("cliente");
  const [errors, setErrors] = useState({ nombre: "", email: "", password: "" });
  const navigate = useNavigate();

  const sanitizeInput = (input) => {
    const parser = new DOMParser();
    return parser.parseFromString(input, "text/html").body.textContent.trim();
  };

  const validateNombre = (nombre) => {
    const pattern = /^[a-zA-ZÀ-ÿ\s]{3,40}$/;
    return pattern.test(nombre);
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSymbol = /[@$!%*?&]/.test(password);
    return minLength && hasUpperCase && hasSymbol;
  };
  
  const isDisabled = !validatePassword(password); // Deshabilitar el botón si la contraseña es inválida
  

  const getPasswordStrength = (password) => {
    if (password.length < 5) return 0;
    if (!/[A-Z]/.test(password) || !/[@$!%*?&]/.test(password)) return 1;
    if (password.length >= 8 && /[A-Z]/.test(password) && /[@$!%*?&]/.test(password)) return 2;
    return 3;
  };

  const passwordStrength = getPasswordStrength(password);
 

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const sanitizedNombre = sanitizeInput(nombre);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    try {
      await api.post("/auth/register", {
        nombre: sanitizedNombre,
        email: sanitizedEmail,
        password: sanitizedPassword,
        rol,
      });
      toast.success("✅ Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error en el registro");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="flex bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-lg text-white rounded-lg shadow-2xl max-w-3xl w-full overflow-hidden">
        <div className="w-1/2 p-10">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="text-3xl font-bold mb-6 text-center text-teal-400">Registro</motion.h1>
          <form onSubmit={handleRegister} className="grid space-y-4">
            <motion.input initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} type="text" placeholder="Nombre" value={nombre} onChange={(e) => {
              setNombre(e.target.value);
              setErrors({ ...errors, nombre: validateNombre(e.target.value) ? "" : "Nombre inválido." });
            }} className="border border-gray-700 bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none" required />
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}

            <motion.input initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} type="text" placeholder="Correo" value={email} onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: validateEmail(e.target.value) ? "" : "Correo inválido." });
            }} className="border border-gray-700 bg-gray-800 text-white p-3 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none" required />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

       {/* Input de contraseña con el icono de ojo */}
       <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({
                    ...errors,
                    password: validatePassword(e.target.value)
                      ? ""
                      : "La contraseña debe tener al menos 8 caracteres, una mayúscula y un símbolo.",
                  });
                }}
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
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="w-full bg-gray-700 h-2 rounded-lg overflow-hidden">
              <div className={`h-full transition-all ${passwordStrength === 0 ? 'bg-red-500 w-1/5' : passwordStrength === 1 ? 'bg-orange-500 w-2/5' : passwordStrength === 2 ? 'bg-green-500 w-4/5' : 'bg-teal-400 w-full'}`}></div>
            </motion.div>

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
  disabled={isDisabled}  // Botón deshabilitado si la contraseña no es válida
  className={`relative px-6 py-3 font-semibold rounded-lg transition-all cursor-pointer
    ${isDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-teal-500 hover:scale-105 hover:shadow-[0px_0px_20px_rgba(45,212,191,0.8)] hover:bg-teal-600"}`}
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
