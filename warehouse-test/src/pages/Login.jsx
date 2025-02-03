import { useState, useContext } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext"; // 👈 Importamos el contexto
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext); // 👈 Obtenemos la función `login` del contexto
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      login(response.data); // 👈 Actualizamos el usuario en el contexto
      alert("Login successful");
      navigate("/productos"); // 👈 Redirige a productos
    } catch (error) {
      alert(error.response?.data?.error || "Error en el inicio de sesión");
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
      <form onSubmit={handleLogin} className="grid gap-3">
        <input
          type="email"
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
