import { useEffect, useState } from "react";
import { api } from "../services/api";

function Categorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    api
      .get("/categorias")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener categorías:", error);
      });
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Lista de Categorías</h1>
      <ul className="list-disc ml-6">
        {categorias.map((categoria) => (
          <li key={categoria.id} className="text-lg">
            {categoria.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categorias;
