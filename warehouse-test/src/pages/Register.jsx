import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("cliente"); // Cliente por defecto
  const navigate = useNavigate();

const handleRegister = async (e) => {
  e.preventDefault();

  console.log("Datos enviados al backend:", { nombre, email, password, rol }); // 🔍 Depuración

  try {
    await api.post("/auth/register", { nombre, email, password, rol });
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    navigate("/login");
  } catch (error) {
    alert(error.response?.data?.error || "Error en el registro");
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
