import { useState, useContext, useEffect } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Importar toastify 

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
  const [categorias, setCategorias] = useState([]); // Estado para guardar categorías

  // Obtener categorías al cargar la página
  useEffect(() => {
    api
      .get("/categorias")
      .then((response) => {
        console.log("Categorías recibidas:", response.data); // 👀 Verifica en consola
        setCategorias(response.data);
      })
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: name === "categoriaId" ? Number(value) : value, // 🔹 Asegurar que `categoriaId` es un número
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productoConUsuario = { ...producto, usuarioId: usuario?.id || null };
      const response = await api.post("/productos", productoConUsuario);

      toast.success(`✅ Producto "${response.data.nombre}" añadido con éxito!`); // ✅ Notificación en vez de alert()
      navigate("/productos");
    } catch (error) {
      toast.error(error.response?.data?.error || "❌ Error al añadir producto");
    }
  };
  

  return (
    <div className="p-5 max-w-4xl mx-auto flex gap-5">
      {/* Formulario */}
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

          {/* Select para elegir categoría */}
          <select
  name="categoriaId"
  value={producto.categoriaId}
  onChange={handleChange}
  className="border p-2"
  required
>
  <option value="">Selecciona una categoría</option>
  {categorias && categorias.length > 0 ? (
    categorias.map((categoria) => (
      <option key={categoria.id} value={categoria.id}>
        {categoria.nombre}
      </option>
    ))
  ) : (
    <option disabled>No hay categorías disponibles</option>
  )}
</select>


          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Añadir Producto
          </button>
        </form>
      </div>

      {/* Tabla de Categorías */}
      <div className="w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Categorías Disponibles</h1>
          <button
            onClick={() => navigate("/crear-categoria")}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            + Añadir Categoría
          </button>
        </div>
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
                <td
                  colSpan="2"
                  className="border px-4 py-2 text-center text-gray-500"
                >
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
