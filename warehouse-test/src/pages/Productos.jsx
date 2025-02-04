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

  // Estado para edición de producto
  const [productoEditado, setProductoEditado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

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

  // Función para abrir el modal de edición
  const abrirModalEdicion = (producto) => {
    setProductoEditado(producto);
    setModalAbierto(true);
  };

  // Función para manejar cambios en el formulario de edición
  const handleChangeEdicion = (e) => {
    setProductoEditado({ ...productoEditado, [e.target.name]: e.target.value });
  };

  // Función para modificar un producto
  const handleModificarProducto = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/productos/${productoEditado.id}`, productoEditado);
      toast.success(`✅ Producto "${productoEditado.nombre}" modificado correctamente`);
      setModalAbierto(false);
      window.location.reload(); // Refrescar productos
    } catch (error) {
      toast.error("❌ Error al modificar el producto.");
    }
  };

  // Función para eliminar un producto
  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este producto?")) return;

    try {
      await api.delete(`/productos/${id}`);
      setProductos(productos.filter((p) => p.id !== id));
      toast.success("✅ Producto eliminado correctamente");
    } catch (error) {
      toast.error("❌ Error al eliminar el producto.");
    }
  };

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

      {/* 🚨 Alerta de stock bajo */}
      {productos.some((p) => p.cantidad <= (p.stockMinimo || 5)) && (
        <div className="bg-red-500 text-white p-3 rounded mb-4">
          ⚠️ ¡Atención! Algunos productos tienen stock bajo.
        </div>
      )}

      {/* 🔍 Filtros */}
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

      {/* 📋 Tabla de productos */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Cantidad</th>
            <th className="border px-4 py-2">Precio</th>
            {usuario?.rol === "admin" && <th className="border px-4 py-2">Creado por</th>}
            <th className="border px-4 py-2">Acciones</th>
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
                {usuario?.rol === "admin" && (
                  <td className="border px-4 py-2">{producto.Usuario?.nombre || "Desconocido"}</td>
                )}
                <td className="border px-4 py-2 flex gap-2">
                  <button onClick={() => abrirModalEdicion(producto)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                    ✏️
                  </button>
                  <button onClick={() => eliminarProducto(producto.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border px-4 py-2 text-center text-gray-500">
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

{/* 🔧 Modal de Edición */}
{modalAbierto && productoEditado && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-5 rounded shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">✏️ Editar Producto</h2>
          <form onSubmit={handleModificarProducto} className="grid gap-3">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del producto"
              value={productoEditado.nombre}
              onChange={handleChangeEdicion}
              className="border p-2 w-full"
              required
            />
            <input
              type="number"
              name="cantidad"
              placeholder="Cantidad"
              value={productoEditado.cantidad}
              onChange={handleChangeEdicion}
              className="border p-2 w-full"
              required
            />
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              value={productoEditado.precio}
              onChange={handleChangeEdicion}
              className="border p-2 w-full"
              required
            />
            <select
              name="categoriaId"
              value={productoEditado.categoriaId}
              onChange={handleChangeEdicion}
              className="border p-2 w-full"
            >
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalAbierto(false)}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Cancelar
              </button>
              <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </div>
  );
}

export default Productos;

