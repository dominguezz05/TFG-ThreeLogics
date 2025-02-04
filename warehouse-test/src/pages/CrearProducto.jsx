import { useState, useContext, useEffect } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 

function CrearProducto() {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    cantidad: "",
    categoriaId: "",
  });
  
  const [categorias, setCategorias] = useState([]); 
  const [nuevaCategoria, setNuevaCategoria] = useState(""); // Estado para nueva categoría
  const [creandoCategoria, setCreandoCategoria] = useState(false); // Estado para mostrar input

  // Obtener categorías
  useEffect(() => {
    api.get("/categorias")
      .then((response) => setCategorias(response.data))
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: name === "categoriaId" ? Number(value) : value });

    if (name === "categoriaId" && value === "crear") {
      setCreandoCategoria(true);
      setProducto({ ...producto, categoriaId: "" });
    } else {
      setCreandoCategoria(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let categoriaIdFinal = producto.categoriaId;

      // 🚀 Crear nueva categoría si el usuario eligió "crear nueva"
      if (creandoCategoria && nuevaCategoria.trim() !== "") {
        // Verificar si ya existe la categoría
        const existeCategoria = categorias.find(c => c.nombre.toLowerCase() === nuevaCategoria.toLowerCase());

        if (existeCategoria) {
          categoriaIdFinal = existeCategoria.id;
          toast.info(`ℹ️ La categoría "${nuevaCategoria}" ya existe y será usada.`);
        } else {
          const responseCategoria = await api.post("/categorias", { nombre: nuevaCategoria });
          categoriaIdFinal = responseCategoria.data.id;
          toast.success(`✅ Categoría "${nuevaCategoria}" creada con éxito!`);

          // Actualizar categorías en el frontend
          setCategorias([...categorias, responseCategoria.data]);
        }
      }

      // Crear producto con la categoría final
      const response = await api.post("/productos", {
        ...producto,
        categoriaId: categoriaIdFinal,
        usuarioId: usuario?.id || null,
      });

      toast.success(`✅ Producto "${response.data.nombre}" añadido con éxito!`);
      navigate("/productos");

    } catch (error) {
      toast.error(error.response?.data?.error || "❌ Error al añadir producto");
    }
  };

  return (
    <div className="p-5 max-w-4xl mx-auto flex gap-5">
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4">Añadir Producto</h1>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del producto"
            value={producto.nombre}
            onChange={handleChange}
            className="border p-2"
            required
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={producto.descripcion}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={producto.precio}
            onChange={handleChange}
            className="border p-2"
            required
          />
          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            value={producto.cantidad}
            onChange={handleChange}
            className="border p-2"
            required
          />

          {/* Selección de Categoría */}
          <select
            name="categoriaId"
            value={producto.categoriaId}
            onChange={handleChange}
            className="border p-2"
            required={!creandoCategoria}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
            <option value="crear">+ Crear nueva categoría</option>
          </select>

          {/* Input para nueva categoría */}
          {creandoCategoria && (
            <input
              type="text"
              placeholder="Nombre de la nueva categoría"
              value={nuevaCategoria}
              onChange={(e) => setNuevaCategoria(e.target.value)}
              className="border p-2"
              required
            />
          )}

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Añadir Producto
          </button>
        </form>
      </div>

      {/* Tabla de Categorías */}
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4">Categorías Disponibles</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nombre</th>
            </tr>
          </thead>
          <tbody>
            {categorias.length > 0 ? (
              categorias.map((categoria) => (
                <tr key={categoria.id}>
                  <td className="border px-4 py-2">{categoria.id}</td>
                  <td className="border px-4 py-2">{categoria.nombre}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="border px-4 py-2 text-center text-gray-500">
                  No hay categorías disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CrearProducto;
