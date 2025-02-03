import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

function CrearCategoria() {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState({ nombre: "" });

  const handleChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/categorias", categoria);
      console.log("Categoría añadida:", response.data);

      alert(`Categoría "${response.data.nombre}" añadida con éxito!`);
      navigate("/crear-producto"); // Redirige a la página de creación de productos
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
