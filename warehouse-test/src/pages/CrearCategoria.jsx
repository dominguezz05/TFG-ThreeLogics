import { useState, useContext } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // ✅ Importar AuthContext

function CrearCategoria() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext); // ✅ Obtener usuario autenticado
  const [categoria, setCategoria] = useState({ nombre: "" });

  const handleChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoria.nombre.trim()) {
      alert("El nombre de la categoría no puede estar vacío.");
      return;
    }

    try {
      const response = await api.post("/categorias", {
        nombre: categoria.nombre,
        usuarioId: usuario.id, // ✅ Enviar usuarioId
      });

      alert(`Categoría "${response.data.nombre}" añadida con éxito!`);
      navigate("/crear-producto"); // Redirige a la página de productos
    } catch (error) {
      console.error("Error al añadir categoría:", error);
      alert(error.response?.data?.error || "Error al añadir categoría");
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Añadir Categoría</h1>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la categoría"
          value={categoria.nombre}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Añadir Categoría
        </button>
      </form>
    </div>
  );
}

export default CrearCategoria;
