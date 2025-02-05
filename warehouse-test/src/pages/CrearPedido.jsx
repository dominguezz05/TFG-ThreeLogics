import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../services/api";
import "react-toastify/dist/ReactToastify.css";

function CrearPedido() {
  const [productos, setProductos] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [cantidades, setCantidades] = useState({}); // Estado para almacenar cantidades ingresadas
  const navigate = useNavigate();

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const response = await api.get("/productos");
      setProductos(response.data);
    } catch (error) {
      console.error("❌ Error al cargar productos:", error);
      toast.error("❌ Error al cargar productos.");
    }
  };

  // 📌 Manejar cambios en el input de cantidad
  const handleCantidadChange = (productoId, cantidad) => {
    if (cantidad < 1) cantidad = 1; // No permitir valores negativos o 0
    setCantidades({ ...cantidades, [productoId]: cantidad });
  };

  // 📌 Agregar producto al pedido con cantidad personalizada
  const agregarProducto = (producto) => {
    const cantidadSeleccionada = cantidades[producto.id] || 1; // Tomar cantidad ingresada o 1 por defecto

    const existe = pedido.find((p) => p.productoId === producto.id);
    if (existe) {
      setPedido(
        pedido.map((p) =>
          p.productoId === producto.id
            ? { ...p, cantidad: cantidadSeleccionada }
            : p
        )
      );
    } else {
      setPedido([
        ...pedido,
        { productoId: producto.id, cantidad: cantidadSeleccionada },
      ]);
    }

    toast.success(
      `🛒 ${producto.nombre} añadido con ${cantidadSeleccionada} unidades`
    );
  };

  const quitarProducto = (productoId) => {
    setPedido(pedido.filter((p) => p.productoId !== productoId));
  };

  const realizarPedido = async () => {
    if (pedido.length === 0) {
      toast.warning("⚠️ Debes seleccionar al menos un producto.");
      return;
    }

    try {
      const response = await api.post("/pedidos", { productos: pedido });

      toast.success("✅ Pedido realizado con éxito.");
      setPedido([]); // Limpiar el carrito

      setTimeout(() => {
        navigate("/pedidos");
      }, 2000);
    } catch (error) {
      console.error("❌ Error al realizar pedido:", error);
      toast.error("❌ Error al realizar el pedido.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">📝 Crear Pedido</h1>

      <h2 className="text-xl font-semibold">🛒 Seleccionar Productos</h2>
      <div className="grid grid-cols-2 gap-5">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="p-4 border rounded bg-gray-100 flex flex-col items-center"
          >
            <h3 className="font-semibold">{producto.nombre}</h3>
            <p>Precio: ${producto.precio.toFixed(2)}</p>
            <input
              type="number"
              min="1"
              value={cantidades[producto.id] || 1}
              onChange={(e) =>
                handleCantidadChange(producto.id, parseInt(e.target.value))
              }
              className="border p-2 w-16 text-center mt-2"
            />
            <button
              onClick={() => agregarProducto(producto)}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
            >
              ➕ Agregar
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-5">🛍️ Tu Pedido</h2>
      {pedido.length === 0 ? (
        <p>No has agregado productos.</p>
      ) : (
        <div className="mt-3 p-4 border rounded bg-gray-200">
          <ul>
            {pedido.map((p) => (
              <li key={p.productoId} className="flex justify-between">
                <span>
                  {productos.find((prod) => prod.id === p.productoId)?.nombre} -{" "}
                  {p.cantidad} unidades
                </span>
                <button
                  onClick={() => quitarProducto(p.productoId)}
                  className="text-red-500"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={realizarPedido}
        className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
      >
        🛒 Realizar Pedido
      </button>
    </div>
  );
}

export default CrearPedido;
