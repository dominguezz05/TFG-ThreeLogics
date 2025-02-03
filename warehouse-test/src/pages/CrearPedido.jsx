import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Importar useNavigate
import { toast } from "react-toastify"; // ✅ Importar toast para notificaciones
import { api } from "../services/api";
import "react-toastify/dist/ReactToastify.css"; // Importar estilos de notificación

function CrearPedido() {
  const [productos, setProductos] = useState([]);
  const [pedido, setPedido] = useState([]);
  const navigate = useNavigate(); // ✅ Definir navigate para redirección

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

  const agregarProducto = (producto) => {
    const existe = pedido.find((p) => p.productoId === producto.id);
    if (existe) {
      setPedido(
        pedido.map((p) =>
          p.productoId === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      );
    } else {
      setPedido([...pedido, { productoId: producto.id, cantidad: 1 }]);
    }
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
      // 📌 Crear pedido en estado "pendiente"
      const response = await api.post("/pedidos", { productos: pedido });

      toast.success("✅ Pedido realizado con éxito.");

      setPedido([]); // Limpiar el carrito

      // ⏳ Esperar 2 segundos antes de redirigir para mostrar la notificación
      setTimeout(() => {
        navigate("/pedidos"); // ✅ Redirigir a Pedidos.jsx
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
          <div key={producto.id} className="p-4 border rounded bg-gray-100">
            <h3 className="font-semibold">{producto.nombre}</h3>
            <p>Precio: ${producto.precio.toFixed(2)}</p>
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
