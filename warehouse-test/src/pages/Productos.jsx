import { useEffect, useState, useContext } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Productos() {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // Filtros de búsqueda
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [stockBajo, setStockBajo] = useState(false);
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  // Paginación
  const [pagina, setPagina] = useState(1);
  const productosPorPagina = 5;

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [prodResponse, catResponse] = await Promise.all([
          api.get("/productos"),
          api.get("/categorias"),
        ]);
        setProductos(prodResponse.data);
        setCategorias(catResponse.data);
      } catch (error) {
        toast.error("Error al obtener los datos.");
      }
    };

    fetchDatos();
  }, []);

  // 🔍 Aplicar filtros dinámicamente
  const productosFiltrados = productos.filter((p) => {
    return (
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (!filtroCategoria || p.categoriaId == filtroCategoria) &&
      (!stockBajo || p.cantidad <= (p.stockMinimo || 5)) &&
      (!precioMin || p.precio >= Number(precioMin)) &&
      (!precioMax || p.precio <= Number(precioMax))
    );
  });

  // 📌 Paginación
  const indiceInicial = (pagina - 1) * productosPorPagina;
  const productosPaginados = productosFiltrados.slice(
    indiceInicial,
    indiceInicial + productosPorPagina
  );

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {usuario?.rol === "admin" ? "Todos los Productos" : "Mis Productos"}
        </h1>
        <button
          onClick={() => navigate("/crear-producto")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Añadir Producto
        </button>
      </div>

      {/* 🚨 Filtros Avanzados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border p-2 w-full"
        />

        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Todas las Categorías</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Precio mínimo"
          value={precioMin}
          onChange={(e) => setPrecioMin(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="number"
          placeholder="Precio máximo"
          value={precioMax}
          onChange={(e) => setPrecioMax(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={stockBajo}
          onChange={() => setStockBajo(!stockBajo)}
          className="mr-2"
        />
        <label>Mostrar solo productos con stock bajo</label>
      </div>

      {/* 📋 Tabla de productos */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Cantidad</th>
            <th className="border px-4 py-2">Precio</th>
          </tr>
        </thead>
        <tbody>
          {productosPaginados.length > 0 ? (
            productosPaginados.map((producto) => (
              <tr key={producto.id}>
                <td className="border px-4 py-2">{producto.id}</td>
                <td className="border px-4 py-2">{producto.nombre}</td>
                <td className="border px-4 py-2">{producto.cantidad}</td>
                <td className="border px-4 py-2">${producto.precio}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="border px-4 py-2 text-center text-gray-500"
              >
                No hay productos registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 📄 Paginación */}
      <div className="flex justify-center mt-4">
        {Array.from({
          length: Math.ceil(productosFiltrados.length / productosPorPagina),
        }).map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 mx-1 ${
              pagina === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setPagina(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Productos;
