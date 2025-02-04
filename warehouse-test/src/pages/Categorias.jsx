import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/categorias")
      .then((response) => setCategorias(response.data))
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📂 Categorías</h1>
        <button
          onClick={() => navigate("/crear-categoria")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-md transition"
        >
          ➕ Añadir Categoría
        </button>
      </div>

      {/* 📌 Grid de Categorías */}
      {categorias.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-gray-700">
                {categoria.nombre}
              </h2>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No hay categorías registradas.
        </p>
      )}
    </div>
  );
}

export default Categorias;
