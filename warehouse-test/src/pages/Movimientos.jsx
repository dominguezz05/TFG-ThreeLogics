import { useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

function Movimientos() {
  const [movimientos, setMovimientos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("7"); // Últimos 7 días por defecto
  const [nuevoMovimiento, setNuevoMovimiento] = useState({
    productoId: "",
    tipo: "entrada",
    cantidad: "",
  });

  const fetchMovimientos = async () => {
    try {
      const response = await api.get("/movimientos", {
        params: { categoriaId: filtroCategoria, dias: filtroFecha },
      });
      console.log("Movimientos actualizados:", response.data);
      setMovimientos(response.data);
    } catch (error) {
      console.error("Error al obtener movimientos:", error);
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await api.get("/productos");
      console.log("Productos obtenidos:", response.data);
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await api.get("/categorias");
      console.log("Categorías obtenidas:", response.data);
      setCategorias(response.data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  // Obtener datos al cargar la página
  useEffect(() => {
    fetchMovimientos();
    fetchProductos();
    fetchCategorias();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "cantidad") {
      value = parseInt(value, 10) || "";
    }

    setNuevoMovimiento({ ...nuevoMovimiento, [name]: value });
  };

  // Enviar nuevo movimiento
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/movimientos", nuevoMovimiento);
      setNuevoMovimiento({ productoId: "", tipo: "entrada", cantidad: "" });

      // 🔹 Mostrar notificación según el tipo de movimiento
      if (nuevoMovimiento.tipo === "entrada") {
        toast.success(`✅ Entrada de ${nuevoMovimiento.cantidad} unidades realizada correctamente`);
      } else {
        toast.success(`✅ Salida de ${nuevoMovimiento.cantidad} unidades realizada correctamente`);
      }

      // 🔹 Actualizar movimientos y productos después de registrar un nuevo movimiento
      await fetchMovimientos();
      await fetchProductos();
    } catch (error) {
      console.error("Error al registrar el movimiento:", error);
      toast.error(error.response?.data?.error || "❌ Error al registrar el movimiento");
    }
  };

  // 🔹 Filtrar movimientos por fecha y categoría
  const movimientosFiltrados = movimientos.filter((mov) => {
    const fechaMovimiento = new Date(mov.fecha);
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - parseInt(filtroFecha));

    return (
      (!filtroCategoria || Number(mov.Producto?.categoriaId) === Number(filtroCategoria)) &&
      fechaMovimiento >= fechaLimite
    );
  });

  // 📥 Función para descargar movimientos en CSV
  const descargarMovimientos = () => {
    window.location.href = `${api.defaults.baseURL}/movimientos/descargar`;
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Registrar Movimiento</h1>

      {/* Formulario para registrar un movimiento */}
      <div className="mb-5 p-4 border rounded bg-gray-50">
        <h2 className="text-xl text-black font-semibold mb-2">Nuevo Movimiento</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <select
            name="productoId"
            value={nuevoMovimiento.productoId}
            onChange={handleChange}
            className="border p-2 text-black"
            required
          >
            <option className="text-black" value="">
              Seleccione un producto
            </option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre} (Stock: {producto.cantidad})
              </option>
            ))}
          </select>
          <select
            name="tipo"
            value={nuevoMovimiento.tipo}
            onChange={handleChange}
            className="border p-2 text-black"
          >
            <option className="text-black" value="entrada">
              Entrada
            </option>
            <option className="text-black" value="salida">
              Salida
            </option>
          </select>
          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            value={nuevoMovimiento.cantidad}
            onChange={handleChange}
            className="border p-2 text-black"
            required
          />
          <button type="submit" className="bg-green-500 text-black px-4 py-2 rounded">
            Registrar
          </button>
        </form>
      </div>

      {/* 📥 Botón para descargar CSV */}
      <button onClick={descargarMovimientos} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
        📥 Descargar Movimientos en CSV
      </button>

      {/* 🔹 Filtros */}
      <h1 className="text-2xl font-bold mb-4">Historial de Movimientos</h1>
      <div className="flex gap-4 mb-4">
        <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} className="border p-2">
          <option value="">Todas las Categorías</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>

        <select value={filtroFecha} onChange={(e) => setFiltroFecha(e.target.value)} className="border p-2">
          <option value="7">Últimos 7 días</option>
          <option value="30">Últimos 30 días</option>
          <option value="90">Últimos 3 meses</option>
          <option value="">Todos</option>
        </select>
      </div>

      {/* Tabla de movimientos */}
      <table className="w-full border-collapse border text-black border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th className="border px-4 py-2 text-black">ID</th>
            <th className="border px-4 py-2 text-black">Producto</th>
            <th className="border px-4 py-2 text-black">Tipo</th>
            <th className="border px-4 py-2 text-black">Cantidad</th>
            <th className="border px-4 py-2 text-black">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {movimientosFiltrados.length > 0 ? (
            movimientosFiltrados.map((mov) => (
              <tr key={mov.id}>
                <td className="border px-4 py-2 text-black">{mov.id}</td>
                <td className="border px-4 py-2 text-black">{mov.Producto ? mov.Producto.nombre : "N/A"}</td>
                <td className={`border px-4 py-2 ${mov.tipo === "entrada" ? "text-green-500" : "text-red-500"}`}>
                  {mov.tipo}
                </td>
                <td className="border px-4 py-2 text-black">{mov.cantidad}</td>
                <td className="border px-4 py-2 text-black">{new Date(mov.fecha).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border px-4 py-2 text-center text-gray-500">No hay movimientos registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Movimientos;
