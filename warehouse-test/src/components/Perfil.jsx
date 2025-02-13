import { useState, useContext, useEffect } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react"; // Iconos para mostrar/ocultar contraseña
import zxcvbn from "zxcvbn"; // Biblioteca para evaluar la seguridad de la contraseña

export default function Perfil() {
  const { usuario, setUsuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({ nombre: "", email: "" });
  const [nuevoPassword, setNuevoPassword] = useState(""); // Nueva contraseña
  const [confirmarPassword, setConfirmarPassword] = useState(""); // Confirmar contraseña
  const [passwordStrength, setPasswordStrength] = useState(0); // Nivel de seguridad
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(null); // Mensaje de error en tiempo real
  const [isFormValid, setIsFormValid] = useState(false); // Control de validación
  const [imagenPerfil, setImagenPerfil] = useState(null); // Imagen del usuario
  const [imagenPreview, setImagenPreview] = useState(null); // Previsualización de imagen

  // Cargar datos del usuario autenticado al montar el componente
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await api.get("/usuarios/perfil");
        setUser({
          nombre: response.data.usuario.nombre,
          email: response.data.usuario.email,
        });

        // Si el usuario tiene una imagen, cargarla
        if (response.data.usuario.imagenPerfil) {
          setImagenPerfil(response.data.usuario.imagenPerfil);
        }
      } catch (error) {
        console.error("❌ Error al obtener perfil:", error);
        toast.error("❌ No se pudo obtener el perfil");
      }
    }

    if (usuario) {
      fetchUserData();
    }
  }, [usuario]);

  // Manejar la subida de imágenes y previsualización
  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    const MAX_SIZE_MB = 16; // Tamaño máximo permitido en MB

    if (file) {
      // Verificar que el archivo sea una imagen
      if (!file.type.startsWith("image/")) {
        toast.error("❌ El archivo debe ser una imagen.");
        return;
      }

      // Verificar que el tamaño no exceda 16MB
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error(
          `❌ La imagen es demasiado grande. Máximo permitido: ${MAX_SIZE_MB}MB.`
        );
        return;
      }

      setImagenPreview(URL.createObjectURL(file)); // Mostrar imagen antes de subirla
      setImagenPerfil(file); // Guardar el archivo en el estado
    }
  };

  // Validar contraseña en tiempo real
  const validarPassword = (password) => {
    const regexMayuscula = /[A-Z]/; // Al menos una mayúscula
    const regexSimbolo = /[!@#$%^&*(),.?":{}|<>]/; // Al menos un símbolo

    if (password.length < 8) {
      return "❌ La contraseña debe tener al menos 8 caracteres.";
    }
    if (!regexMayuscula.test(password)) {
      return "❌ La contraseña debe incluir al menos una letra mayúscula.";
    }
    if (!regexSimbolo.test(password)) {
      return "❌ La contraseña debe incluir al menos un símbolo (@, #, $, etc.).";
    }
    return null; // Si todo está bien, retorna null
  };

  // Manejar cambios en la contraseña nueva y calcular la seguridad
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNuevoPassword(password);
    const result = zxcvbn(password);
    setPasswordStrength(result.score); // 0 (débil) - 4 (fuerte)

    const error = validarPassword(password);
    setPasswordError(error);
    validarFormulario(password, confirmarPassword);
  };

  // Manejar cambios en la confirmación de contraseña
  const handleConfirmPasswordChange = (e) => {
    setConfirmarPassword(e.target.value);
    validarFormulario(nuevoPassword, e.target.value);
  };

  // Validar si el formulario es válido
  const validarFormulario = (password, confirmPassword) => {
    const isValid =
      password && !validarPassword(password) && password === confirmPassword;
    setIsFormValid(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nuevoPassword !== confirmarPassword) {
      toast.error("❌ Las contraseñas no coinciden.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nombre", user.nombre);
      formData.append("email", user.email);
      if (nuevoPassword) {
        formData.append("nuevoPassword", nuevoPassword);
      }
      if (imagenPerfil instanceof File) {
        formData.append("imagenPerfil", imagenPerfil);
      }

      console.log(
        "🔍 Enviando FormData:",
        Object.fromEntries(formData.entries())
      );

      const response = await api.put("/usuarios/perfil", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser = {
        ...usuario,
        nombre: user.nombre,
        email: user.email,
        imagenPerfil: response.data.usuario.imagenPerfil,
      };
      setUsuario(updatedUser);
      localStorage.setItem("usuario", JSON.stringify(updatedUser));

      toast.success("✅ Perfil actualizado con éxito");

      setTimeout(() => {
        navigate("/perfil");
      }, 1500);
    } catch (error) {
      console.error("❌ Error al actualizar perfil:", error);
      toast.error(
        error.response?.data?.error || "❌ No se pudo actualizar el perfil"
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96 text-center relative">
        {/* Botón para volver atrás */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-white hover:text-white flex items-center cursor-pointer"
        >
          <ArrowLeft size={20} className="mr-2" /> Volver
        </button>
        <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
        {/* Imagen de perfil */}
        <div className="mb-4">
          <label className="block text-gray-400 mt-4">Imagen de Perfil</label>
          <div className="flex justify-center mt-4">
            <img
              src={
                imagenPreview ||
                imagenPerfil ||
                "https://via.placeholder.com/100"
              }
              alt="Perfil"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-500"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
            className="mt-4 text-gray-300 cursor-pointer"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="text-gray-400 block mt-4">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={user.nombre}
              onChange={(e) => setUser({ ...user, nombre: e.target.value })}
              className="w-full p-2 mt-1 rounded bg-gray-800 text-white"
              required
            />
          </div>

          <div className="text-left">
            <label className="text-gray-400 block">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-2 mt-1 rounded bg-gray-800 text-white"
              required
            />
          </div>

          {/* Indicador de seguridad de contraseña */}
          <div className="text-left relative">
            <label className="text-gray-400 block">
              Nueva Contraseña (opcional)
            </label>
            <input
  type={showNewPassword ? "text" : "password"}
  placeholder="Mínimo 8 caracteres, 1 mayúscula y 1 símbolo"
  value={nuevoPassword}
  onChange={handlePasswordChange}
  className="w-full p-2 mt-1 rounded bg-gray-800 text-white pr-10"
  autoComplete="new-password"
/>

            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-200"
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {passwordError && (
              <p className="text-red-400 text-sm mt-1">{passwordError}</p>
            )}
            <div
              className={`h-2 mt-1 rounded-full transition ${
                [
                  "bg-red-500",
                  "bg-orange-400",
                  "bg-yellow-300",
                  "bg-green-400",
                  "bg-green-600",
                ][passwordStrength]
              }`}
            />
          </div>

          {/* Confirmación de contraseña */}
          <div className="text-left relative">
            <label className="text-gray-400 block">
              Confirmar Nueva Contraseña
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repite la nueva contraseña"
              value={confirmarPassword}
              onChange={handleConfirmPasswordChange}
              onPaste={(e) => e.preventDefault()} // Evita copiar/pegar
              className="w-full p-2 mt-1 rounded bg-gray-800 text-white pr-10"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-black py-2 rounded-lg hover:bg-teal-400 transition disabled:opacity-50 mt-4"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}
