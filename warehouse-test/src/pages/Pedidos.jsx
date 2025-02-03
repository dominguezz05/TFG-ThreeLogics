import { useEffect, useState, useContext } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Importar para notificaciones

function Pedidos() {
  const { usuario } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      const response = await api.get("/pedidos");
      setPedidos(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error al obtener pedidos:", err);
      setError("Error al cargar pedidos");
      setLoading(false);
    }
  };

  // ✅ Función para actualizar el estado del pedido (Solo Admin)
  const actualizarEstado = async (pedidoId, nuevoEstado) => {
    try {
      await api.put(`/pedidos/${pedidoId}/estado`, { estado: nuevoEstado });
      
      toast.success(`Estado actualizado a "${nuevoEstado}"`);
  
      // 🔄 ACTUALIZAR el estado del pedido en la lista sin recargar manualmente
      setPedidos((prevPedidos) =>
        prevPedidos.map((pedido) =>
          pedido.id === pedidoId ? { ...pedido, estado: nuevoEstado } : pedido
        )
      );
  
    } catch (error) {
      console.error("Error al actualizar el estado del pedido:", error);
      toast.error("Error al actualizar el estado del pedido");
    }
  };
  

  // ✅ Función para eliminar un pedido (Solo si está "pendiente")
  const eliminarPedido = async (pedidoId) => {
    try {
      await api.delete(`/pedidos/${pedidoId}`);
      toast.success("Pedido eliminado con éxito");
      cargarPedidos(); // Recargar lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar pedido:", error);
      toast.error("No se pudo eliminar el pedido");
    }
  };

  const pagarPedido = async (pedidoId) => {
    try {
      await api.put(`/pedidos/${pedidoId}/pagar`);
      toast.success("✅ Pedido pagado con éxito!");
      cargarPedidos(); // 🔄 Refrescar la lista de pedidos
    } catch (error) {
      console.error("❌ Error al pagar el pedido:", error);
      toast.error("❌ No se pudo pagar el pedido");
    }
  };
  

  if (loading) return <p>Cargando pedidos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">📜 Tus Pedidos</h1>
  
      {/* 📌 Botón para ir a la página de crear pedido */}
      <button
        onClick={() => navigate("/crear-pedido")}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        ➕ Crear Nuevo Pedido
      </button>
  
      {pedidos.length === 0 ? (
        <p>No tienes pedidos realizados.</p>
      ) : (
        <div className="grid gap-5">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="p-4 border rounded bg-gray-100">
              <h2 className="text-lg font-semibold">📦 Pedido #{pedido.id}</h2>
              <p>Fecha: {new Date(pedido.fecha).toLocaleDateString()}</p>
              <p className="font-bold">Total: ${pedido.total.toFixed(2)}</p>
  
              {/* 🔄 Menú desplegable para cambiar estado (Solo Admin) */}
              {usuario.rol === "usuario" ? (
                <div className="mt-3">
                  <label className="font-semibold">Estado: </label>
                  <select
                    className="ml-2 p-1 border rounded"
                    value={pedido.estado}
                    onChange={(e) =>
                      actualizarEstado(pedido.id, e.target.value)
                    }
                  >
                  <option value="pendiente">🟡 Pendiente</option>
      <option value="pagar">💳 Pagar</option>
      <option value="enviado" disabled>📦 Enviado (Automático)</option>
      <option value="completado" disabled>✅ Completado (Automático)</option>
                  </select>
                </div>
              ) : (
                <p
                  className={`font-semibold ${
                    pedido.estado === "pendiente"
                      ? "text-yellow-500"
                      : pedido.estado === "pagar"
                      ? "text-blue-500"
                      : pedido.estado === "enviado"
                      ? "text-purple-500"
                      : "text-green-500"
                  }`}
                >
                  Estado: {pedido.estado}
                </p>
              )}
  {/* Si el estado es "Pagar", mostrar botón para ir a la pasarela de pago */}
{pedido.estado === "pagar" && (
  <button
    onClick={() => navigate(`/pago/${pedido.id}`)}
    className="mt-4 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition"
  >
    💳 Ir a Pagar
  </button>
)}

  
              {/* 🛒 Productos en el pedido */}
              <h3 className="mt-3 font-semibold">🛒 Productos:</h3>
              <ul className="list-disc pl-5">
                {pedido.DetallePedidos?.map((detalle) => (
                  <li key={detalle.id}>
                    {detalle.Producto?.nombre} - {detalle.cantidad} unidades - $
                    {detalle.subtotal.toFixed(2)}
                  </li>
                ))}
              </ul>
  
              {/* 🗑 Botón para eliminar pedido (Solo si está "pendiente") */}
              {pedido.estado === "pendiente" && (
                <button
                  onClick={() => eliminarPedido(pedido.id)}
                  className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  🗑 Eliminar Pedido
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
}

export default Pedidos;
